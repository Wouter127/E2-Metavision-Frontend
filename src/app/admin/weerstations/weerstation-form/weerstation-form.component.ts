import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { DialogService } from '@ngneat/dialog';
import { HotToastService } from '@ngneat/hot-toast';
import { Subscription } from 'rxjs';
import { Organisatie } from 'src/app/interfaces/Organisatie';
import { Weerstation } from 'src/app/interfaces/Weerstation';
import { OrganisatieService } from 'src/app/services/organisatie.service';
import { WeerstationService } from 'src/app/services/weerstation.service';

@Component({
  selector: 'app-weerstation-form',
  templateUrl: './weerstation-form.component.html',
  styleUrls: ['./weerstation-form.component.scss']
})
export class WeerstationFormComponent implements OnInit {
  @Input() title!: string;
  @Output() output = new EventEmitter();

  weerstation: any = {};
  weerstation$: Subscription = new Subscription();

  organisaties: Organisatie[] = [];
  organisaties$: Subscription = new Subscription();

  loading: boolean = true;
  showModal: boolean = false;

  putWeerstation$: Subscription = new Subscription();

  constructor(private router: Router, private adminWeerstationService: WeerstationService, private adminOrganisatieService: OrganisatieService, private toast: HotToastService, private dialog: DialogService) {
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
    this.putWeerstation$.unsubscribe();
  }

  openModal(id: number) {
    this.loading = true;
    this.weerstation$ = this.adminWeerstationService.getWeerstationById(id).subscribe(
      result => {
        this.weerstation = result;

        this.loading = false;
      },
      error => {
        this.toast.error("Er ging iets mis.  De weerstation kan niet worden opgehaald.", { position: 'bottom-right', dismissible: true, autoClose: false });
      }
    );

    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }

  changeZichtbaarheid(weerstation: Weerstation) {
    if (weerstation.isPubliekZichtbaar) {
      weerstation.isPubliekZichtbaar = 0
    } else {
      weerstation.isPubliekZichtbaar = 1
    }
  }

  genereerCode() {
    this.putWeerstation$ = this.adminWeerstationService.genereerNieuweCode(this.weerstation.id).pipe(
      this.toast.observe({
        loading: { content: 'Genereren...', position: 'bottom-right' },
        success: { content: 'Nieuwe code gegenereerd!', position: 'bottom-right', dismissible: true },
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
        this.weerstation = result;

        this.output.next(); // Send event to parent component.
      }
    );
  }

  onSubmit() {
    this.putWeerstation$ = this.adminWeerstationService.putWeerstation(this.weerstation.id, this.weerstation).pipe(
      this.toast.observe({
        loading: { content: 'Aanpassen...', position: 'bottom-right' },
        success: { content: 'Weerstation aangepast!', position: 'bottom-right', dismissible: true },
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
