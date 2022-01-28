import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GebruikersListComponent } from './gebruikers/gebruikers-list/gebruikers-list.component';
import { WeerstationListComponent } from './weerstations/weerstation-list/weerstation-list.component';
import { OrganisatieListComponent } from './organisaties/organisatie-list/organisatie-list.component';
import { WeerstationsAlarmSchakelwaardesListComponent } from '../organisatiebeheerder/weerstations-organisatie/weerstations-alarm-schakelwaardes-list/weerstations-alarm-schakelwaardes-list.component';

const routes: Routes = [
    { path: 'gebruikers', component: GebruikersListComponent },
    { path: 'weerstations', component: WeerstationListComponent },
    { path: 'organisaties', component: OrganisatieListComponent }, // TODO: crud maken
    { path: 'waardes/:id', component: WeerstationsAlarmSchakelwaardesListComponent },

];

@NgModule({
    declarations: [],
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AdminRoutingModule { }