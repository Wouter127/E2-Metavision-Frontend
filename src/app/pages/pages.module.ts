import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageUnauthorizedComponent } from './page-unauthorized/page-unauthorized.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';



@NgModule({
  declarations: [
    PageUnauthorizedComponent,
    PageNotFoundComponent
  ],
  imports: [
    CommonModule
  ]
})
export class PagesModule { }
