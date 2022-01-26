import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AlarmwaardesListComponent } from './alarmwaarde/alarmwaardes-list/alarmwaardes-list.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { GebruikersListComponent } from './admin/gebruikers/gebruikers-list/gebruikers-list.component';
import { LoginComponent } from './login/login.component';
import { OrganisatieInstellingenComponent } from './organisatie/organisatie-instellingen/organisatie-instellingen.component';
import { OrganisatieListComponent } from './admin/organisaties/organisatie-list/organisatie-list.component';
import { OrganisatieToevoegenComponent } from './organisatie/organisatie-toevoegen/organisatie-toevoegen.component';
import { RegisterComponent } from './register/register.component';
import { VervolledigOrganisatieBeheerderComponent } from './vervolledig-organisatie-beheerder/vervolledig-organisatie-beheerder.component';
import { WeerstationActiverenComponent } from './weerstation/weerstation-activeren/weerstation-activeren.component';
import { WeerstationFormComponent } from './admin/weerstations/weerstation-form/weerstation-form.component';
import { WeerstationToevoegenComponent } from './admin/weerstations/weerstation-toevoegen/weerstation-toevoegen.component';
import { WeerstationDashboardComponent } from './weerstation/weerstation-dashboard/weerstation-dashboard.component';
import { WeerstationListComponent } from './admin/weerstations/weerstation-list/weerstation-list.component';
const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: 'login', component: LoginComponent},
  { path: 'register', component: RegisterComponent},
  { path: 'weerstationtoevoegen', component: WeerstationToevoegenComponent},
  { path: 'organisatietoevoegen', component: OrganisatieToevoegenComponent},
  { path: 'alleweerstations', component: WeerstationListComponent},
  { path: 'organisaties', component: OrganisatieListComponent},
  { path: 'weerstationactiveren', component: WeerstationActiverenComponent},
  { path: 'organisatieinstellingen', component: OrganisatieInstellingenComponent},
  { path: 'gebruikers', component: GebruikersListComponent},
  { path: 'vervolledig', component: VervolledigOrganisatieBeheerderComponent},
  { path: 'mijnweerstations', component: WeerstationListComponent},
  { path: 'waardes/:id', component: AlarmwaardesListComponent},
  { path: 'weerstations/form', component: WeerstationFormComponent},
  { path: 'weerstation/:id/dashboard', component: WeerstationDashboardComponent},
  // { path: 'woutertest', component: OrganisatieFormComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
