import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AlarmwaardesListComponent } from './alarmwaarde/alarmwaardes-list/alarmwaardes-list.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { GebruikersListComponent } from './gebruikers/gebruikers-list/gebruikers-list.component';
import { LoginComponent } from './login/login.component';
import { OrganisatieInstellingenComponent } from './organisatie/organisatie-instellingen/organisatie-instellingen.component';
import { OrganisatieListComponent } from './organisatie/organisatie-list/organisatie-list.component';
import { OrganisatieToevoegenComponent } from './organisatie/organisatie-toevoegen/organisatie-toevoegen.component';
import { RegisterComponent } from './register/register.component';
import { VervolledigOrganisatieBeheerderComponent } from './vervolledig-organisatie-beheerder/vervolledig-organisatie-beheerder.component';
import { WeerstationActiverenComponent } from './weerstation/weerstation-activeren/weerstation-activeren.component';
import { WeerstationFormComponent } from './weerstation/weerstation-form/weerstation-form.component';
import { WeerstationListComponent } from './weerstation/weerstation-list/weerstation-list.component';
import { WeerstationToevoegenComponent } from './weerstation/weerstation-toevoegen/weerstation-toevoegen.component';
import { WeerstationDashboardComponent } from './weerstation/weerstation-dashboard/weerstation-dashboard.component';

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

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
