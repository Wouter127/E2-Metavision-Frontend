import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from '../app-routing.module';
import { WeerstationToevoegenComponent } from './weerstation-toevoegen/weerstation-toevoegen.component';
import { WeerstationListComponent } from './weerstation-list/weerstation-list.component';
import { WeerstationActiverenComponent } from './weerstation-activeren/weerstation-activeren.component';
import { WeerstationAlarmSchakelwaardesFormComponent } from './weerstation-alarm-schakelwaardes-form/weerstation-alarm-schakelwaardes-form.component';
import { SharedModule } from '../shared/shared.module';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';

@NgModule({
  declarations: [
    WeerstationToevoegenComponent,
    WeerstationListComponent,
    WeerstationActiverenComponent,
    WeerstationAlarmSchakelwaardesFormComponent,
    // WeerstationComponent
  ],
  imports: [
    SharedModule,
    AppRoutingModule,
    CommonModule,
    BrowserModule,
    CommonModule,
    FormsModule
  ],
  exports: [
    WeerstationToevoegenComponent,
    WeerstationListComponent,
    WeerstationActiverenComponent,
    WeerstationAlarmSchakelwaardesFormComponent,
    // WeerstationComponent
  ]
})
export class WeerstationModule { }
