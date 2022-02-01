import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { GebruikerInfoComponent } from './gebruiker/gebruiker-info/gebruiker-info.component';
import { HelpComponent } from './help/help.component';

const routes: Routes = [
    { path: 'account', component: GebruikerInfoComponent }, // TODO: crud maken
    { path: 'dashboard', component: DashboardComponent,data: { animation: 'isBottom' } },//TODO: Dashboard maken
    { path: 'help', component: HelpComponent}, // TODO: Dashboard maken

];

@NgModule({
    declarations: [],
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class AuthRoutingModule { }