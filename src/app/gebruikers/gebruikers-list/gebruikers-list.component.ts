import { trigger } from '@angular/animations';
import { Component, OnInit, ViewChild } from '@angular/core';
import { DialogService } from '@ngneat/dialog';
import { HotToastService } from '@ngneat/hot-toast';
import { Subscription } from 'rxjs';
import { Gebruiker } from 'src/app/interfaces/Gebruiker';
import { GebruikerService } from 'src/app/services/admin/gebruiker.service';
import { GebruikersFormOrganisatiebeheerderComponent } from '../gebruikers-form-organisatiebeheerder/gebruikers-form-organisatiebeheerder.component';
import { GebruikersFormComponent } from '../gebruikers-form/gebruikers-form.component';

@Component({
  selector: 'app-gebruikers-list',
  templateUrl: './gebruikers-list.component.html',
  styleUrls: ['./gebruikers-list.component.scss']
})
export class GebruikersListComponent implements OnInit {
  @ViewChild(GebruikersFormOrganisatiebeheerderComponent, { static: true }) gebruikersFormOrganisatiebeheerderComponent!: GebruikersFormOrganisatiebeheerderComponent;
  @ViewChild(GebruikersFormComponent, { static: true }) gebruikersFormComponent!: GebruikersFormComponent;

  loading: boolean = true;

  gebruikers: Gebruiker[] = [];
  gebruikers$: Subscription = new Subscription();

  gebruiker!: Gebruiker;
  gebruiker$: Subscription = new Subscription();

  constructor(private adminGebruikerService: GebruikerService, private toast: HotToastService, private dialog: DialogService) {
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

  toevoegenGebruiker(): void {
    this.gebruikersFormOrganisatiebeheerderComponent.openModal();

    // When the gebruiker is added successfully, refresh the list of gebruikers.
    this.gebruikersFormOrganisatiebeheerderComponent.output.subscribe(() => {
      this.getGebruikers();
    });
  }


  wijzigGebruiker(id: number): void {
    this.gebruikersFormComponent.openModal(id);

    // When the gebruiker is edited successfully, refresh the list of gebruikers.
    this.gebruikersFormComponent.output.subscribe(() => {
      this.getGebruikers();
    });
  }

  verwijderGebruiker(id: number): void {
    this.dialog
      .confirm({
        title: 'Gebruiker verwijderen?',
        body: 'Deze actie kan niet ongedaan gemaakt worden.'
      })
      .afterClosed$.subscribe(confirmed => {
        if (confirmed) {
          this.adminGebruikerService.deleteGebruiker(id).pipe(
            this.toast.observe({
              loading: { content: 'Verwijderen...', position: 'bottom-right' },
              success: { content: 'Gebruiker verwijderd!', position: 'bottom-right', dismissible: true },
              error: { content: 'Er ging iets mis.', position: 'bottom-right', dismissible: true },
            })
          ).subscribe(
            result => {
              this.getGebruikers();
            }
          );
        }
      });
  }

  getGebruikers() {
    // TODO: if logged in user in admin get all users
    // TODO: if logged in user is organisatie beheerder get users of organisation
    this.gebruikers$ = this.adminGebruikerService.getGebruikers().subscribe(
      result => {
        this.gebruikers = result;
        this.loading = false;
      },
      error => {
        this.toast.error("Er ging iets mis.  De gebruiker kan niet worden opgehaald.", { position: 'bottom-right', dismissible: true, autoClose: false });
      }
    );
  }
}
