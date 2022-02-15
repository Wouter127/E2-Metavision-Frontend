import { Component, OnInit, ViewChild } from '@angular/core';
import { DialogService } from '@ngneat/dialog';
import { HotToastService } from '@ngneat/hot-toast';
import { Subscription } from 'rxjs';
import { Vraag } from 'src/app/interfaces/Vraag';
import { AuthStateService } from 'src/app/security/auth-state.service';
import { GebruikerService } from 'src/app/services/gebruiker.service';
import { HelpService } from 'src/app/services/help.service';
import { VraagFormComponent } from '../vraag-form/vraag-form.component';

@Component({
  selector: 'app-help',
  templateUrl: './help.component.html',
  styleUrls: ['./help.component.scss']
})
export class HelpComponent implements OnInit {
  @ViewChild(VraagFormComponent, {static: true}) vraagFormComponent!: VraagFormComponent;

  loading: boolean = true

  gebruiker!: any;
  gebruiker$: Subscription = new Subscription();

  vragen: Vraag[] = [];
  vragen$: Subscription = new Subscription();

  vraag!: Vraag;
  vraag$: Subscription = new Subscription();

  
  constructor(private gebruikerService: GebruikerService, private authStateService: AuthStateService, private helpService: HelpService, private toast: HotToastService, private dialog: DialogService) { 
    // Reverse the order of which the toasts are displayed
    this.toast.defaultConfig = {
      ...this.toast.defaultConfig,
      reverseOrder: true
    }
  }

  ngOnInit(): void {
    this.getGebruikerInfo();
    this.getVragen();
  }

  ngOnDestroy(): void {
    this.vragen$.unsubscribe();
    this.vraag$.unsubscribe();
    this.gebruiker$.unsubscribe();
  }

  toevoegenVraag(): void {
    this.vraagFormComponent.openAddModal();

    // When the vraag is added successfully, refresh the list of gebruikers.
    this.vraagFormComponent.output.subscribe(() => {
      this.getVragen();
    });
  }

  wijzigVraag(id: number): void {
    this.vraagFormComponent.openEditModal(id);
    // When the vraag is edited successfully, refresh the list of vragen.
    this.vraagFormComponent.output.subscribe(() => {
      this.getVragen();
    });
  }

  verwijderVraag(id: number): void {
    this.dialog
    .confirm({
      title: 'Organisatie verwijderen?',
      body: 'Deze actie kan niet ongedaan gemaakt worden.' 
    })
    .afterClosed$.subscribe(confirmed => {
      if (confirmed) {
        this.helpService.deleteVraag(id).pipe(
          this.toast.observe({
            loading: { content: 'Verwijderen...', position: 'bottom-right' },
            success: { content: 'Vraag verwijderd!', position: 'bottom-right', dismissible: true },
            error: { content: 'Er ging iets mis.', position: 'bottom-right', dismissible: true },
          })
        ).subscribe(
          result => {
            this.getVragen();
          }
        );
      }
    });
  }

  getVragen() {
    this.vragen$ = this.helpService.getVragen().subscribe(
      result => {
        this.vragen = result;
        this.loading = false;
      },
      error => {
        this.toast.error("Er ging iets mis. De vragen kunnen niet worden opgehaald.", { position: 'bottom-right', dismissible: true, autoClose: false });

      }
    );
  }

  getGebruikerInfo() {
    this.authStateService.gebruikerAuthState.subscribe(
      isLoggedIn => {
        if (isLoggedIn) {
          this.gebruiker$ = this.gebruikerService.getGebruikerInfo().subscribe(
            result => {
              this.gebruiker = result;
              this.loading = false;
            },
            error => {
              this.toast.error("Er ging iets mis.  Uw account info kan niet worden opgehaald.", { position: 'bottom-right', dismissible: true, autoClose: false });
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
