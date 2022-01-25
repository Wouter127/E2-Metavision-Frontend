import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { Subscription } from 'rxjs';
import { AlarmWaardeService } from 'src/app/services/organisatiebeheerder/alarm-waarde.service';

@Component({
  selector: 'app-alarmwaardes-form',
  templateUrl: './alarmwaardes-form.component.html',
  styleUrls: ['./alarmwaardes-form.component.scss']
})
export class AlarmwaardesFormComponent implements OnInit {

  @Output() output = new EventEmitter();

  alarmwaarde: any = {};
  alarmwaarde$: Subscription = new Subscription();

  sensoren: any = [];
  sensoren$: Subscription = new Subscription();
  switches: any = [];
  switches$: Subscription = new Subscription();

  loading: boolean = true;
  showModal: boolean = false;

  isAdd: boolean = false;
  isEdit: boolean = false;
  title: string = ""

  putAlarmwaarde$: Subscription = new Subscription();
  postAlarmwaarde$: Subscription = new Subscription();

  constructor(private alarmwaardeService: AlarmWaardeService, private toast: HotToastService, private route: ActivatedRoute) {
    // Reverse the order of which the toasts are displayed
    this.toast.defaultConfig = {
      ...this.toast.defaultConfig,
      reverseOrder: true
    }
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.putAlarmwaarde$.unsubscribe();
    this.postAlarmwaarde$.unsubscribe();
  }

  openAddModal() {
    this.isAdd = true;
    
    this.getSensoren();
    this.switches$ = this.alarmwaardeService.getSwitches().subscribe(result => {
      this.switches = result;
      this.loading = false;
    });
    this.showModal = true;
  }

  openEditModal(id: number) {
    this.isEdit = true;
    this.getSensoren();
    this.getSwitches();

    this.alarmwaarde$ = this.alarmwaardeService.getAlarmwaardeById(id).subscribe(
      result => {
        this.alarmwaarde = result;

        this.loading = false;
      },
      error => {
        this.toast.error("Er ging iets mis.  De alarmwaarde kan niet worden opgehaald.", { position: 'bottom-right', dismissible: true, autoClose: false })
      }
    );

    this.showModal = true;
  }

  closeModal() {
    this.isEdit = false;
    this.isAdd = false;
    this.showModal = false;
    this.loading = true;
    
  }

  onChange() {
  }

  selectSwitchChangeHandler(event: any) {
    this.alarmwaarde.switchLogicId = parseInt(event.target.value);
  }

  selectSensorChangeHandler(event: any) {
    this.alarmwaarde.sensorId = parseInt(event.target.value);
  }

  waardeChangeHandler(event: any) {
    this.alarmwaarde.waarde = parseInt(event.target.value);
  }

  getSensoren() {
    this.sensoren$ = this.alarmwaardeService.getSensoren().subscribe(result => {
      this.sensoren = result;
    });
  }

  getSwitches() {
    this.switches$ = this.alarmwaardeService.getSwitches().subscribe(result => {
      this.switches = result;
    });
  }

  onSubmit() {    
    if (this.isEdit) {
      this.putAlarmwaarde$ = this.alarmwaardeService.putAlarmwaarde(this.alarmwaarde.id, { weerstationId: this.alarmwaarde.weerstationId, waarde: this.alarmwaarde.waarde, switchLogicId: this.alarmwaarde.switchLogicId, sensorId: this.alarmwaarde.sensorId }).pipe(
        this.toast.observe({
          loading: { content: 'Aanpassen...', position: 'bottom-right' },
          success: { content: 'Alarmwaarde aangepast!', position: 'bottom-right', dismissible: true },
          error: {
            content: (e) => {
              let msg = '<ul>';
              msg += `<li><b>Er ging iets mis!</b></li>`;
              for (let key in e.error.errors) {
                msg += `<li>${e.error.errors[key]}</li>`;
              }
              msg += '</ul>';

              return msg;
            }, position: 'bottom-right', dismissible: true, duration: 5000
          },
        })
      ).subscribe(
        result => {
          this.showModal = false;
          this.isEdit = false;
          this.isAdd = false;

          this.output.next(); // Send event to parent component.
        });
    }
    if (this.isAdd) {      
      const weerstationId = this.route.snapshot.paramMap.get('id');
      this.postAlarmwaarde$ = this.alarmwaardeService.postAlarmwaarde({ weerstationId: weerstationId, waarde: this.alarmwaarde.waarde, switchLogicId: this.alarmwaarde.switchLogicId, sensorId: this.alarmwaarde.sensorId }).pipe(
        this.toast.observe({
          loading: { content: 'Toevoegen...', position: 'bottom-right' },
          success: { content: 'Alarmwaarde toegevoegt!', position: 'bottom-right', dismissible: true },
          error: {
            content: (e) => {
              let msg = '<ul>';
              msg += `<li><b>Er ging iets mis!</b></li>`;
              for (let key in e.error.errors) {
                msg += `<li>${e.error.errors[key]}</li>`;
              }
              msg += '</ul>';

              return msg;
            }, position: 'bottom-right', dismissible: true, duration: 5000
          },
        })
      ).subscribe(
        result => {
          this.showModal = false;
          this.isEdit = false;
          this.isAdd = false;

          this.output.next(); // Send event to parent component.
        });
    }
  }
}
