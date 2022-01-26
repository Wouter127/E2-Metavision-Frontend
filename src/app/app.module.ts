import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavigationModule } from './navigation/navigation.module';
import { OrganisatieModule } from './organisatie/organisatie.module';
import { SharedModule } from './shared/shared.module';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { DashboardModule } from './dashboard/dashboard.module';
import { WeerstationModule } from './weerstation/weerstation.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HotToastModule } from '@ngneat/hot-toast';
import { DialogModule } from '@ngneat/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TooltipModule } from 'ng2-tooltip-directive';
import { VervolledigOrganisatieBeheerderComponent } from './vervolledig-organisatie-beheerder/vervolledig-organisatie-beheerder.component';
import { ClipboardModule } from 'ngx-clipboard';
import { AlarmwaardeModule } from './alarmwaarde/alarmwaarde.module';
import { NgApexchartsModule } from 'ng-apexcharts';
import { TokenInterceptor } from './security/token.interceptor';
import { AdminModule } from './admin/admin.module';
import { OrganisatiebeheerderModule } from './organisatiebeheerder/organisatiebeheerder.module';
import { AuthModule } from './auth/auth.module';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    VervolledigOrganisatieBeheerderComponent
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
    TooltipModule,
    HotToastModule.forRoot(),
    DialogModule.forRoot(),
    FormsModule,
    ClipboardModule,
    AlarmwaardeModule,
    ReactiveFormsModule,
    NgApexchartsModule,
    AdminModule,
    OrganisatiebeheerderModule,
    AuthModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
