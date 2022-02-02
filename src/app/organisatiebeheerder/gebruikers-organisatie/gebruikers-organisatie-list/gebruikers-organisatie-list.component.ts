import { Component, OnInit, ViewChild } from '@angular/core';
import { Gebruiker } from 'src/app/interfaces/Gebruiker';
import { Subscription } from 'rxjs';
import { AuthStateService } from 'src/app/security/auth-state.service';
import { AuthService } from 'src/app/security/auth.service';
import { OrganisatieService } from 'src/app/services/organisatie.service';
import { GebruikerService } from 'src/app/services/gebruiker.service';
import { HotToastService } from '@ngneat/hot-toast';
import { DialogService } from '@ngneat/dialog';
import { GebruikersOrganisatieFormComponent } from '../gebruikers-organisatie-form/gebruikers-organisatie-form.component';
import { GebruikersOrganisatieToevoegenComponent } from '../gebruikers-organisatie-toevoegen/gebruikers-organisatie-toevoegen.component';


@Component({
  selector: 'app-gebruikers-organisatie-list',
  templateUrl: './gebruikers-organisatie-list.component.html',
  styleUrls: ['./gebruikers-organisatie-list.component.scss']
})
export class GebruikersOrganisatieListComponent implements OnInit {
  @ViewChild(GebruikersOrganisatieToevoegenComponent, { static: true }) gebruikersOrganisatieToevoegenComponent!: GebruikersOrganisatieToevoegenComponent;

  @ViewChild(GebruikersOrganisatieFormComponent, { static: true }) gebruikersOrganisatieFormComponent!: GebruikersOrganisatieFormComponent;


  loading: boolean = true;

  gebruiker!: Gebruiker | undefined;

  organisatie!: any;
  organisatie$: Subscription = new Subscription()


  constructor(private gebruikerService: GebruikerService,private dialog: DialogService, private authService: AuthService, private authStateService: AuthStateService, private organisatieService: OrganisatieService,  private toast: HotToastService) {
    this.toast.defaultConfig = {
      ...this.toast.defaultConfig,
      reverseOrder: true
    }
   }

  ngOnInit(): void {
    this.getOrganisatie();
    
  }

  toevoegenGebruiker(): void {
    this.gebruikersOrganisatieToevoegenComponent.openModal();

    
    // When the gebruiker is added successfully, refresh the list of gebruikers.
    this.gebruikersOrganisatieToevoegenComponent.output.subscribe(() => {
      this.getOrganisatie();
    });
  }

  wijzigGebruiker(id: number): void {
    console.log(id)
    this.gebruikersOrganisatieFormComponent.openModal(id);

    // When the gebruiker is edited successfully, refresh the list of gebruikers.
    this.gebruikersOrganisatieFormComponent.output.subscribe(() => {
      this.getOrganisatie();
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
          this.gebruikerService.deleteGebruikerAlsOrganistieBeheerder(id).pipe(
            this.toast.observe({
              loading: { content: 'Verwijderen...', position: 'bottom-right' },
              success: { content: 'Gebruiker verwijderd!', position: 'bottom-right', dismissible: true },
              error: {
                content: (e) => {
                  let msg = '<ul>';
                  msg += `<li><b>Er ging iets mis!</b></li>`;
                  for (let key in e.error.errors) {
                    msg += `<li>${e.error.errors[key]}</li>`;
                  }
                  msg += '</ul>';

                  return msg;
                }, position: 'bottom-right', dismissible: true, duration: 5000
              },
            })
          ).subscribe(
            result => {
              this.getOrganisatie();
            },
            error => {
              console.log(error);
              
            }
          );
        }
      });
  }

  getOrganisatie() {
    this.authStateService.gebruikerAuthState.subscribe(
      isLoggedIn => {
        if (isLoggedIn) {
          this.authService.getGebruiker().subscribe(
            gebruiker => {
              this.gebruiker = gebruiker;
              this.organisatie$ = this.organisatieService.getOrganisatieWithGebruikers(gebruiker.organisatieId).subscribe(
                result => {
                  this.loading = false;

                  this.organisatie = result;
                },
                error => {
                  this.toast.error("Er ging iets mis. De weerstations kunnen niet worden opgehaald.", { position: 'bottom-right', dismissible: true, autoClose: false });
                }
              )
            },
            error => {
              this.authService.logout();
            }
          );
        }
        else {
          this.gebruiker = undefined;
        }
      }
    );
  }
}
