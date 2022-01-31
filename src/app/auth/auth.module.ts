import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GebruikerInfoComponent } from './gebruiker/gebruiker-info/gebruiker-info.component';
import { GebruikerFormComponent } from './gebruiker/gebruiker-form/gebruiker-form.component';
import { AuthRoutingModule } from './auth-routing.module';

@NgModule({
  declarations: [
    GebruikerInfoComponent,
    GebruikerFormComponent,
  ],
  imports: [
    CommonModule,
    AuthRoutingModule
  ],
  exports: [
    GebruikerInfoComponent,
    GebruikerFormComponent
  ]
})
export class AuthModule { }
