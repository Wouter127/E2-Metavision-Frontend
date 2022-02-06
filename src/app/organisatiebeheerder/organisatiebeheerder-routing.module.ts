import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WeerstationsOrganisatieListComponent } from './weerstations-organisatie/weerstations-organisatie-list/weerstations-organisatie-list.component';
import { WeerstationsAlarmSchakelwaardesListComponent } from './weerstations-organisatie/weerstations-alarm-schakelwaardes-list/weerstations-alarm-schakelwaardes-list.component';
import { OrganisatieInfoComponent } from './organisatie/organisatie-info/organisatie-info.component';
import { GebruikersOrganisatieListComponent } from './gebruikers-organisatie/gebruikers-organisatie-list/gebruikers-organisatie-list.component';

const routes: Routes = [
    { path: 'weerstations', component: WeerstationsOrganisatieListComponent }, // TODO: crud maken (= variant op Admin WeerstationListComponent)
    { path: 'waardes/:id', component: WeerstationsAlarmSchakelwaardesListComponent },
    { path: 'organisatie', component: OrganisatieInfoComponent},
    { path: 'gebruikers', component: GebruikersOrganisatieListComponent},
];

@NgModule({
    declarations: [],
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class OrganisatiebeheerderRoutingModule { }
