import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GebruikersOrganisatieListComponent } from './gebruikers-organisatie/gebruikers-organisatie-list/gebruikers-organisatie-list.component';
import { GebruikersOrganisatieFormComponent } from './gebruikers-organisatie/gebruikers-organisatie-form/gebruikers-organisatie-form.component';
import { GebruikersOrganisatieToevoegenComponent } from './gebruikers-organisatie/gebruikers-organisatie-toevoegen/gebruikers-organisatie-toevoegen.component';
import { WeerstationsOrganisatieListComponent } from './weerstations-organisatie/weerstations-organisatie-list/weerstations-organisatie-list.component';
import { WeerstationsOrganisatieFormComponent } from './weerstations-organisatie/weerstations-organisatie-form/weerstations-organisatie-form.component';
import { WeerstationsActiverenComponent } from './weerstations-organisatie/weerstations-activeren/weerstations-activeren.component';
import { OrganisatieInfoComponent } from './organisatie/organisatie-info/organisatie-info.component';
import { OrganisatieFormComponent } from './organisatie/organisatie-form/organisatie-form.component';



@NgModule({
  declarations: [
    GebruikersOrganisatieListComponent,
    GebruikersOrganisatieFormComponent,
    GebruikersOrganisatieToevoegenComponent,
    WeerstationsOrganisatieListComponent,
    WeerstationsOrganisatieFormComponent,
    WeerstationsActiverenComponent,
    OrganisatieInfoComponent,
    OrganisatieFormComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    GebruikersOrganisatieListComponent,
    GebruikersOrganisatieFormComponent,
    GebruikersOrganisatieToevoegenComponent,
    WeerstationsOrganisatieListComponent,
    WeerstationsOrganisatieFormComponent,
    WeerstationsActiverenComponent,
    OrganisatieInfoComponent,
    OrganisatieFormComponent
  ]
})
export class OrganisatiebeheerderModule { }
