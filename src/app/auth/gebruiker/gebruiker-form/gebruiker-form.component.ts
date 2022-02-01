import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { HotToastService } from '@ngneat/hot-toast';
import { Subscription } from 'rxjs';
import { Gebruiker } from 'src/app/interfaces/Gebruiker';
import { GebruikerService } from 'src/app/services/gebruiker.service';

@Component({
  selector: 'app-gebruiker-form',
  templateUrl: './gebruiker-form.component.html',
  styleUrls: ['./gebruiker-form.component.scss']
})
export class GebruikerFormComponent implements OnInit {
  @Input() title!: string;
  @Output() output = new EventEmitter();

  gebruiker: Gebruiker = {
    id: 0,
    organisatieId: 0,
    voornaam: '',
    achternaam: '',
    email: '',
    gsm: '',
    krijgtMelding: 0,
    password: '',
    isOrganisatieBeheerder: 0,
    isAdmin: 0,
    vervolledig_token: ''
  };
  gebruiker$: Subscription = new Subscription();

  loading: boolean = true;
  showModal: boolean = false;

  putGebruiker$: Subscription = new Subscription();

  constructor(private gebruikerService: GebruikerService, private toast: HotToastService) {
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

  openModal() {
    this.gebruiker$ = this.gebruikerService.getGebruikerInfo().subscribe(
      result => {
        this.gebruiker = result;
        
        this.loading = false;
      },
      error => {
        
        this.toast.error("Er ging iets mis. Uw account kan niet worden opgehaald.", { position: 'bottom-right', dismissible: true, autoClose: false });
      }
    );

    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }

  onSubmit() {
    console.log("onsubmit", this.gebruiker);
    if(this.gebruiker.gsm == ""){
      
    }
    this.putGebruiker$ = this.gebruikerService.putGebruikerAlsAuth(this.gebruiker.id, this.gebruiker).pipe(
      this.toast.observe({
        loading: { content: 'Aanpassen...', position: 'bottom-right' },
        success: { content: 'Account aangepast!', position: 'bottom-right', dismissible: true },
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
        console.log('submit', result);
        
        this.output.next(); // Send event to parent component.
      }
    );
  }
}
