import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from '../app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ResetWachtwoordComponent } from './reset-wachtwoord/reset-wachtwoord.component';
import { TooltipModule } from 'ng2-tooltip-directive';
import { HotToastModule } from '@ngneat/hot-toast';
import { DialogModule } from '@ngneat/dialog';
import { ClipboardModule } from 'ngx-clipboard';
import { NgApexchartsModule } from 'ng-apexcharts';
import { VervolledigOrganisatieBeheerderComponent } from './vervolledig-organisatie-beheerder/vervolledig-organisatie-beheerder.component';
import { PubliekeWeerstationsListComponent } from './publieke-weerstations-list/publieke-weerstations-list.component';
import { WeerstationDashboardComponent } from './weerstation-dashboard/weerstation-dashboard.component';
import { HomeComponent } from './home/home.component';



@NgModule({
  declarations: [
    LoginComponent,
    ResetWachtwoordComponent,
    VervolledigOrganisatieBeheerderComponent,
    PubliekeWeerstationsListComponent,
    WeerstationDashboardComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    TooltipModule,
    HotToastModule.forRoot(),
    DialogModule.forRoot(),
    FormsModule,
    ClipboardModule,
    ReactiveFormsModule,
    NgApexchartsModule,
  ],
  exports: [
    LoginComponent,
    ResetWachtwoordComponent,
    VervolledigOrganisatieBeheerderComponent,
    PubliekeWeerstationsListComponent
  ]
})
export class NonAuthModule { }
