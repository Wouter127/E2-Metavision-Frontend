import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlarmwaardesFormComponent } from './alarmwaardes-form/alarmwaardes-form.component';
import { AlarmwaardesListComponent } from './alarmwaardes-list/alarmwaardes-list.component';
import { AppRoutingModule } from '../app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { WeerstationsOrganisatieListComponent } from './weerstations-organisatie-list/weerstations-organisatie-list.component';
import { TooltipModule } from 'ng2-tooltip-directive';
import { NgToggleModule } from 'ng-toggle-button';
import { NgApexchartsModule } from 'ng-apexcharts';
import { WeerstationDashboardComponent } from './weerstation-dashboard/weerstation-dashboard.component';



@NgModule({
  declarations: [
    AlarmwaardesFormComponent,
    AlarmwaardesListComponent,
    WeerstationsOrganisatieListComponent,
    WeerstationDashboardComponent
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
    AlarmwaardesFormComponent,
    AlarmwaardesListComponent,
    WeerstationsOrganisatieListComponent,
    WeerstationDashboardComponent
  ]
})
export class SharedModule { }
