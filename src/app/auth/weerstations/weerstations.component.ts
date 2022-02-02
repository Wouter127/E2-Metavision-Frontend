import { Component, OnInit } from '@angular/core';
import { HotToastService } from '@ngneat/hot-toast';
import { Subscription } from 'rxjs';
import { Gebruiker } from 'src/app/interfaces/Gebruiker';
import { Weerstation } from 'src/app/interfaces/Weerstation';
import { AuthStateService } from 'src/app/security/auth-state.service';
import { AuthService } from 'src/app/security/auth.service';
import { LocationService } from 'src/app/services/location.service';
import { OrganisatieService } from 'src/app/services/organisatie.service';
import { WeerstationService } from 'src/app/services/weerstation.service';

@Component({
  selector: 'app-weerstations',
  templateUrl: './weerstations.component.html',
  styleUrls: ['./weerstations.component.scss']
})
export class WeerstationsComponent implements OnInit {
  loading: boolean = true;

  gebruiker!: Gebruiker | undefined;
  organisatie!: any;
  organisatie$: Subscription = new Subscription();

  getLaatsteMeting$: Subscription = new Subscription();
  getReverseGeocoding$: Subscription = new Subscription();

  constructor(private authService: AuthService, private authStateService: AuthStateService, private organisatieService: OrganisatieService, private weerstationService: WeerstationService, private locationService: LocationService, private toast: HotToastService) {
    // Reverse the order of which the toasts are displayed
    this.toast.defaultConfig = {
      ...this.toast.defaultConfig,
      reverseOrder: true
    }
   }

  ngOnInit(): void {
    this.getOrganisatie();
  }

  getOrganisatie() {
    this.authStateService.gebruikerAuthState.subscribe(
      isLoggedIn => {
        if (isLoggedIn) {
          this.authService.getGebruiker().subscribe(
            gebruiker => {
              this.gebruiker = gebruiker;
              this.organisatie$ = this.organisatieService.getOrganisatieWithWeerstationsAsAuth(gebruiker.organisatieId).subscribe(
                result => {
                  let organisatieLaatsteMeting: any = result;
                  organisatieLaatsteMeting.weerstations.map((w: any) => w.laatsteMeting = 'loading');

                  this.organisatie = organisatieLaatsteMeting;
                  this.loading = false;

                  organisatieLaatsteMeting.weerstations.forEach((weerstation: any) => {
                    this.getLaatsteMeting$ = this.weerstationService.getLaatsteMeting(weerstation.id).subscribe(
                      result => {
                        if (result) {
                          organisatieLaatsteMeting.weerstations.find((w: any) => w.id === weerstation.id).laatsteMeting = { ...result, location: '' };
                          this.addLocation(weerstation.id, result.gla, result.glo);
                          this.organisatie = organisatieLaatsteMeting;
                        }
                        else {
                          organisatieLaatsteMeting.weerstations.find((w: any) => w.id === weerstation.id).laatsteMeting = null;
                          this.organisatie = organisatieLaatsteMeting;
                        }
                      }
                    )
                  });
                },
                error => {
                  this.toast.error("Er ging iets mis. De weerstations kunnen niet worden opgehaald.", { position: 'bottom-right', dismissible: true, autoClose: false });
                }
              )
            },
            error => {
              this.authService.logout();
            }
          );
        }
        else {
          this.gebruiker = undefined;
        }
      }
    );
  }

  addLocation(id: number, latitude: string, longitude: string): void {
    this.getReverseGeocoding$ = this.locationService.reverseGeocoding(latitude, longitude).subscribe(
      result => {
        this.organisatie.weerstations.find((w: any) => w.id === id).laatsteMeting.location = result.address.country + (result.address.town ? ", " + result.address.town : '');
      },
      error => {
        console.log(error);

        // TODO: eventueel error weg laten?
        this.toast.error("Er ging iets mis.  De locatie van het weerstation kon niet worden opgehaald.", { position: 'bottom-right', dismissible: true, autoClose: false });
      }
    );
  }
}
