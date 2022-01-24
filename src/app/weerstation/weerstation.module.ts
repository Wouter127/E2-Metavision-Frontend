import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from '../app-routing.module';
import { WeerstationToevoegenComponent } from './weerstation-toevoegen/weerstation-toevoegen.component';
import { WeerstationListComponent } from './weerstation-list/weerstation-list.component';
import { WeerstationActiverenComponent } from './weerstation-activeren/weerstation-activeren.component';
import { WeerstationAlarmSchakelwaardesFormComponent } from './weerstation-alarm-schakelwaardes-form/weerstation-alarm-schakelwaardes-form.component';
import { SharedModule } from '../shared/shared.module';
import { BrowserModule } from '@angular/platform-browser';
import { FormControl, FormsModule, ReactiveFormsModule }   from '@angular/forms';
import { TooltipModule } from 'ng2-tooltip-directive';
import { WeerstationFormComponent } from './weerstation-form/weerstation-form.component';
import { NgToggleModule } from 'ng-toggle-button';
import { WeerstationDashboardComponent } from './weerstation-dashboard/weerstation-dashboard.component';
import { NgApexchartsModule } from 'ng-apexcharts';

@NgModule({
  declarations: [
    WeerstationToevoegenComponent,
    WeerstationListComponent,
    WeerstationActiverenComponent,
    WeerstationAlarmSchakelwaardesFormComponent,
    WeerstationFormComponent,
    WeerstationDashboardComponent,
    // WeerstationComponent
  ],
  imports: [
    SharedModule,
    AppRoutingModule,
    CommonModule,
    BrowserModule,
    CommonModule,
    FormsModule,
    TooltipModule,
    NgToggleModule,
    ReactiveFormsModule,
    NgApexchartsModule,
  ],
  exports: [
    WeerstationToevoegenComponent,
    WeerstationListComponent,
    WeerstationActiverenComponent,
    WeerstationAlarmSchakelwaardesFormComponent,
    WeerstationFormComponent
    // WeerstationComponent
  ]
})
export class WeerstationModule { }
