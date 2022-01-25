import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationComponent } from './navigation.component';
import { AppRoutingModule } from '../app-routing.module';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [
    NavigationComponent
  ],
  imports: [
    SharedModule,
    AppRoutingModule,
    CommonModule
  ],
  exports: [
    NavigationComponent
  ]
})
export class NavigationModule { }
