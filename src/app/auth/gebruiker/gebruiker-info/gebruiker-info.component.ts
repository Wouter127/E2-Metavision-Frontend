import { Component, OnInit, ViewChild } from '@angular/core';
import { DialogService } from '@ngneat/dialog';
import { HotToastService } from '@ngneat/hot-toast';
import { Subscription } from 'rxjs';
import { GebruikerService } from 'src/app/services/gebruiker.service';
import { GebruikerFormComponent } from '../gebruiker-form/gebruiker-form.component';

@Component({
  selector: 'app-gebruiker-info',
  templateUrl: './gebruiker-info.component.html',
  styleUrls: ['./gebruiker-info.component.scss']
})
export class GebruikerInfoComponent implements OnInit {
  // @ViewChild(GebruikersFormOrganisatiebeheerderComponent, { static: true }) gebruikersFormOrganisatiebeheerderComponent!: GebruikersFormOrganisatiebeheerderComponent;
  @ViewChild(GebruikerFormComponent, { static: true }) gebruikerFormComponent!: GebruikerFormComponent;

  loading: boolean = true;

  gebruiker!: any;
  gebruiker$: Subscription = new Subscription();

  constructor(private gebruikerService: GebruikerService, private toast: HotToastService, private dialog: DialogService) {
    // Reverse the order of which the toasts are displayed
    this.toast.defaultConfig = {
      ...this.toast.defaultConfig,
      reverseOrder: true
    }
   }

  ngOnInit(): void {
    this.getGebruikerInfo();
  }

  ngOnDestroy(): void {
    this.gebruiker$.unsubscribe();
  }

  editGebruikerInfo(): void {
    this.gebruikerFormComponent.openModal();

    // When the gebruiker is added successfully, refresh the list of gebruikers.
    this.gebruikerFormComponent.output.subscribe(() => {
      this.getGebruikerInfo();
    });
  }

  getGebruikerInfo() {
    // TODO: if logged in user in admin get all users
    // TODO: if logged in user is organisatie beheerder get users of organisation
    this.gebruiker$ = this.gebruikerService.getGebruikerInfo().subscribe(
      result => {
        this.gebruiker = result;
        this.loading = false;
        console.log(result);
        
      },
      error => {  
        this.toast.error("Er ging iets mis.  Uw acoount info kan niet worden opgehaald.", { position: 'bottom-right', dismissible: true, autoClose: false });
      }
    );
  }
}
