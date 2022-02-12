import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { HotToastService } from '@ngneat/hot-toast';
import { Subscription } from 'rxjs';
import { Sensor } from 'src/app/interfaces/Sensor';
import { SensorService } from 'src/app/services/sensor.service';

@Component({
  selector: 'app-sensor-form',
  templateUrl: './sensor-form.component.html',
  styleUrls: ['./sensor-form.component.scss']
})
export class SensorFormComponent implements OnInit {
  @Input() title!: string;
  @Output() output = new EventEmitter();

  loading: boolean = true;
  showModal: boolean = false;

  sensor!: Sensor;
  sensor$: Subscription = new Subscription();

  putSensor$: Subscription = new Subscription();

  constructor(private sensorService: SensorService, private toast: HotToastService) {
    // Reverse the order of which the toasts are displayed
    this.toast.defaultConfig = {
      ...this.toast.defaultConfig,
      reverseOrder: true
    }
   }

  ngOnInit(): void {
    this.sensor$.unsubscribe();
  }

  closeModal() {
    this.showModal = false;
  }

  openEditModal(id: number) {
    this.title = "Sensor aanpassen"

    this.sensor$ = this.sensorService.getSensorById(id).subscribe(
      result => {
        this.sensor = result;
        this.loading = false;
        this.showModal = true;
      },
      error => {
        this.toast.error("Er ging iets mis. De sensor kan niet worden opgehaald.", { position: 'bottom-right', dismissible: true, autoClose: false });
      }
    );
  }

  onSubmit() {
    this.putSensor$ = this.sensorService.putSensor(this.sensor.id, this.sensor).pipe(
      this.toast.observe({
        loading: { content: 'Aanpassen...', position: 'bottom-right' },
        success: { content: 'Sensor aangepast!', position: 'bottom-right', dismissible: true },
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
