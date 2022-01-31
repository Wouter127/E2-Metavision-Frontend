import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './non-auth/home/home.component';
import { LoginComponent } from './non-auth/login/login.component';
import { VervolledigOrganisatieBeheerderComponent } from './non-auth/vervolledig-organisatie-beheerder/vervolledig-organisatie-beheerder.component';
import { PubliekeWeerstationsListComponent } from './non-auth/publieke-weerstations-list/publieke-weerstations-list.component';
import { WeerstationDashboardComponent } from './non-auth/weerstation-dashboard/weerstation-dashboard.component';

import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';

import { AuthGuard } from './auth.guard';
import { OrganisatiebeheerderAuthGuard } from './organisatiebeheerder-auth.guard';
import { AdminAuthGuard } from './admin-auth.guard';
import { VervolledigGebruikerComponent } from './non-auth/vervolledig-gebruiker/vervolledig-gebruiker.component';

const routes: Routes = [
  // Non-auth
  { path: '', component: HomeComponent,data: { animation: 'isLeft' } },
  { path: 'login', component: LoginComponent, data: { animation: 'isRight'} },

  { path: 'vervolledig', component: VervolledigOrganisatieBeheerderComponent },
  { path: 'vervolledigGebruiker', component: VervolledigGebruikerComponent },

  { path: 'publiekeweerstations', component: PubliekeWeerstationsListComponent }, // TODO: crud maken (= variant op Admin WeerstationListComponent)
  { path: 'weerstation/:id/dashboard', component: WeerstationDashboardComponent },

  // Auth
  { path: 'auth', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule), canActivate: [AuthGuard], canActivateChild: [AuthGuard] },
  
  // Organisatiebeheerder
  { path: 'organisatiebeheerder', loadChildren: () => import('./organisatiebeheerder/organisatiebeheerder-routing.module').then(m => m.OrganisatiebeheerderRoutingModule), canActivate: [OrganisatiebeheerderAuthGuard], canActivateChild: [OrganisatiebeheerderAuthGuard] },
  // TODO: de waardes/:id route verplaatsen in een aparte routing module met zijn eigen auth guard die zowel organisatiebeheerder als admin toe laat

  // Admin
  { path: 'admin', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule), canActivate: [AdminAuthGuard], canActivateChild: [AdminAuthGuard] },


  
  // 404
  { path: '**', pathMatch: 'full', component: PageNotFoundComponent } // TODO
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
