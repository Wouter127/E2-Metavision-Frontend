import { Component, OnInit, ViewChild } from '@angular/core';
import { HotToastService } from '@ngneat/hot-toast';
import { Subscription } from 'rxjs';
import { Gebruiker } from 'src/app/interfaces/Gebruiker';
import { Weerstation } from 'src/app/interfaces/Weerstation';
import { AuthStateService } from 'src/app/security/auth-state.service';
import { AuthService } from 'src/app/security/auth.service';
import { LocationService } from 'src/app/services/location.service';
import { OrganisatieService } from 'src/app/services/organisatie.service';
import { WeerstationService } from 'src/app/services/weerstation.service';
import { WeerstationsOrganisatieFormComponent } from '../weerstations-organisatie-form/weerstations-organisatie-form.component';
import { WeerstationsActiverenComponent } from '../weerstations-activeren/weerstations-activeren.component';

@Component({
  selector: 'app-weerstations-organisatie-list',
  templateUrl: './weerstations-organisatie-list.component.html',
  styleUrls: ['./weerstations-organisatie-list.component.scss']
})
export class WeerstationsOrganisatieListComponent implements OnInit {
  @ViewChild(WeerstationsActiverenComponent, { static: true }) weerstationsActiverenComponent!: WeerstationsActiverenComponent;
  @ViewChild(WeerstationsOrganisatieFormComponent, {static: true}) weerstationsOrganisatieFormComponent!: WeerstationsOrganisatieFormComponent;

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

  
  wijzigWeerstation(id: number): void {    
    this.weerstationsOrganisatieFormComponent.openModal(id);

    // When the gebruiker is edited successfully, refresh the list of gebruikers.
    this.weerstationsOrganisatieFormComponent.output.subscribe(() => {
      this.getOrganisatie();
    });
  }

  weerstationActiveren(): void {    
    this.weerstationsActiverenComponent.openModal();

    // When the weerstation is added successfully, refresh the list of weerstations.
    this.weerstationsActiverenComponent.output.subscribe(() => {
      this.ngOnInit();
    });
  }

  toggleRelais(weerstation_id: number): void {
    let weerstation: Weerstation|undefined = this.organisatie.weerstations.find((w:any) => w.id === weerstation_id);
    if (weerstation) {
      weerstation.isRelaisManueelAan = weerstation.isRelaisManueelAan ? 0 : 1;
      this.weerstationService.putWeerstationOrganisatieBeheerder(weerstation_id, weerstation).pipe(
        this.toast.observe({
          loading: { content: 'Schakelen...', position: 'bottom-right'},
          success: { content: 'Relais geschakeld! Het duurt maximaal 1 minuut voordat de configuratie is doorgevoerd.', position: 'bottom-right', dismissible: true},
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
        }
      );
    }
    else {
      // Error weerstation niet gevonden binnen de organisatie
    }
  }

  getOrganisatie() {
    this.authStateService.gebruikerAuthState.subscribe(
      isLoggedIn => {
        if (isLoggedIn) {
          this.authService.getGebruiker().subscribe(
            gebruiker => {
              this.gebruiker = gebruiker;
              this.organisatie$ = this.organisatieService.getOrganisatieWithWeerstations(gebruiker.organisatieId).subscribe(
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
        // this.toast.error("Er ging iets mis.  De locatie van het weerstation kon niet worden opgehaald.", { position: 'bottom-right', dismissible: true, autoClose: false });
      }
    );
  }

}
