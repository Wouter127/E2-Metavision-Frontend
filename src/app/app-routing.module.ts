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
import { AuthAdminGuard } from './security/auth-admin.guard';
import { PageUnauthorizedComponent } from './pages/page-unauthorized/page-unauthorized.component';
import { AuthOrganisatiebeheerderGuard } from './security/auth-organisatiebeheerder.guard';
import { AuthAuthGuard } from './security/auth-auth.guard';
import { Role } from './interfaces/Role'

const routes: Routes = [
  // Non-auth
  { path: '', loadChildren: () => import('./non-auth/non-auth.module').then(m => m.NonAuthModule) },

  // Auth
  { path: 'auth', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule), canActivate: [AuthAuthGuard], canActivateChild: [AuthAuthGuard]},

  // Organisatiebeheerder
  { path: 'organisatiebeheerder', loadChildren: () => import('./organisatiebeheerder/organisatiebeheerder.module').then(m => m.OrganisatiebeheerderModule), canActivate: [AuthOrganisatiebeheerderGuard], canActivateChild: [AuthOrganisatiebeheerderGuard], data: { roles: [Role.Organisatiebeheerder] }},

  // Admin
  { path: 'admin', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule), canActivate: [AuthAdminGuard], canActivateChild: [AuthAdminGuard], data: {
    allowedRoles: ['admin']
  } },

  // 404 
  { path: '403', pathMatch: 'full', component: PageUnauthorizedComponent }, // TODO
  { path: '**', pathMatch: 'full', component: PageNotFoundComponent } // TODO
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
