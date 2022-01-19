import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from '../app-routing.module';
import { WeerstationToevoegenComponent } from './weerstation-toevoegen/weerstation-toevoegen.component';
import { WeerstationListComponent } from './weerstation-list/weerstation-list.component';
import { WeerstationActiverenComponent } from './weerstation-activeren/weerstation-activeren.component';
import { WeerstationAlarmSchakelwaardesFormComponent } from './weerstation-alarm-schakelwaardes-form/weerstation-alarm-schakelwaardes-form.component';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AppRoutingModule
  ],
  exports: [
    WeerstationToevoegenComponent,
    WeerstationListComponent,
    WeerstationActiverenComponent,
    WeerstationAlarmSchakelwaardesFormComponent
  ]
})
export class WeerstationModule { }
