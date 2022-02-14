import { Component, OnInit } from '@angular/core';
import { HotToastService } from '@ngneat/hot-toast';
import { Subscription } from 'rxjs';
import { OrganisatieService } from 'src/app/services/organisatie.service';
import { WeerstationService } from 'src/app/services/weerstation.service';

@Component({
  selector: 'app-ota-list',
  templateUrl: './ota-list.component.html',
  styleUrls: ['./ota-list.component.scss']
})
export class OtaListComponent implements OnInit {

  loading: boolean = true;

  organisatiesMetWeerstations: any[] = [];
  organisatiesMetWeerstations$: Subscription = new Subscription();
  weerstationsZonderOrganisatie: any[] = [];
  weerstationsZonderOrganisatie$: Subscription = new Subscription();

  annuleerOta$: Subscription = new Subscription();

  constructor(private organisatieService: OrganisatieService, private weerstationService: WeerstationService, private toast: HotToastService) {
    // Reverse the order of which the toasts are displayed
    this.toast.defaultConfig = {
      ...this.toast.defaultConfig,
      reverseOrder: true
    }
  }

  ngOnInit(): void {
    this.getOrganisatiesMetWeerstations();
    this.getWeerstationsZonderOrganisatie();
  }

  ngOnDestroy(): void {
    this.organisatiesMetWeerstations$.unsubscribe();
    this.weerstationsZonderOrganisatie$.unsubscribe();
    this.annuleerOta$.unsubscribe();
  }

  getOrganisatiesMetWeerstations() {
    this.organisatiesMetWeerstations$ = this.organisatieService.getOrganisaties().subscribe(
      result => {
        this.organisatiesMetWeerstations = result;
        this.loading = false;
      },
      error => {
        this.toast.error("Er ging iets mis.  De weerstations van een organisatie kunnen niet worden opgehaald.", { position: 'bottom-right', dismissible: true, autoClose: false });
      }
    );
  }

  getWeerstationsZonderOrganisatie() {
    this.weerstationsZonderOrganisatie$ = this.weerstationService.getWeerstations("null").subscribe(
      result => {
        this.weerstationsZonderOrganisatie = result;
      },
      error => {
        this.toast.error("Er ging iets mis.  De weerstations zonder organisatie kunnen niet worden opgehaald.", { position: 'bottom-right', dismissible: true, autoClose: false });
      }
    );
  }

  annuleerUpdate(id: number): void {
    this.annuleerOta$ = this.weerstationService.annuleerOta(id).pipe(
      this.toast.observe({
        loading: { content: 'Annuleren...', position: 'bottom-right' },
        success: { content: 'OTA update geannuleerd!', position: 'bottom-right', dismissible: true },
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
        this.ngOnInit();
      }
    );
  }
}
