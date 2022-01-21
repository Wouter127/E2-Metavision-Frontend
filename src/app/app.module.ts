import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavigationModule } from './navigation/navigation.module';
import { OrganisatieModule } from './organisatie/organisatie.module';
import { SharedModule } from './shared/shared.module';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { UsersListComponent } from './users/users-list/users-list.component';
import { UsersFormComponent } from './users/users-form/users-form.component';
// import { WeerstationActiverenComponent } from './weerstation/weerstation-activeren/weerstation-activeren.component';
import { WeerstationAlarmSchakelwaardesFormComponent } from './weerstation/weerstation-alarm-schakelwaardes-form/weerstation-alarm-schakelwaardes-form.component';
import { OrganisatieListComponent } from './organisatie/organisatie-list/organisatie-list.component';
import { WeerstationListComponent } from './weerstation/weerstation-list/weerstation-list.component';
import { WeerstationToevoegenComponent } from './weerstation/weerstation-toevoegen/weerstation-toevoegen.component';
import { DashboardModule } from './dashboard/dashboard.module';
import { OrganisatieToevoegenComponent } from './organisatie/organisatie-toevoegen/organisatie-toevoegen.component';
import { WeerstationModule } from './weerstation/weerstation.module';

import { DashboardComponent } from './dashboard/dashboard.component';
import { NavigationComponent } from './navigation/navigation.component';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    NavigationModule,
    OrganisatieModule,
    DashboardModule,
    WeerstationModule,
    HttpClientModule,
    FormsModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
