import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlarmwaardesFormComponent } from './alarmwaardes-form/alarmwaardes-form.component';
import { AlarmwaardesListComponent } from './alarmwaardes-list/alarmwaardes-list.component';
import { SharedModule } from '../shared/shared.module';
import { AppRoutingModule } from '../app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    AlarmwaardesFormComponent,
    AlarmwaardesListComponent
  ],
  imports: [
    SharedModule,
    AppRoutingModule,
    CommonModule,
    BrowserModule,
    FormsModule
  ],
  exports: [
    AlarmwaardesFormComponent,
    AlarmwaardesListComponent
  ]
})
export class AlarmwaardeModule { }
