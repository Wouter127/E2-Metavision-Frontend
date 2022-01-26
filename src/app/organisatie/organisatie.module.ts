import { NgModule } from '@angular/core';
import { AppRoutingModule } from '../app-routing.module';
import { SharedModule } from '../shared/shared.module';
import { OrganisatieInstellingenComponent } from './organisatie-instellingen/organisatie-instellingen.component';
import { OrganisatieToevoegenComponent } from './organisatie-toevoegen/organisatie-toevoegen.component';



@NgModule({
  declarations: [

    OrganisatieToevoegenComponent,
    OrganisatieInstellingenComponent
  ],
  imports: [
    SharedModule,
    AppRoutingModule
  ],
  exports: [

    OrganisatieToevoegenComponent,
    OrganisatieInstellingenComponent
  ]
})
export class OrganisatieModule { }
