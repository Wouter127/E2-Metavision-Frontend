import { Component, OnInit, ViewChild } from '@angular/core';
import { DialogService } from '@ngneat/dialog';
import { HotToastService } from '@ngneat/hot-toast';
import { Subscription } from 'rxjs';
import { Organisatie } from 'src/app/interfaces/Organisatie';
import { OrganisatieService } from 'src/app/services/organisatie.service';
import { OrganisatieFormComponent } from '../organisatie-form/organisatie-form.component';

@Component({
  selector: 'app-organisatie-list',
  templateUrl: './organisatie-list.component.html',
  styleUrls: ['./organisatie-list.component.scss']
})
export class OrganisatieListComponent implements OnInit {
  // @ViewChild(GebruikersFormOrganisatiebeheerderComponent, { static: true }) gebruikersFormOrganisatiebeheerderComponent!: GebruikersFormOrganisatiebeheerderComponent;
  @ViewChild(OrganisatieFormComponent, { static: true }) organisatieFormComponent!: OrganisatieFormComponent;

  loading: boolean = true;

  organisaties: Organisatie[] = [];
  organisaties$: Subscription = new Subscription();

  organisatie!: Organisatie;
  organisatie$: Subscription = new Subscription();

  constructor(private organisatiesService: OrganisatieService, private toast: HotToastService, private dialog: DialogService) {
    // Reverse the order of which the toasts are displayed
    this.toast.defaultConfig = {
      ...this.toast.defaultConfig,
      reverseOrder: true
    }
   }

  ngOnInit(): void {
    this.getOrganisaties();
  }

  ngOnDestroy(): void {
    this.organisaties$.unsubscribe();
    this.organisatie$.unsubscribe();
  }

  toevoegenOrganisatie(): void {
    this.organisatieFormComponent.openAddModal();

    // When the gebruiker is added successfully, refresh the list of gebruikers.
    this.organisatieFormComponent.output.subscribe(() => {
      this.getOrganisaties();
    });
  }


  wijzigOrganisatie(id: number): void {
    this.organisatieFormComponent.openEditModal(id);

    // When the gebruiker is edited successfully, refresh the list of gebruikers.
    this.organisatieFormComponent.output.subscribe(() => {
      this.getOrganisaties();
    });
  }

  verwijderOrganisatie(id: number): void {
    this.dialog
      .confirm({
        title: 'Organisatie verwijderen?',
        body: 'Deze actie kan niet ongedaan gemaakt worden. <br>' + this.organisaties[id-1].weerstations.length + " weerstations en " + this.organisaties[id-1].gebruikers.length + " gebruikers zullen ook verwijderd worden." 
      })
      .afterClosed$.subscribe(confirmed => {
        if (confirmed) {
          this.organisatiesService.deleteOrganisatie(id).pipe(
            this.toast.observe({
              loading: { content: 'Verwijderen...', position: 'bottom-right' },
              success: { content: 'Organisatie verwijderd!', position: 'bottom-right', dismissible: true },
              error: { content: 'Er ging iets mis.', position: 'bottom-right', dismissible: true },
            })
          ).subscribe(
            result => {
              this.getOrganisaties();
            }
          );
        }
      });
  }

  getOrganisaties() {
    // TODO: if logged in user in admin get all users
    // TODO: if logged in user is organisatie beheerder get users of organisation
    this.organisaties$ = this.organisatiesService.getOrganisaties().subscribe(
      result => {
        this.organisaties = result;
        this.loading = false;
      },
      error => {
        this.toast.error("Er ging iets mis.  De organisaties kunnen niet worden opgehaald.", { position: 'bottom-right', dismissible: true, autoClose: false });
      }
    );
  }

}
