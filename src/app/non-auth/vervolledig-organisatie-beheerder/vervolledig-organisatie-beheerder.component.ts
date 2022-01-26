import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { Organisatie } from '../../interfaces/Organisatie';
import { Gebruiker } from '../../interfaces/Gebruiker';
import { GebruikerService } from 'src/app/services/gebruiker.service';

@Component({
  selector: 'app-vervolledig-organisatie-beheerder',
  templateUrl: './vervolledig-organisatie-beheerder.component.html',
  styleUrls: ['./vervolledig-organisatie-beheerder.component.scss']
})
export class VervolledigOrganisatieBeheerderComponent implements OnInit {
  loading = true;

  routeParams$: Subscription = new Subscription();

  gebruiker!: Gebruiker;
  gebruiker$: Subscription = new Subscription();

  wachtwoordConfirmation: string = '';

  organisatie!: Organisatie;

  putOrganisatieBeheerder$: Subscription = new Subscription();

  constructor(private route: ActivatedRoute, private gebruikerService: GebruikerService, private toast: HotToastService, private router: Router) {
    // Reverse the order of which the toasts are displayed
    this.toast.defaultConfig = {
      ...this.toast.defaultConfig,
      reverseOrder: true
    }
  }

  ngOnInit(): void {
    // Check if the given user's token matches the given token.
    this.routeParams$ = this.route.queryParams.subscribe(params => {
      this.gebruiker$ = this.gebruikerService.checkToken(params.user_id, params.vervolledig_token).subscribe(
        result => {
          this.loading = false;
          this.gebruiker = result;
 
          if (result.organisatie) {
            if (result.organisatie.naam.substring(0, 18) === "Nieuwe organisatie") {
              result.organisatie.naam = '';
            }
            this.organisatie = result.organisatie;
          }
        },
        error => {
          if (error.status === 403) {
            this.router.navigate(['/']); 
          }
          else {
            this.toast.error("Er ging iets mis.", { position: 'bottom-right', dismissible: true, autoClose: false });
          }
        }
      );
    });
  }

  ngOnDestroy(): void {
    this.routeParams$.unsubscribe();
    this.gebruiker$.unsubscribe();
    this.putOrganisatieBeheerder$.unsubscribe();
  }

  onSubmit(): void {
    this.routeParams$ = this.route.queryParams.subscribe(params => {
      this.putOrganisatieBeheerder$ = this.gebruikerService.vervolledigOrganisatieBeheerder(params.user_id, params.vervolledig_token, this.gebruiker, this.organisatie, this.wachtwoordConfirmation).pipe(
        this.toast.observe({
          loading: { content: 'Activeren...', position: 'bottom-right' },
          success: { content: 'Je account is vervolledigd!', position: 'bottom-right', dismissible: true },
          error: {
            content: (e) => {
              let msg = '<ul>';
              msg += `<li><b>Er ging iets mis!</b></li>`;
              for (let key in e.error.errors) {
                let error = e.error.errors[key];   
                
                if (error.length > 1) {
                  for (let i in error) {
                    error[i] = error[i].toString().replace('gebruiker.', '');
                    error[i] = error[i].toString().replace('organisatie.', '');
                    
                    msg += `<li>${error[i]}</li>`;
                  }
                }
                else {
                  error = error.toString().replace('gebruiker.', '');
                  error = error.toString().replace('organisatie.', '');

                  msg += `<li>${error}</li>`;
                }
              }
              msg += '</ul>';
              
              return msg;
            }, position: 'bottom-right', dismissible: true, duration: 5000
          },
        })
      ).subscribe(
        result => {
          this.router.navigate(['/login']);
        },
        error => {
          if (error.status === 403) {
            this.router.navigate(['/']);
          }
        }
      )
    });
  }
}
