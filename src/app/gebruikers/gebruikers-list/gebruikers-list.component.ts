import { trigger } from '@angular/animations';
import { Component, OnInit, ViewChild } from '@angular/core';
import { HotToastService } from '@ngneat/hot-toast';
import { Subscription } from 'rxjs';
import { Gebruiker } from 'src/app/interfaces/Gebruiker';
import { GebruikerService } from 'src/app/services/admin/gebruiker.service';
import { GebruikersFormComponent } from '../gebruikers-form/gebruikers-form.component';

@Component({
  selector: 'app-gebruikers-list',
  templateUrl: './gebruikers-list.component.html',
  styleUrls: ['./gebruikers-list.component.scss']
})
export class GebruikersListComponent implements OnInit {
  @ViewChild(GebruikersFormComponent, { static: true }) gebruikersFormComponent!: GebruikersFormComponent;

  loading: boolean = true;

  gebruikers: Gebruiker[] = [];
  gebruikers$: Subscription = new Subscription();

  gebruiker!: Gebruiker;
  gebruiker$: Subscription = new Subscription();

  constructor(private adminGebruikerService: GebruikerService, private toast: HotToastService) {
    // Reverse the order of which the toasts are displayed
    this.toast.defaultConfig = {
      ...this.toast.defaultConfig,
      reverseOrder: true
    }
   }

  ngOnInit(): void {
    this.getGebruikers();
  }

  ngOnDestroy(): void {
    this.gebruikers$.unsubscribe();
    this.gebruiker$.unsubscribe();
  }

  wijzigGebruiker(id: number): void {
    this.gebruikersFormComponent.openModal(id);
  }

  verwijderGebruiker(id: number): void {
    this.adminGebruikerService.deleteGebruiker(id).pipe(
      this.toast.observe({
        loading: { content: 'Verwijderen...', position: 'bottom-right' },
        success: { content: 'Gebruiker verwijderd!', position: 'bottom-right', dismissible: true },
        error: { content: 'Er ging iets mis.', position: 'bottom-right', dismissible: true },
      })
    ).subscribe(
      result => {
        console.log(result);
      },
      error => {
        console.log('ERROR:', error);
      }
    );
  }

  getGebruikers() {
    // TODO: if logged in user in admin get all users
    // TODO: if logged in user is organisatie beheerder get users of organisation
    this.gebruikers$ = this.adminGebruikerService.getGebruikers().subscribe(
      result => {
        this.gebruikers = result;
        this.loading = false; // TODO: bij error ook loading = false, is er geen always?
      },
      error => {
        console.log('ERROR: ', error);
      }
    );
  }
}
