import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { GebruikerInfoComponent } from './gebruiker/gebruiker-info/gebruiker-info.component';
import { WeerstationsComponent } from './weerstations/weerstations.component';

const routes: Routes = [
    { path: 'account', component: GebruikerInfoComponent },
    { path: 'dashboard', component: DashboardComponent,data: { animation: 'isBottom' } },
    { path: 'weerstations', component: WeerstationsComponent}
];

@NgModule({
    declarations: [],
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class AuthRoutingModule { }