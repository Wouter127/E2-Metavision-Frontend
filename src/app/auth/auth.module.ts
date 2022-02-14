import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GebruikerInfoComponent } from './gebruiker/gebruiker-info/gebruiker-info.component';
import { GebruikerFormComponent } from './gebruiker/gebruiker-form/gebruiker-form.component';
import { AuthRoutingModule } from './auth-routing.module';
import { FormsModule, NgModel, ReactiveFormsModule } from '@angular/forms';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HelpComponent } from './help/help.component';
import {MatExpansionModule} from '@angular/material/expansion';
import { WeerstationsComponent } from './weerstations/weerstations.component';
import { TooltipModule } from 'ng2-tooltip-directive';
import { NgToggleModule } from 'ng-toggle-button';
import { VraagFormComponent } from './vraag-form/vraag-form.component';

@NgModule({
  declarations: [
    GebruikerInfoComponent,
    GebruikerFormComponent,
    DashboardComponent,
    HelpComponent,
    WeerstationsComponent,
    VraagFormComponent,
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatExpansionModule,
    TooltipModule,
    NgToggleModule,
    
  ],
  exports: [
    GebruikerInfoComponent,
    GebruikerFormComponent,
    DashboardComponent,
    HelpComponent,
    WeerstationsComponent,
    VraagFormComponent
  ]
})
export class AuthModule { }
