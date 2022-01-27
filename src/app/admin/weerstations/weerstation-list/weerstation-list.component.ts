import { Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Organisatie } from 'src/app/interfaces/Organisatie';
import { OrganisatieService } from 'src/app/services/organisatie.service';
import { Router } from '@angular/router';
import { Weerstation } from 'src/app/interfaces/Weerstation';
import { WeerstationService } from 'src/app/services/weerstation.service';
import { Observable, Subscription } from 'rxjs';
import { FormControl, FormGroup } from '@angular/forms';
import { HotToastService } from '@ngneat/hot-toast';
import { ClipboardService } from 'ngx-clipboard';
import { DialogService } from '@ngneat/dialog';
import { WeerstationFormComponent } from '../weerstation-form/weerstation-form.component';
import { LocationService } from 'src/app/services/location.service';
import { WeerstationToevoegenComponent } from 'src/app/admin/weerstations/weerstation-toevoegen/weerstation-toevoegen.component';

@Component({
  selector: 'app-weerstation-list',
  templateUrl: './weerstation-list.component.html',
  styleUrls: ['./weerstation-list.component.scss']
})
export class WeerstationListComponent implements OnInit, OnDestroy {
  @ViewChild(WeerstationToevoegenComponent, { static: true }) weerstationToevoegenComponent!: WeerstationToevoegenComponent;
  @ViewChild(WeerstationFormComponent, { static: true }) weerstationFormComponent!: WeerstationFormComponent;

  loading: boolean = true;

  organisaties: any[] = [];
  organisaties$: Subscription = new Subscription();
  weerstationsZonderOrganisatie: any[] = [];
  weerstationsZonderOrganisatie$: Subscription = new Subscription();
  deleteWeerstation$: Subscription = new Subscription();
  getLaatsteMeting$: Subscription = new Subscription();
  getReverseGeocoding$: Subscription = new Subscription();

  form = new FormGroup({
    naam: new FormControl('')
  });

  constructor(private weerstationService: WeerstationService, private organisatieService: OrganisatieService, private authWeerstationService: WeerstationService, private locationService: LocationService, private router: Router, private toast: HotToastService, private clipboardApi: ClipboardService, private dialog: DialogService) { 
    // Reverse the order of which the toasts are displayed
    this.toast.defaultConfig = {
      ...this.toast.defaultConfig,
      reverseOrder: true
    }
  }

  ngOnInit(): void {
    this.getOrganisaties();
    this.getWeerstationsZonderOrganisatie();
  }

  ngOnDestroy() {
    this.organisaties$.unsubscribe();
    this.weerstationsZonderOrganisatie$.unsubscribe();
    this.deleteWeerstation$.unsubscribe();
    this.getLaatsteMeting$.unsubscribe();
    this.getReverseGeocoding$.unsubscribe();
  }

  showDetails(id: number): void {
    // Get details and append them to the weerstation
    this.weerstationsZonderOrganisatie.find(w => w.id === id).laatsteMeting = 'loading';
    this.getLaatsteMeting$= this.authWeerstationService.getLaatsteMeting(id).subscribe(
      result => {
        if (result) {
          this.weerstationsZonderOrganisatie.find(w => w.id === id).laatsteMeting = { ...result, location: '' };
          this.addLocation(id, result.gla, result.glo);
        }
        else {
          this.weerstationsZonderOrganisatie.find(w => w.id === id).laatsteMeting = null;
        }
      },
      error => {
        this.toast.error("Er ging iets mis.  De details van het weerstation konden niet worden opgehaald.", { position: 'bottom-right', dismissible: true, autoClose: false });
      }
    );

    this.weerstationsZonderOrganisatie.find(w => w.id === id).showDetails = true;
  }

  showDetailsOrganisatie(id: number): void {
    this.organisaties.map(o => o.weerstations.find((w: any) => w.id === id)).find((a: []) => a != undefined).laatsteMeting = 'loading';
    
    this.getLaatsteMeting$ = this.authWeerstationService.getLaatsteMeting(id).subscribe(
      result => {
        if (result) {
          this.organisaties.map(o => o.weerstations.find((w: any) => w.id === id)).find((a: []) => a != undefined).laatsteMeting = {...result, location: '' };
          this.addLocationOrganisatie(id, result.gla, result.glo);
        }
        else {
          this.organisaties.map(o => o.weerstations.find((w: any) => w.id === id)).find((a: []) => a != undefined).laatsteMeting = null;
        }
      },
      error => {
        this.toast.error("Er ging iets mis.  De details van het weerstation konden niet worden opgehaald.", { position: 'bottom-right', dismissible: true, autoClose: false });
      }
    );

    this.organisaties.map(o => o.weerstations.find((w: any) => w.id === id)).find((a: []) => a != undefined).showDetails = true;
  }

  addLocation(id: number, latitude: string, longitude: string): void {
    this.getReverseGeocoding$ = this.locationService.reverseGeocoding(latitude, longitude).subscribe(
      result => {
        this.weerstationsZonderOrganisatie.find(w => w.id === id).laatsteMeting.location = result.address.country + (result.address.town ? ", " + result.address.town : '' );
      },
      error => {
        console.log(error);
        
        this.toast.error("Er ging iets mis.  De locatie van het weerstation kon niet worden opgehaald.", { position: 'bottom-right', dismissible: true, autoClose: false });
      }
    );
  }

  addLocationOrganisatie(id: number, latitude: string, longitude: string): void {
    this.getReverseGeocoding$ = this.locationService.reverseGeocoding(latitude, longitude).subscribe(
      result => {
        this.organisaties.map(o => o.weerstations.find((w: any) => w.id === id))[0].laatsteMeting.location = result.address.country + (result.address.town ? ", " + result.address.town : '');
      },
      error => {
        this.toast.error("Er ging iets mis.  De locatie van het weerstation kon niet worden opgehaald.", { position: 'bottom-right', dismissible: true, autoClose: false });
      }
    );
  }

  hideDetails(id: number): void {
    this.weerstationsZonderOrganisatie.find(w => w.id === id).showDetails = false;
  }

  hideDetailsOrganisatie(id: number): void {
    this.organisaties.map(o => o.weerstations.find((w: any) => w.id === id))[0].showDetails = false;
  }

  copyCode(code: string | undefined) {
    if (code) {
      this.clipboardApi.copyFromContent(code);
      this.toast.success("Code gekopiëerd", { position: 'bottom-right', dismissible: true });
    }
  }

  wijzigWeerstation(id: number): void {
    this.weerstationFormComponent.openModal(id);

    // When the weerstation is edited successfully, refresh the list of weerstations.
    this.weerstationFormComponent.output.subscribe(() => {
      this.ngOnInit();
    });
  }

  toevoegenWeerstation(): void {
    this.weerstationToevoegenComponent.openModal();

    // When the weerstatopm is added successfully, refresh the list of weerstations.
    this.weerstationToevoegenComponent.output.subscribe(() => {
      this.ngOnInit();
    }); 
  }

  verwijderWeerstation(id: number): void {
    this.dialog
      .confirm({
        title: 'Weerstation verwijderen?',
        body: 'Deze actie kan niet ongedaan gemaakt worden. Alle metingen en schakel- en alarmwaarden worden ook verwijderd!'
      })
      .afterClosed$.subscribe(confirmed => {
        if (confirmed) {
          this.deleteWeerstation$ = this.weerstationService.deleteWeerstation(id).pipe(
            this.toast.observe({
              loading: { content: 'Verwijderen...', position: 'bottom-right' },
              success: { content: 'Weerstation verwijderd!', position: 'bottom-right', dismissible: true },
              error: { content: 'Er ging iets mis.', position: 'bottom-right', dismissible: true },
            })
          ).subscribe(
            result => {
              this.ngOnInit();
            }
          );
        }
      });
  }

  getOrganisaties() {
    this.organisaties$ = this.organisatieService.getOrganisaties().subscribe(
      result => {
        // Add a property 'showDetails' which determines wether or not to show the details.
        let organisatieWeerstationsMetExtraProp: any[] = result;
        organisatieWeerstationsMetExtraProp = organisatieWeerstationsMetExtraProp.map(o => ({ ...o, weerstations: o.weerstations.map((w: any) => ({...w, showDetails: false}))}));

        this.organisaties = organisatieWeerstationsMetExtraProp;
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
        // Add a property 'showDetails' which determines wether or not to show the details.
        let weerstationsMetExtraProp: any[] = result;
        weerstationsMetExtraProp = weerstationsMetExtraProp.map(w => ({...w, showDetails: false}));

        this.weerstationsZonderOrganisatie = weerstationsMetExtraProp;
      },
      error => {
        this.toast.error("Er ging iets mis.  De weerstations zonder organisatie kunnen niet worden opgehaald.", { position: 'bottom-right', dismissible: true, autoClose: false });
      }
    )
  }
}
