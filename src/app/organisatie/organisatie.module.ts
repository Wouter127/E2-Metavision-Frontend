import { NgModule } from '@angular/core';
import { AppRoutingModule } from '../app-routing.module';
import { SharedModule } from '../shared/shared.module';
import { OrganisatieFormComponent } from './organisatie-form/organisatie-form.component';
import { OrganisatieInstellingenComponent } from './organisatie-instellingen/organisatie-instellingen.component';
import { OrganisatieListComponent } from './organisatie-list/organisatie-list.component';
import { OrganisatieToevoegenComponent } from './organisatie-toevoegen/organisatie-toevoegen.component';



@NgModule({
  declarations: [
    OrganisatieFormComponent,
    OrganisatieListComponent,
    OrganisatieToevoegenComponent,
    OrganisatieInstellingenComponent
  ],
  imports: [
    SharedModule,
    AppRoutingModule
  ],
  exports: [
    OrganisatieFormComponent,
    OrganisatieListComponent,
    OrganisatieToevoegenComponent,
    OrganisatieInstellingenComponent
  ]
})
export class OrganisatieModule { }
