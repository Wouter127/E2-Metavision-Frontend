import { Component, OnInit } from '@angular/core';
import { DialogService } from '@ngneat/dialog';
import { HotToastService } from '@ngneat/hot-toast';
import { Subscription } from 'rxjs';
import { OrganisatieService } from 'src/app/services/organisatie.service';
import { WeerstationService } from 'src/app/services/weerstation.service';

@Component({
  selector: 'app-ota-plannen',
  templateUrl: './ota-plannen.component.html',
  styleUrls: ['./ota-plannen.component.scss']
})
export class OtaPlannenComponent implements OnInit {

  loading: boolean = true;

  alleWeerstations: boolean = false;

  organisaties: any[] = [];
  organisaties$: Subscription = new Subscription();

  weerstationsZonderOrganisatieCheckbox: boolean = false;

  weerstationsZonderOrganisatie: any[] = [];
  weerstationsZonderOrganisatie$: Subscription = new Subscription();

  planOta$: Subscription = new Subscription();

  file: any;
  vandaag: Date = new Date();
  vanafDatum: string;
  vanafTijd: any;

  formData: FormData = new FormData();

  constructor(private weerstationService: WeerstationService, private organisatieService: OrganisatieService, private toast: HotToastService, private dialog: DialogService) {
    this.vanafDatum = this.vandaag.toISOString().split('T')[0];
    this.vanafTijd = this.vandaag.toLocaleTimeString().substring(0, 5);

    // Reverse the order of which the toasts are displayed
    this.toast.defaultConfig = {
      ...this.toast.defaultConfig,
      reverseOrder: true
    }
  }

  ngOnInit(): void {
    this.getWeerstationsWithOrganisatie();
    this.getWeerstationsWithoutOrganisatie();
  }

  ngOnDestroy(): void {
    this.organisaties$.unsubscribe();
    this.planOta$.unsubscribe();
  }

  onFileSelect(event: any): void {
    // create a reference to the storage bucket location
    this.file = event.target.files[0];
  }

  allWeerstations(event: any): void {
    let checked = event.target.checked;

    this.organisaties.map((o: any) => { o.isChecked = checked; o.weerstations.map((w: any) => { w.isChecked = checked; }) });
    this.weerstationsZonderOrganisatieCheckbox = checked;
    this.weerstationsZonderOrganisatie.map((w: any) => { w.isChecked = checked; });
  }

  weerstationsZonderOrganisatieListItem(event: any): void {
    let checked = event.target.checked;

    // Check / Uncheck all the weerstations of the selected organisation
    this.weerstationsZonderOrganisatie.map((w: any) => w.isChecked = checked);

    this.checkAlleWeerstations();
  }

  organisatieListItem(event: any): void {
    let id = event.target.value;
    let checked = event.target.checked;

    // Check / Uncheck all the weerstations of the selected organisation
    this.organisaties.find((o: any) => o.id == id).weerstations.map((w: any) => w.isChecked = checked);

    this.checkAlleWeerstations();
  }

  weerstationZonderListItem(event: any): void {
    let checked = event.target.checked;

    if (checked === true) {
      // Check 'Weerstations zonder organisatie' checkbox if all weerstations are checked
      let total = this.weerstationsZonderOrganisatie.length;
      let counter = 0;
      this.weerstationsZonderOrganisatie.map((w: any) => { if (w.isChecked === true) { counter++; } });

      if (total === counter) {
        this.weerstationsZonderOrganisatieCheckbox = checked;
      }
    }
    if (checked === false) {
      this.weerstationsZonderOrganisatieCheckbox = checked;
    }

    this.checkAlleWeerstations();
  }

  weerstationListItem(event: any): void {
    let id = event.target.value;
    let checked = event.target.checked;

    let organisatieId = this.organisaties.map((o: any) => o.weerstations.find((w: any) => w.id == id)).find((a: []) => a != undefined).organisatieId;

    if (checked === false) {
      // Uncheck organisatie checkbox
      this.organisaties.find((o: any) => o.id === organisatieId).isChecked = checked;
    }

    if (checked === true) {
      // Check organisatie checkbox if all weerstations are checked
      let totalWeerstations = this.organisaties.find((o: any) => o.id === organisatieId).weerstations.length;
      let counter1 = 0;

      this.organisaties.find((o: any) => o.id === organisatieId).weerstations.map((w: any) => { if (w.isChecked === true) { counter1++; } });

      if (totalWeerstations === counter1) {
        this.organisaties.find((o: any) => o.id === organisatieId).isChecked = checked;
      }

      this.checkAlleWeerstations();
    }
  }

  checkAlleWeerstations(): void {
    // Alle organisaties moeten checked zijn &  Weerstations zonder organisaties moeten checked zijn.
    let totalOrganisaties = this.organisaties.length;
    let counter1 = 0;
    this.organisaties.map((o: any) => { if (o.isChecked === true) { counter1++; } });
    let alleOrganisatiesChecked: boolean = totalOrganisaties === counter1;

    if (alleOrganisatiesChecked && this.weerstationsZonderOrganisatieCheckbox) {
      this.alleWeerstations = true;
    }
    else {
      this.alleWeerstations = false;
    }
  }

  onSubmit(): void {
    this.dialog
      .confirm({
        title: 'OTA update plannen?',
        body: 'Gelieven er rekening mee te houden van zodra de update datum is bereikt alle weerstations deze update zullen uitvoeren. Controleer ook zeker dat proDebug op false staat, de connectie met de API correct is en of het ophalen van een OTA update werkt in deze update.'
      })
      .afterClosed$.subscribe(confirmed => {
        if (confirmed) {
          const otaVanaf = this.vanafDatum + ' ' + this.vanafTijd + ':00';

          // Maak lijst van weerstationIds die aangevikt staan
          let weerstationIds: number[] = [];
          this.organisaties.map((o: any) => o.weerstations.map((w: any) => { if (w.isChecked === true) { weerstationIds.push(w.id) } }));
          this.weerstationsZonderOrganisatie.map((w: any) => { if (w.isChecked === true) { weerstationIds.push(w.id) } });

          this.planOta$ = this.weerstationService.planOta(1, this.file, otaVanaf, weerstationIds).pipe(
            this.toast.observe({
              loading: { content: 'OTA update aan het plannen...', position: 'bottom-right' },
              success: { content: 'OTA update gepland!', position: 'bottom-right', dismissible: true },
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
            },
            error => {
            }
          );
        }
      });
  }

  getWeerstationsWithOrganisatie(): void {
    this.organisaties$ = this.organisatieService.getOrganisaties().subscribe(
      result => {
        let organisatieWeerstationsMetExtraProp: any[] = result;
        organisatieWeerstationsMetExtraProp = organisatieWeerstationsMetExtraProp.map((o: any) => ({ ...o, isChecked: false }));
        organisatieWeerstationsMetExtraProp = organisatieWeerstationsMetExtraProp.map(o => ({ ...o, weerstations: o.weerstations.map((w: any) => ({ ...w, isChecked: false })) }));

        this.organisaties = organisatieWeerstationsMetExtraProp;
        this.loading = false;
      },
      error => {
        this.toast.error("Er ging iets mis.  De weerstations kunnen niet worden opgehaald.", { position: 'bottom-right', dismissible: true, autoClose: false });
        this.loading = false;
      }
    );
  }

  getWeerstationsWithoutOrganisatie(): void {
    this.weerstationsZonderOrganisatie$ = this.weerstationService.getWeerstations("null").subscribe(
      result => {
        // Add a property 'isChecked'
        let weerstationsMetExtraProp: any[] = result;
        weerstationsMetExtraProp = weerstationsMetExtraProp.map(w => ({ ...w, isChecked: false }));

        this.weerstationsZonderOrganisatie = weerstationsMetExtraProp;
        this.loading = false;
      },
      error => {
        this.toast.error("Er ging iets mis.  De weerstations zonder organisatie kunnen niet worden opgehaald.", { position: 'bottom-right', dismissible: true, autoClose: false });
        this.loading = false;
      }
    );
  }
}
