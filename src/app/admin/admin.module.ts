import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from '../app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TooltipModule } from 'ng2-tooltip-directive';
import { NgToggleModule } from 'ng-toggle-button';
import { NgApexchartsModule } from 'ng-apexcharts';
import { WeerstationFormComponent } from './weerstations/weerstation-form/weerstation-form.component';
import { WeerstationListComponent } from './weerstations/weerstation-list/weerstation-list.component';
import { WeerstationToevoegenComponent } from './weerstations/weerstation-toevoegen/weerstation-toevoegen.component';
import { GebruikersListComponent } from './gebruikers/gebruikers-list/gebruikers-list.component';
import { GebruikersFormComponent } from './gebruikers/gebruikers-form/gebruikers-form.component';
import { GebruikersFormOrganisatiebeheerderComponent } from './gebruikers/gebruikers-form-organisatiebeheerder/gebruikers-form-organisatiebeheerder.component';
import { OrganisatieFormComponent } from './organisaties/organisatie-form/organisatie-form.component';
import { OrganisatieListComponent } from './organisaties/organisatie-list/organisatie-list.component';
import { AdminRoutingModule } from './admin-routing.module';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { SensorListComponent } from './sensors/sensor-list/sensor-list.component';
import { SensorFormComponent } from './sensors/sensor-form/sensor-form.component';
import { EmailListComponent } from './email/email-list/email-list.component';
import { EmailFormComponent } from './email/email-form/email-form.component';
import { EmailConfigFormComponent } from './email/email-config-form/email-config-form.component';
import { OtaListComponent } from './ota/ota-list/ota-list.component';
import { OtaPlannenComponent } from './ota/ota-plannen/ota-plannen.component';

@NgModule({
  declarations: [
    WeerstationFormComponent,
    WeerstationListComponent,
    WeerstationToevoegenComponent,
    GebruikersListComponent,
    GebruikersFormComponent,
    GebruikersFormOrganisatiebeheerderComponent,
    OrganisatieFormComponent,
    OrganisatieListComponent,
    SensorListComponent,
    SensorFormComponent,
    EmailListComponent,
    EmailFormComponent,
    EmailConfigFormComponent,
    OtaListComponent,
    OtaPlannenComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    TooltipModule,
    NgToggleModule,
    ReactiveFormsModule,
    NgApexchartsModule,
    AdminRoutingModule,
    MatExpansionModule,
    MatCheckboxModule
  ],
  exports: [
    WeerstationFormComponent,
    WeerstationListComponent,
    WeerstationToevoegenComponent,
    GebruikersListComponent,
    GebruikersFormComponent,
    GebruikersFormOrganisatiebeheerderComponent,
    OrganisatieFormComponent,
    OrganisatieListComponent
  ]
})
export class AdminModule { }
