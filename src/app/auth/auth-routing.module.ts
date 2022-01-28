import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GebruikerInfoComponent } from './gebruiker/gebruiker-info/gebruiker-info.component';

const routes: Routes = [
    { path: 'account', component: GebruikerInfoComponent }, // TODO: crud maken
];

@NgModule({
    declarations: [],
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class AuthRoutingModule { }