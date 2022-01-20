import { Component, OnInit, Input } from '@angular/core';
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

  gebruiker: Gebruiker = { id: 0, organisatieId: 0, voornaam:'', achternaam: '', email: '', wachtwoord: '', isOrganisatieBeheerder: false, isAdmin: false };
  gebruiker$: Subscription = new Subscription();

  loading: boolean = true;
  showModal: boolean = false;

  putGebruiker$: Subscription = new Subscription();

  constructor(private adminGebruikerService: GebruikerService) { }

  myFunction() {
    console.log(this.gebruiker);
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
        console.log('ERROR: ', error);
      }
    );

    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }

  onSubmit() {
    this.putGebruiker$ = this.adminGebruikerService.putGebruiker(this.gebruiker.id, this.gebruiker).subscribe(
      result => {
        console.log(result);
      },
      error => {
        console.log("ERROR:", error);
      }
    );
  }
}
