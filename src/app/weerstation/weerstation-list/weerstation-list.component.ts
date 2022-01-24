import { Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Organisatie } from 'src/app/interfaces/Organisatie';
import { OrganisatieService } from 'src/app/services/admin/organisatie.service';
import { Router } from '@angular/router';
import { Weerstation } from 'src/app/interfaces/Weerstation';
import { WeerstationService } from 'src/app/services/admin/weerstation.service';
import { Observable, Subscription } from 'rxjs';
import { FormControl, FormGroup } from '@angular/forms';
import { HotToastService } from '@ngneat/hot-toast';
import { ClipboardService } from 'ngx-clipboard';
import { DialogService } from '@ngneat/dialog';
import { WeerstationToevoegenComponent } from '../weerstation-toevoegen/weerstation-toevoegen.component';
import { WeerstationFormComponent } from '../weerstation-form/weerstation-form.component';

@Component({
  selector: 'app-weerstation-list',
  templateUrl: './weerstation-list.component.html',
  styleUrls: ['./weerstation-list.component.scss']
})
export class WeerstationListComponent implements OnInit, OnDestroy {
  @ViewChild(WeerstationToevoegenComponent, { static: true }) weerstationToevoegenComponent!: WeerstationToevoegenComponent;
  @ViewChild(WeerstationFormComponent, { static: true }) weerstationFormComponent!: WeerstationFormComponent;

  loading: boolean = true;

  organisaties: Organisatie[] = [];
  organisaties$: Subscription = new Subscription();
  weerstationsZonderOrganisatie: Weerstation[] = [];
  weerstationsZonderOrganisatie$: Subscription = new Subscription();
  deleteWeerstation$: Subscription = new Subscription();

  isAdmin = true;

  form = new FormGroup({
    naam: new FormControl('')
  });

  constructor(private weerstationService: WeerstationService, private organisatieService: OrganisatieService, private router: Router, private toast: HotToastService, private clipboardApi: ClipboardService, private dialog: DialogService) { 
    // Reverse the order of which the toasts are displayed
    this.toast.defaultConfig = {
      ...this.toast.defaultConfig,
      reverseOrder: true
    }
  }

  ngOnInit(): void {
    if (this.isAdmin) {
      this.getOrganisaties();
      this.getWeerstationsZonderOrganisatie();
    } else {
      this.getOrganisatieWithWeerstations();
    }
  }

  ngOnDestroy() {
    this.organisaties$.unsubscribe();
    this.weerstationsZonderOrganisatie$.unsubscribe();
    this.deleteWeerstation$.unsubscribe();
  }

  wijzigWeerstation(id: number): void {
    this.weerstationFormComponent.openModal(id);

    // When the weerstation is edited successfully, refresh the list of weerstations.
    this.weerstationFormComponent.output.subscribe(() => {
      this.ngOnInit();
    });
  }

  // PP
  toevoegenWeerstation(): void {
    this.weerstationToevoegenComponent.openModal();

    // When the weerstatopm is added successfully, refresh the list of weerstations.
    this.weerstationToevoegenComponent.output.subscribe(() => {
      this.ngOnInit();
    }); 
  }

  // PP
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

  
  getOrganisatieWithWeerstations() {
    var organisatieId = 1
    this.organisaties$ = this.organisatieService.getOrganisatieWithWeerstations(organisatieId).subscribe(result => {
      this.organisaties = result;
    });
  }

  // PP
  getOrganisaties() {
    this.organisaties$ = this.organisatieService.getOrganisaties().subscribe(
      result => {
          this.organisaties = result;
          this.loading = false;
      },
      error => {
        this.toast.error("Er ging iets mis.  De weerstations van een organisatie kunnen niet worden opgehaald.", { position: 'bottom-right', dismissible: true, autoClose: false });
      }
    );
  }

  // PP
  getWeerstationsZonderOrganisatie() {
    this.weerstationsZonderOrganisatie$ = this.weerstationService.getWeerstations("null").subscribe(
      result => {
        this.weerstationsZonderOrganisatie = result;
      },
      error => {
        this.toast.error("Er ging iets mis.  De weerstations zonder organisatie kunnen niet worden opgehaald.", { position: 'bottom-right', dismissible: true, autoClose: false });
      }
    )
  }

  edit(id: number) {
    //Navigate to form in edit mode
    this.router.navigate(['/weerstations/form'], {state: {id: id}});
  }

  // PP
  copyCode(code: string | undefined) {
    if (code) {
      this.clipboardApi.copyFromContent(code);
      this.toast.success("Code gekopiëerd", { position: 'bottom-right', dismissible: true });
    }
  }
}
