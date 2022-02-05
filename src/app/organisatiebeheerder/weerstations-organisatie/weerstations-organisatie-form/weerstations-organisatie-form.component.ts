import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { DialogService } from '@ngneat/dialog';
import { HotToastService } from '@ngneat/hot-toast';
import { Subscription } from 'rxjs';
import { Weerstation } from 'src/app/interfaces/Weerstation';
import { WeerstationService } from 'src/app/services/weerstation.service';

@Component({
  selector: 'app-weerstations-organisatie-form',
  templateUrl: './weerstations-organisatie-form.component.html',
  styleUrls: ['./weerstations-organisatie-form.component.scss']
})
export class WeerstationsOrganisatieFormComponent implements OnInit {

  @Input() title!: string;
  @Output() output = new EventEmitter();

  weerstation: any = {};
  weerstation$: Subscription = new Subscription();

  loading: boolean = true;
  showModal: boolean = false;

  putWeerstation$: Subscription = new Subscription();

  constructor(private router: Router, private weerstationService: WeerstationService, private toast: HotToastService, private dialog: DialogService) {
    // Reverse the order of which the toasts are displayed
    this.toast.defaultConfig = {
      ...this.toast.defaultConfig,
      reverseOrder: true
    }
   }

  ngOnInit(): void {    
    
  }

  ngOnDestroy(): void {
    this.putWeerstation$.unsubscribe();
  }

  openModal(id: number) {
    this.loading = true;
    this.weerstation$ = this.weerstationService.getWeerstationByIdAsOrganisatiebeheerder(id).subscribe(
      result => {
        this.weerstation = result;

        this.loading = false;
      },
      error => {
        this.toast.error("Er ging iets mis.  Het weerstation kan niet worden opgehaald.", { position: 'bottom-right', dismissible: true, autoClose: false });
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

  onSubmit() {
    this.putWeerstation$ = this.weerstationService.putWeerstationOrganisatieBeheerder(this.weerstation.id, this.weerstation).pipe(
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
