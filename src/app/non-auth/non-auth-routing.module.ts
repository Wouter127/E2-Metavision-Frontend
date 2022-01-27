import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { VervolledigOrganisatieBeheerderComponent } from './vervolledig-organisatie-beheerder/vervolledig-organisatie-beheerder.component';
import { PubliekeWeerstationsListComponent } from './publieke-weerstations-list/publieke-weerstations-list.component';
import { WeerstationDashboardComponent } from './weerstation-dashboard/weerstation-dashboard.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },

  { path: 'vervolledig', component: VervolledigOrganisatieBeheerderComponent },
  { path: 'publiekeweerstations', component: PubliekeWeerstationsListComponent }, // TODO: crud maken (= variant op Admin WeerstationListComponent)
  { path: 'weerstation/:id/dashboard', component: WeerstationDashboardComponent },
  ];

@NgModule({
declarations: [],
imports: [RouterModule.forChild(routes)],
exports: [RouterModule]
})
export class NonAuthRoutingModule { }
