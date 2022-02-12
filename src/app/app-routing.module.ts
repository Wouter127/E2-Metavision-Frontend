import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './non-auth/home/home.component';
import { LoginComponent } from './non-auth/login/login.component';
import { VervolledigOrganisatieBeheerderComponent } from './non-auth/vervolledig-organisatie-beheerder/vervolledig-organisatie-beheerder.component';
import { PubliekeWeerstationsListComponent } from './non-auth/publieke-weerstations-list/publieke-weerstations-list.component';
import { WeerstationDashboardComponent } from './non-auth/dashboard/weerstation-dashboard/weerstation-dashboard.component';

import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';

import { AuthGuard } from './auth.guard';
import { OrganisatiebeheerderAuthGuard } from './organisatiebeheerder-auth.guard';
import { AdminAuthGuard } from './admin-auth.guard';
import { VervolledigGebruikerComponent } from './non-auth/vervolledig-gebruiker/vervolledig-gebruiker.component';
import { WeerstationDashboardTemperatuurComponent } from './non-auth/dashboard/weerstation-dashboard-temperatuur/weerstation-dashboard-temperatuur.component';
import { WeerstationDashboardLuchtvochtigheidComponent } from './non-auth/dashboard/weerstation-dashboard-luchtvochtigheid/weerstation-dashboard-luchtvochtigheid.component';
import { WeerstationDashboardLichtComponent } from './non-auth/dashboard/weerstation-dashboard-licht/weerstation-dashboard-licht.component';
import { WeerstationDashboardBatterijComponent } from './non-auth/dashboard/weerstation-dashboard-batterij/weerstation-dashboard-batterij.component';
import { WeerstationDashboardLocationComponent } from './non-auth/dashboard/weerstation-dashboard-location/weerstation-dashboard-location.component';
import { ResetWachtwoordComponent } from './non-auth/reset-wachtwoord/reset-wachtwoord.component';
import { NieuwWachtwoordComponent } from './non-auth/nieuw-wachtwoord/nieuw-wachtwoord.component';
import { LoginGuard } from './login.guard';


const routes: Routes = [
  // Non-auth
  { path: '', component: HomeComponent,data: { animation: 'isLeft' } },
  { path: 'login', component: LoginComponent, data: { animation: 'isRight'}, canActivate: [LoginGuard] },

  { path: 'vervolledig', component: VervolledigOrganisatieBeheerderComponent },
  { path: 'vervolledigGebruiker', component: VervolledigGebruikerComponent },

  { path: 'requestWachtwoordReset', component: ResetWachtwoordComponent},
  { path: 'nieuw-wachtwoord', component: NieuwWachtwoordComponent},

  { path: 'weerstations/publiek', pathMatch: 'full', component: PubliekeWeerstationsListComponent },
  { path: 'weerstation/:id/dashboard', pathMatch: 'full', component: WeerstationDashboardComponent },
  { path: 'weerstation/:id/locatie', pathMatch: 'full', component: WeerstationDashboardLocationComponent },
  { path: 'weerstation/:id/dashboard/temperatuur', pathMatch: 'full', component: WeerstationDashboardTemperatuurComponent },
  { path: 'weerstation/:id/dashboard/luchtvochtigheid', pathMatch: 'full', component: WeerstationDashboardLuchtvochtigheidComponent },
  { path: 'weerstation/:id/dashboard/licht', pathMatch: 'full', component: WeerstationDashboardLichtComponent },
  { path: 'weerstation/:id/dashboard/batterij', pathMatch: 'full', component: WeerstationDashboardBatterijComponent },


  // Auth
  { path: 'auth', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule), canActivate: [AuthGuard], canActivateChild: [AuthGuard] },
  
  // Organisatiebeheerder
  { path: 'organisatiebeheerder', loadChildren: () => import('./organisatiebeheerder/organisatiebeheerder-routing.module').then(m => m.OrganisatiebeheerderRoutingModule), canActivate: [OrganisatiebeheerderAuthGuard], canActivateChild: [OrganisatiebeheerderAuthGuard] },

  // Admin
  { path: 'admin', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule), canActivate: [AdminAuthGuard], canActivateChild: [AdminAuthGuard] },


  
  // 404
  { path: '**', pathMatch: 'full', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
