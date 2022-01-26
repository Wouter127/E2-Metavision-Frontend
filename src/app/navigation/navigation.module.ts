import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationComponent } from './navigation.component';
import { AppRoutingModule } from '../app-routing.module';



@NgModule({
  declarations: [
    NavigationComponent
  ],
  imports: [
    AppRoutingModule,
    CommonModule
  ],
  exports: [
    NavigationComponent
  ]
})
export class NavigationModule { }
