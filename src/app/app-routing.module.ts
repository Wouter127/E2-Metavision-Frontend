import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './non-auth/home/home.component';
import { LoginComponent } from './non-auth/login/login.component';
import { VervolledigOrganisatieBeheerderComponent } from './non-auth/vervolledig-organisatie-beheerder/vervolledig-organisatie-beheerder.component';
import { PubliekeWeerstationsListComponent } from './non-auth/publieke-weerstations-list/publieke-weerstations-list.component';
import { WeerstationDashboardComponent } from './non-auth/weerstation-dashboard/weerstation-dashboard.component';

import { GebruikerInfoComponent } from './auth/gebruiker/gebruiker-info/gebruiker-info.component';

import { WeerstationsOrganisatieListComponent } from './organisatiebeheerder/weerstations-organisatie/weerstations-organisatie-list/weerstations-organisatie-list.component';
import { WeerstationsActiverenComponent } from './organisatiebeheerder/weerstations-organisatie/weerstations-activeren/weerstations-activeren.component';
import { WeerstationsAlarmSchakelwaardesListComponent } from './organisatiebeheerder/weerstations-organisatie/weerstations-alarm-schakelwaardes-list/weerstations-alarm-schakelwaardes-list.component';

import { GebruikersListComponent } from './admin/gebruikers/gebruikers-list/gebruikers-list.component';
import { WeerstationListComponent } from './admin/weerstations/weerstation-list/weerstation-list.component';
import { OrganisatieListComponent } from './admin/organisaties/organisatie-list/organisatie-list.component';

import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';

const routes: Routes = [
  // Non-auth
  { path: '', component: HomeComponent,data: { animation: 'isLeft' } },
  { path: 'login', component: LoginComponent, data: { animation: 'isRight'} },

  { path: 'vervolledig', component: VervolledigOrganisatieBeheerderComponent },
  { path: 'publiekeweerstations', component: PubliekeWeerstationsListComponent }, // TODO: crud maken (= variant op Admin WeerstationListComponent)
  { path: 'weerstation/:id/dashboard', component: WeerstationDashboardComponent },

  // Auth
  { path: 'auth', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule) },
  
  // Organisatiebeheerder
  { path: 'organisatiebeheerder', loadChildren: () => import('./organisatiebeheerder/organisatiebeheerder-routing.module').then(m => m.OrganisatiebeheerderRoutingModule) },

  // Admin
  { path: 'admin', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule) },


  
  // 404
  { path: '**', pathMatch: 'full', component: PageNotFoundComponent } // TODO
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
