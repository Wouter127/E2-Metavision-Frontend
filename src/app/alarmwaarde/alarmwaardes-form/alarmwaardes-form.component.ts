import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { Subscription } from 'rxjs';
import { AlarmWaardeService } from 'src/app/services/organisatiebeheerder/alarm-waarde.service';
import { SchakelWaardeService } from 'src/app/services/organisatiebeheerder/schakel-waarde.service';
import { SensorService } from 'src/app/services/organisatiebeheerder/sensor.service';
import { SwitchLogicService } from 'src/app/services/organisatiebeheerder/switch-logic.service';

@Component({
  selector: 'app-alarmwaardes-form',
  templateUrl: './alarmwaardes-form.component.html',
  styleUrls: ['./alarmwaardes-form.component.scss']
})
export class AlarmwaardesFormComponent implements OnInit {

  @Output() output = new EventEmitter();

  alarmwaarde: any = {};
  alarmwaarde$: Subscription = new Subscription();
  schakelwaarde: any = {};
  schakelwaarde$: Subscription = new Subscription();

  sensoren: any = [];
  sensoren$: Subscription = new Subscription();
  switches: any = [];
  switches$: Subscription = new Subscription();

  loading: boolean = true;
  showModal: boolean = false;

  isAdd: boolean = false;
  isEdit: boolean = false;
  isSchakel: boolean = false;
  isAlarm: boolean = false;
  title: string = ""

  putAlarmwaarde$: Subscription = new Subscription();
  postAlarmwaarde$: Subscription = new Subscription();
  putSchakelwaarde$: Subscription = new Subscription();
  postSchakelwaarde$: Subscription = new Subscription();

  constructor(
    private alarmwaardeService: AlarmWaardeService,
    private schakelwaardeService: SchakelWaardeService,
    private toast: HotToastService,
    private route: ActivatedRoute,
    private sensorService: SensorService,
    private switchLogicService: SwitchLogicService) {
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
    this.putSchakelwaarde$.unsubscribe();
    this.postSchakelwaarde$.unsubscribe();
  }

  openAddAlarmWaardeModal() {
    this.isAdd = true;
    this.isAlarm = true;
    this.title = "Alarmwaarde toevoegen"

    this.getSensoren();
    this.switches$ = this.switchLogicService.getSwitches().subscribe(result => {
      this.switches = result;
      this.loading = false;
    });
    this.showModal = true;
  }

  openEditAlarmWaardeModal(id: number) {
    this.isEdit = true;
    this.isAlarm = true;
    this.title = "Alarmwaarde aanpassen"
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

  openAddSchakelWaardeModal() {
    this.isAdd = true;
    this.isSchakel = true;
    this.title = "Schakelwaarde toevoegen" 

    this.getSensoren();
    this.switches$ = this.switchLogicService.getSwitches().subscribe(result => {
      this.switches = result;
      this.loading = false;
    });
    this.showModal = true;
  }

  openEditSchakelWaardeModal(id: number) {
    this.isEdit = true;
    this.isSchakel = true;
    this.title = "Schakelwaarde aanpassen"
    this.getSensoren();
    this.getSwitches();

    this.schakelwaarde$ = this.schakelwaardeService.getSchakelwaardeById(id).subscribe(
      result => {
        this.schakelwaarde = result;

        this.loading = false;
      },
      error => {
        this.toast.error("Er ging iets mis.  De schakelwaarde kan niet worden opgehaald.", { position: 'bottom-right', dismissible: true, autoClose: false })
      }
    );

    this.showModal = true;
  }

  closeModal() {
    this.isEdit = false;
    this.isAdd = false;
    this.isAlarm = false;
    this.isSchakel = false;
    this.showModal = false;
    this.loading = true;
  }

  selectSwitchChangeHandler(event: any) {
    if (this.isAlarm) {
      this.alarmwaarde.switchLogicId = parseInt(event.target.value);
    }
    if (this.isSchakel) {
      this.schakelwaarde.switchLogicId = parseInt(event.target.value);
    }

  }

  selectSensorChangeHandler(event: any) {
    if (this.isAlarm) {
      this.alarmwaarde.sensorId = parseInt(event.target.value);
    }
    if (this.isSchakel) {
      this.schakelwaarde.sensorId = parseInt(event.target.value);
    }
  }

  waardeChangeHandler(event: any) {
    if (this.isAlarm) {
      this.alarmwaarde.waarde = parseInt(event.target.value);
    }
    if (this.isSchakel) {
      this.schakelwaarde.waarde = parseInt(event.target.value);
    }
  }

  getSensoren() {
    this.sensoren$ = this.sensorService.getSensoren().subscribe(result => {
      this.sensoren = result;
    });
  }

  getSwitches() {
    this.switches$ = this.switchLogicService.getSwitches().subscribe(result => {
      this.switches = result;
    });
  }

  onSubmit() {
    if (this.isEdit && this.isAlarm) {
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
          this.isSchakel = false;
          this.isAlarm = false;

          this.output.next(); // Send event to parent component.
        });
    }

    if (this.isAdd && this.isAlarm) {
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
          this.isSchakel = false;
          this.isAlarm = false;

          this.output.next(); // Send event to parent component.
        });
    }

    if (this.isEdit && this.isSchakel) {
      this.putSchakelwaarde$ = this.schakelwaardeService.putSchakelwaarde(this.schakelwaarde.id, { weerstationId: this.schakelwaarde.weerstationId, waarde: this.schakelwaarde.waarde, switchLogicId: this.schakelwaarde.switchLogicId, sensorId: this.schakelwaarde.sensorId }).pipe(
        this.toast.observe({
          loading: { content: 'Aanpassen...', position: 'bottom-right' },
          success: { content: 'Schakelwaarde aangepast!', position: 'bottom-right', dismissible: true },
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
          this.isSchakel = false;
          this.isAlarm = false;

          this.output.next(); // Send event to parent component.
        });
    }

    if (this.isAdd && this.isSchakel) {
      const weerstationId = this.route.snapshot.paramMap.get('id');
      this.postSchakelwaarde$ = this.schakelwaardeService.postSchakelwaarde({ weerstationId: weerstationId, waarde: this.schakelwaarde.waarde, switchLogicId: this.schakelwaarde.switchLogicId, sensorId: this.schakelwaarde.sensorId }).pipe(
        this.toast.observe({
          loading: { content: 'Toevoegen...', position: 'bottom-right' },
          success: { content: 'Schakelwaarde toegevoegt!', position: 'bottom-right', dismissible: true },
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
          this.isSchakel = false;
          this.isAlarm = false;

          this.output.next(); // Send event to parent component.
        });
    }
  }

}
