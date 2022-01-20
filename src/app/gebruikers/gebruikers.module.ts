import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GebruikersListComponent } from './gebruikers-list/gebruikers-list.component';
import { GebruikersFormComponent } from './gebruikers-form/gebruikers-form.component';



@NgModule({
  declarations: [
    GebruikersListComponent,
    GebruikersFormComponent
  ],
  imports: [
    CommonModule
  ]
})
export class GebruikersModule { }
