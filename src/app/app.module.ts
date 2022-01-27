import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Modules
import { NonAuthModule } from './non-auth/non-auth.module';
import { AuthModule } from './auth/auth.module';
import { OrganisatiebeheerderModule } from './organisatiebeheerder/organisatiebeheerder.module';
import { AdminModule } from './admin/admin.module';

import { NavigationModule } from './navigation/navigation.module';

// Libraries
import { NgApexchartsModule } from 'ng-apexcharts';
import { ClipboardModule } from 'ngx-clipboard';
import { TooltipModule } from 'ng2-tooltip-directive';
import { HotToastModule } from '@ngneat/hot-toast';
import { DialogModule } from '@ngneat/dialog';

// Interceptors
import { TokenInterceptor } from './security/token.interceptor';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NavigationModule,
    NgApexchartsModule,
    ClipboardModule,
    TooltipModule,
    HotToastModule.forRoot(),
    DialogModule.forRoot(),
    HttpClientModule,
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
