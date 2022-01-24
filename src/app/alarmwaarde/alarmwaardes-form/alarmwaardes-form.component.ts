import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { HotToastService } from '@ngneat/hot-toast';
import { Subscription } from 'rxjs';
import { AlarmWaardeService } from 'src/app/services/organisatiebeheerder/alarm-waarde.service';

@Component({
  selector: 'app-alarmwaardes-form',
  templateUrl: './alarmwaardes-form.component.html',
  styleUrls: ['./alarmwaardes-form.component.scss']
})
export class AlarmwaardesFormComponent implements OnInit {

  @Input() title!: string;
  @Output() output = new EventEmitter();

  alarmwaarde: any = {};
  alarmwaarde$: Subscription = new Subscription();

  loading: boolean = true;
  showModal: boolean = false;

  putAlarmwaarde$: Subscription = new Subscription();

  constructor(private alarmwaardeService: AlarmWaardeService, private toast: HotToastService) {
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
  }

  openModal(id: number) {
    this.loading = true;
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
    this.showModal = false;
  }

  onChange() {
    console.log(this.alarmwaarde);
  }

  onSubmit() {
    console.log(this.alarmwaarde);
    
    this.putAlarmwaarde$ = this.alarmwaardeService.putAlarmwaarde(this.alarmwaarde.id, this.alarmwaarde).pipe(
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

        this.output.next(); // Send event to parent component.
      }
    );
  }

}
