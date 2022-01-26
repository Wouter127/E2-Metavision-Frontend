import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavigationModule } from './navigation/navigation.module';
import { OrganisatieModule } from './organisatie/organisatie.module';
import { LoginComponent } from './non-auth/login/login.component';
import { RegisterComponent } from './register/register.component';
import { DashboardModule } from './dashboard/dashboard.module';
import { WeerstationModule } from './weerstation/weerstation.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HotToastModule } from '@ngneat/hot-toast';
import { DialogModule } from '@ngneat/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TooltipModule } from 'ng2-tooltip-directive';
import { ClipboardModule } from 'ngx-clipboard';
import { NgApexchartsModule } from 'ng-apexcharts';
import { TokenInterceptor } from './security/token.interceptor';
import { AdminModule } from './admin/admin.module';
import { OrganisatiebeheerderModule } from './organisatiebeheerder/organisatiebeheerder.module';
import { AuthModule } from './auth/auth.module';
import { NonAuthModule } from './non-auth/non-auth.module';
import { VervolledigOrganisatieBeheerderComponent } from './non-auth/vervolledig-organisatie-beheerder/vervolledig-organisatie-beheerder.component';
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
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
    ReactiveFormsModule,
    NgApexchartsModule,
    AdminModule,
    OrganisatiebeheerderModule,
    AuthModule,
    NonAuthModule,
    SharedModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
