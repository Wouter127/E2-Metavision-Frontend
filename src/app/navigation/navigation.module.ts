import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationComponent } from './navigation.component';
import { AppRoutingModule } from '../app-routing.module';
import {MatMenuModule} from '@angular/material/menu';
import {MatSidenavModule} from '@angular/material/sidenav';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


@NgModule({
  declarations: [
    NavigationComponent
  ],
  imports: [
    AppRoutingModule,
    CommonModule,
    MatMenuModule,
    MatSidenavModule,
    BrowserAnimationsModule,
  ],
  exports: [
    NavigationComponent
  ]
})
export class NavigationModule { }
