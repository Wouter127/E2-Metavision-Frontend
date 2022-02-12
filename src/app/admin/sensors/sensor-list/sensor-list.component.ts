import { Component, OnInit, ViewChild } from '@angular/core';
import { HotToastService } from '@ngneat/hot-toast';
import { Subscription } from 'rxjs';
import { Sensor } from 'src/app/interfaces/Sensor';
import { SensorService } from 'src/app/services/sensor.service';
import { SensorFormComponent } from '../sensor-form/sensor-form.component';

@Component({
  selector: 'app-sensor-list',
  templateUrl: './sensor-list.component.html',
  styleUrls: ['./sensor-list.component.scss']
})
export class SensorListComponent implements OnInit {
  @ViewChild(SensorFormComponent, { static: true }) sensorFormComponent!: SensorFormComponent;

  loading: boolean = true;

  sensoren: Sensor[] = [];
  sensoren$: Subscription = new Subscription();

  constructor(private sensorService: SensorService, private toast: HotToastService) { 
    // Reverse the order of which the toasts are displayed
    this.toast.defaultConfig = {
      ...this.toast.defaultConfig,
      reverseOrder: true
    }
  }

  ngOnInit(): void {
    this.getSensoren();
  }

  ngOnDestroy(): void {
    this.sensoren$.unsubscribe();
  }

  wijzigSensor(id: number): void {
    this.sensorFormComponent.openEditModal(id);

    // When the gebruiker is edited successfully, refresh the list of gebruikers.
    this.sensorFormComponent.output.subscribe(() => {
      this.getSensoren();
    });
  }

  getSensoren(): void {
    this.loading = true;
    this.sensoren$ = this.sensorService.getSensoren().subscribe(
      result => {
        this.sensoren = result;
        this.loading = false;
      },
      error => {
        this.toast.error("Er ging iets mis.  De sensoren kunnen niet worden opgehaald.", { position: 'bottom-right', dismissible: true, autoClose: false });
      }
    );
  }
}
