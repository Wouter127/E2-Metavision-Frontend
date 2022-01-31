import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { HotToastService } from '@ngneat/hot-toast';
import { Subscription } from 'rxjs';
import { GebruikerService } from 'src/app/services/gebruiker.service';
@Component({
  selector: 'app-gebruikers-organisatie-toevoegen',
  templateUrl: './gebruikers-organisatie-toevoegen.component.html',
  styleUrls: ['./gebruikers-organisatie-toevoegen.component.scss']
})
export class GebruikersOrganisatieToevoegenComponent implements OnInit {
  @Input() title!: string;
  @Output() output = new EventEmitter();

  showModal: boolean = false;

  email: string = '';

  postOrganisatieGebruiker$: Subscription = new Subscription();

  constructor(private gebruikerService: GebruikerService, private toast: HotToastService) {
    // Reverse the order of which the toasts are displayed
    this.toast.defaultConfig = {
      ...this.toast.defaultConfig,
      reverseOrder: true
    }
  }

  ngOnInit(): void {
  }

  openModal() {
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }

  onSubmit() {
    this.postOrganisatieGebruiker$ = this.gebruikerService.postOrganisatieGebruiker(this.email).pipe(
      this.toast.observe({
        loading: { content: 'Toevoegen...', position: 'bottom-right' },
        success: { content: 'Gebruiker toegevoegd!', position: 'bottom-right', dismissible: true },
        error: { content: (e) => { 
          let msg = '<ul>';
          msg += `<li><b>Er ging iets mis!</b></li>`;
          for (let key in e.error.errors) {
            msg += `<li>${e.error.errors[key]}</li>`;
          }
          msg += '</ul>';
          
          return msg;
        }, position: 'bottom-right', dismissible: true, duration: 5000 },
      })
    ).subscribe(
      result => {
        this.email = '';
        this.closeModal();

        this.output.next(); // Send event to parent component.
      }
    );
  }

}
