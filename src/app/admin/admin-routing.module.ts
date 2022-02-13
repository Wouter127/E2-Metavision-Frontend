import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GebruikersListComponent } from './gebruikers/gebruikers-list/gebruikers-list.component';
import { WeerstationListComponent } from './weerstations/weerstation-list/weerstation-list.component';
import { OrganisatieListComponent } from './organisaties/organisatie-list/organisatie-list.component';
import { WeerstationsAlarmSchakelwaardesListComponent } from '../organisatiebeheerder/weerstations-organisatie/weerstations-alarm-schakelwaardes-list/weerstations-alarm-schakelwaardes-list.component';
import { OtaComponent } from './ota/ota.component';
import { SensorListComponent } from './sensors/sensor-list/sensor-list.component';
import { EmailListComponent } from './email/email-list/email-list.component';

const routes: Routes = [
    { path: 'gebruikers', component: GebruikersListComponent },
    { path: 'weerstations', component: WeerstationListComponent },
    { path: 'organisaties', component: OrganisatieListComponent },
    { path: 'waardes/:id', component: WeerstationsAlarmSchakelwaardesListComponent },
    { path: 'ota', component: OtaComponent },
    { path: 'sensoren', component: SensorListComponent },
    { path: 'email', component: EmailListComponent }
];

@NgModule({
    declarations: [],
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AdminRoutingModule { }
