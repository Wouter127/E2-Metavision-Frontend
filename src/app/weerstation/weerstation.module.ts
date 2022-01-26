import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from '../app-routing.module';
import { WeerstationActiverenComponent } from './weerstation-activeren/weerstation-activeren.component';
import { WeerstationAlarmSchakelwaardesFormComponent } from './weerstation-alarm-schakelwaardes-form/weerstation-alarm-schakelwaardes-form.component';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import { TooltipModule } from 'ng2-tooltip-directive';
import { NgToggleModule } from 'ng-toggle-button';
import { NgApexchartsModule } from 'ng-apexcharts';

@NgModule({
  declarations: [
    WeerstationActiverenComponent,
    WeerstationAlarmSchakelwaardesFormComponent,
    // WeerstationComponent
  ],
  imports: [
    AppRoutingModule,
    CommonModule,
    BrowserModule,
    
    FormsModule,
    TooltipModule,
    NgToggleModule,
    ReactiveFormsModule,
    NgApexchartsModule,
  ],
  exports: [
    WeerstationActiverenComponent,
    WeerstationAlarmSchakelwaardesFormComponent,
    // WeerstationComponent
  ]
})
export class WeerstationModule { }
