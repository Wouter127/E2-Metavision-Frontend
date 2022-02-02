import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GebruikerInfoComponent } from './gebruiker/gebruiker-info/gebruiker-info.component';
import { GebruikerFormComponent } from './gebruiker/gebruiker-form/gebruiker-form.component';
import { AuthRoutingModule } from './auth-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HelpComponent } from './help/help.component';
import {MatExpansionModule} from '@angular/material/expansion';

@NgModule({
  declarations: [
    GebruikerInfoComponent,
    GebruikerFormComponent,
    DashboardComponent,
    HelpComponent,
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatExpansionModule
  ],
  exports: [
    GebruikerInfoComponent,
    GebruikerFormComponent
  ]
})
export class AuthModule { }
