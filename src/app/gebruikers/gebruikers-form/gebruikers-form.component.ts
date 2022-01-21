import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { HotToastService } from '@ngneat/hot-toast';
import { Subscription } from 'rxjs';
import { Gebruiker } from 'src/app/interfaces/Gebruiker';
import { GebruikerService } from 'src/app/services/admin/gebruiker.service';

@Component({
  selector: 'app-gebruikers-form',
  templateUrl: './gebruikers-form.component.html',
  styleUrls: ['./gebruikers-form.component.scss']
})
export class GebruikersFormComponent implements OnInit {
  @Input() title!: string;
  @Output() output = new EventEmitter();

  gebruiker: Gebruiker = { id: 0, organisatieId: 0, voornaam:'', achternaam: '', email: '', wachtwoord: '', isOrganisatieBeheerder: 0, isAdmin: 0 };
  gebruiker$: Subscription = new Subscription();

  loading: boolean = true;
  showModal: boolean = false;

  putGebruiker$: Subscription = new Subscription();

  constructor(private adminGebruikerService: GebruikerService, private toast: HotToastService) {
    // Reverse the order of which the toasts are displayed
    this.toast.defaultConfig = {
      ...this.toast.defaultConfig,
      reverseOrder: true
    }
   }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.putGebruiker$.unsubscribe();
  }

  openModal(id: number) {
    this.loading = true;
    this.gebruiker$ = this.adminGebruikerService.getGebruikerById(id).subscribe(
      result => {
        this.gebruiker = result;

        this.loading = false;
      },
      error => {
        this.toast.error("Er ging iets mis.  De gebruiker kan niet worden opgehaald.", { position: 'bottom-right', dismissible: true, autoClose: false })
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
    console.log(this.gebruiker);
    
    this.putGebruiker$ = this.adminGebruikerService.putGebruiker(this.gebruiker.id, this.gebruiker).pipe(
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
