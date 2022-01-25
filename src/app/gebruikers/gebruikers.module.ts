import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GebruikersListComponent } from './gebruikers-list/gebruikers-list.component';
import { GebruikersFormComponent } from './gebruikers-form/gebruikers-form.component';

import { FormsModule } from '@angular/forms';
import { GebruikersFormOrganisatiebeheerderComponent } from './gebruikers-form-organisatiebeheerder/gebruikers-form-organisatiebeheerder.component';

@NgModule({
  declarations: [
    GebruikersListComponent,
    GebruikersFormComponent,
    GebruikersFormOrganisatiebeheerderComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    GebruikersFormComponent,
    GebruikersListComponent,
    GebruikersFormOrganisatiebeheerderComponent
  ]
})
export class GebruikersModule { }
