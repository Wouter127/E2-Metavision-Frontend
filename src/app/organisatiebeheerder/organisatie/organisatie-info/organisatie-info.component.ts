import { Component, OnInit, ViewChild } from '@angular/core';
import { DialogService } from '@ngneat/dialog';
import { HotToastService } from '@ngneat/hot-toast';
import { Subscription } from 'rxjs';
import { Organisatie } from 'src/app/interfaces/Organisatie';
import { OrganisatieService } from 'src/app/services/organisatie.service';
import { OrganisatieFormComponent } from '../organisatie-form/organisatie-form.component';

@Component({
  selector: 'app-organisatie-info',
  templateUrl: './organisatie-info.component.html',
  styleUrls: ['./organisatie-info.component.scss']
})
export class OrganisatieInfoComponent implements OnInit {

  // @ViewChild(GebruikersFormOrganisatiebeheerderComponent, { static: true }) gebruikersFormOrganisatiebeheerderComponent!: GebruikersFormOrganisatiebeheerderComponent;
  @ViewChild(OrganisatieFormComponent, { static: true }) organisatieFormComponent!: OrganisatieFormComponent;

  loading: boolean = true;

  organisatie!: any;
  organisatie$: Subscription = new Subscription();

  constructor(private organisatiesService: OrganisatieService, private toast: HotToastService, private dialog: DialogService) {
    // Reverse the order of which the toasts are displayed
    this.toast.defaultConfig = {
      ...this.toast.defaultConfig,
      reverseOrder: true
    }
   }

  ngOnInit(): void {
    this.getOrganisatieInfo();
  }

  ngOnDestroy(): void {
    this.organisatie$.unsubscribe();
  }

  editOrganisatieInfo(): void {
    this.organisatieFormComponent.openModal();

    // When the gebruiker is added successfully, refresh the list of gebruikers.
    this.organisatieFormComponent.output.subscribe(() => {
      this.getOrganisatieInfo();
    });
  }

  getOrganisatieInfo() {
    // TODO: if logged in user in admin get all users
    // TODO: if logged in user is organisatie beheerder get users of organisation
    this.organisatie$ = this.organisatiesService.getOrganisatieInfo().subscribe(
      result => {
        this.organisatie = result;
        this.loading = false;       
      },
      error => {        
        this.toast.error("Er ging iets mis.  De organisaties kunnen niet worden opgehaald.", { position: 'bottom-right', dismissible: true, autoClose: false });
      }
    );
  }

}
