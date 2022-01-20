import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GebruikersListComponent } from './gebruikers-list/gebruikers-list.component';
import { GebruikersFormComponent } from './gebruikers-form/gebruikers-form.component';

import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    GebruikersListComponent,
    GebruikersFormComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ]
})
export class GebruikersModule { }
