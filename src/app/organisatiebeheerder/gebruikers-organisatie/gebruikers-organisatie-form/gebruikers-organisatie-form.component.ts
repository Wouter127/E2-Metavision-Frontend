import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { HotToastService } from '@ngneat/hot-toast';
import { Subscription } from 'rxjs';
import { Gebruiker } from 'src/app/interfaces/Gebruiker';
import { Organisatie } from 'src/app/interfaces/Organisatie';
import { OrganisatieService } from 'src/app/services/organisatie.service';
import { GebruikerService } from 'src/app/services/gebruiker.service';
@Component({
  selector: 'app-gebruikers-organisatie-form',
  templateUrl: './gebruikers-organisatie-form.component.html',
  styleUrls: ['./gebruikers-organisatie-form.component.scss']
})
export class GebruikersOrganisatieFormComponent implements OnInit {
  @Input() title!: string;
  @Output() output = new EventEmitter();

  gebruiker: Gebruiker = { id: 0, organisatieId: 0, voornaam: '', achternaam: '', email: '', password: '', isOrganisatieBeheerder: 0, isAdmin: 0, vervolledig_token: '', krijgtMelding: 0, gsm: '' };
  gebruiker$: Subscription = new Subscription();

  organisaties: Organisatie[] = [];
  organisaties$: Subscription = new Subscription();

  loading: boolean = true;
  showModal: boolean = false;

  putGebruiker$: Subscription = new Subscription();

  constructor(private gebruikerService: GebruikerService, private organisatieService: OrganisatieService, private toast: HotToastService) {
     // Reverse the order of which the toasts are displayed
     this.toast.defaultConfig = {
      ...this.toast.defaultConfig,
      reverseOrder: true
    }
   }

  ngOnInit(): void {
    console.log("test")
  }

  ngOnDestroy(): void {
    this.putGebruiker$.unsubscribe();
  }

  openModal(id: number) {
    console.log("test")
    this.loading = true;
    this.gebruiker$ = this.gebruikerService.getGebruikerByIdAlsOrganisatieBeheerder(id).subscribe(
      result => {
        this.gebruiker = result;

        this.loading = false;
      },
      error => {
        this.toast.error("Er ging iets mis.  De gebruiker kan niet worden opgehaald.", { position: 'bottom-right', dismissible: true, autoClose: false });
      }
    );

    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }

  onChange() {
    console.log(this.gebruiker.isAdmin);
  }

  onSubmit() {
    this.putGebruiker$ = this.gebruikerService.putGebruikerAlsOrganisatieBeheerder(this.gebruiker.id, this.gebruiker).pipe(
      this.toast.observe({
        loading: { content: 'Aanpassen...', position: 'bottom-right' },
        success: { content: 'Gebruiker aangepast!', position: 'bottom-right', dismissible: true },
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
        this.showModal = false;

        this.output.next(); // Send event to parent component.
      }
    );
  }


}
