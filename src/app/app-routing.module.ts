import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { OrganisatieInstellingenComponent } from './organisatie/organisatie-instellingen/organisatie-instellingen.component';
import { OrganisatieListComponent } from './organisatie/organisatie-list/organisatie-list.component';
import { OrganisatieToevoegenComponent } from './organisatie/organisatie-toevoegen/organisatie-toevoegen.component';
import { RegisterComponent } from './register/register.component';
import { UsersListComponent } from './users/users-list/users-list.component';
import { WeerstationActiverenComponent } from './weerstation/weerstation-activeren/weerstation-activeren.component';
import { WeerstationListComponent } from './weerstation/weerstation-list/weerstation-list.component';
import { WeerstationToevoegenComponent } from './weerstation/weerstation-toevoegen/weerstation-toevoegen.component';

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
  { path: 'userslist', component: UsersListComponent},
  { path: 'mijnweerstations', component: WeerstationListComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
