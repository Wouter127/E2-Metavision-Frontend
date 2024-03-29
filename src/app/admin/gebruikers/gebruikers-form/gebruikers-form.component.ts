import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { HotToastService } from '@ngneat/hot-toast';
import { Subscription } from 'rxjs';
import { Gebruiker } from 'src/app/interfaces/Gebruiker';
import { Organisatie } from 'src/app/interfaces/Organisatie';
import { OrganisatieService } from 'src/app/services/organisatie.service';
import { GebruikerService } from 'src/app/services/gebruiker.service';

@Component({
  selector: 'app-gebruikers-form',
  templateUrl: './gebruikers-form.component.html',
  styleUrls: ['./gebruikers-form.component.scss']
})
export class GebruikersFormComponent implements OnInit {
  @Input() title!: string;
  @Output() output = new EventEmitter();

  gebruiker: any = {};
  gebruiker$: Subscription = new Subscription();

  organisaties: Organisatie[] = [];
  organisaties$: Subscription = new Subscription();

  loading: boolean = true;
  showModal: boolean = false;

  putGebruiker$: Subscription = new Subscription();

  constructor(private adminGebruikerService: GebruikerService, private adminOrganisatieService: OrganisatieService, private toast: HotToastService) {
    // Reverse the order of which the toasts are displayed
    this.toast.defaultConfig = {
      ...this.toast.defaultConfig,
      reverseOrder: true
    }
   }

  ngOnInit(): void {
    this.organisaties$ = this.adminOrganisatieService.getOrganisaties().subscribe(
      result => {
        this.organisaties = result;
      },
      error => {
        this.toast.error("Er ging iets mis.  De lijst van organisaties kan niet worden opgehaald.", { position: 'bottom-right', dismissible: true, autoClose: false })
      }
    );
  }

  ngOnDestroy(): void {
    this.gebruiker$.unsubscribe();
    this.organisaties$.unsubscribe();
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
        this.toast.error("Er ging iets mis.  De gebruiker kan niet worden opgehaald.", { position: 'bottom-right', dismissible: true, autoClose: false });
      }
    );

    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }

  onChange() {
  }

  onSubmit() {
    this.putGebruiker$ = this.adminGebruikerService.putGebruiker(this.gebruiker.id, this.gebruiker).pipe(
      this.toast.observe({
        loading: { content: 'Wijzigen...', position: 'bottom-right' },
        success: { content: 'Gebruiker gewijzigd!', position: 'bottom-right', dismissible: true },
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
