import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from '../app-routing.module';
import { WeerstationToevoegenComponent } from '../admin/weerstations/weerstation-toevoegen/weerstation-toevoegen.component';
import { WeerstationActiverenComponent } from './weerstation-activeren/weerstation-activeren.component';
import { WeerstationAlarmSchakelwaardesFormComponent } from './weerstation-alarm-schakelwaardes-form/weerstation-alarm-schakelwaardes-form.component';
import { SharedModule } from '../shared/shared.module';
import { BrowserModule } from '@angular/platform-browser';
import { FormControl, FormsModule, ReactiveFormsModule }   from '@angular/forms';
import { TooltipModule } from 'ng2-tooltip-directive';
import { WeerstationFormComponent } from '../admin/weerstations/weerstation-form/weerstation-form.component';
import { NgToggleModule } from 'ng-toggle-button';
import { WeerstationDashboardComponent } from './weerstation-dashboard/weerstation-dashboard.component';
import { NgApexchartsModule } from 'ng-apexcharts';
import { WeerstationListComponent } from '../admin/weerstations/weerstation-list/weerstation-list.component';

@NgModule({
  declarations: [
    WeerstationActiverenComponent,
    WeerstationAlarmSchakelwaardesFormComponent,
    WeerstationDashboardComponent,
    // WeerstationComponent
  ],
  imports: [
    SharedModule,
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
