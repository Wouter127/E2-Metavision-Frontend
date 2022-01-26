import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GebruikerInfoComponent } from './gebruiker/gebruiker-info/gebruiker-info.component';
import { GebruikerFormComponent } from './gebruiker/gebruiker-form/gebruiker-form.component';



@NgModule({
  declarations: [
    GebruikerInfoComponent,
    GebruikerFormComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    GebruikerInfoComponent,
    GebruikerFormComponent
  ]
})
export class AuthModule { }
