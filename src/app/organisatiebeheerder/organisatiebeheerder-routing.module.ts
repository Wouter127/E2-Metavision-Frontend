import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { WeerstationsOrganisatieListComponent } from './weerstations-organisatie/weerstations-organisatie-list/weerstations-organisatie-list.component';
import { WeerstationsActiverenComponent } from './weerstations-organisatie/weerstations-activeren/weerstations-activeren.component';
import { WeerstationsAlarmSchakelwaardesListComponent } from './weerstations-organisatie/weerstations-alarm-schakelwaardes-list/weerstations-alarm-schakelwaardes-list.component';

const routes: Routes = [
  { path: 'weerstations', component: WeerstationsOrganisatieListComponent }, // TODO: crud maken (= variant op Admin WeerstationListComponent)
  { path: 'weerstationactiveren', component: WeerstationsActiverenComponent }, // TODO: omzetten naar model die aangeroepen wordt bij weerstationlijst als organisatiebeheerder
  { path: 'waardes/:id', component: WeerstationsAlarmSchakelwaardesListComponent },
 ];

@NgModule({
declarations: [],
imports: [RouterModule.forChild(routes)],
exports: [RouterModule]
})
export class OrganisatiebeheerderRoutingModule { }
