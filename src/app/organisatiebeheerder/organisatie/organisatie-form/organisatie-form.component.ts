import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { HotToastService } from '@ngneat/hot-toast';
import { Subscription } from 'rxjs';
import { OrganisatieService } from 'src/app/services/organisatie.service';

@Component({
  selector: 'app-organisatie-form',
  templateUrl: './organisatie-form.component.html',
  styleUrls: ['./organisatie-form.component.scss']
})
export class OrganisatieFormComponent implements OnInit {
  @Input() title!: string;
  @Output() output = new EventEmitter();

  organisatie: any;
  organisatie$: Subscription = new Subscription();

  loading: boolean = true;
  showModal: boolean = false;

  putOrganisatie$: Subscription = new Subscription();

  constructor(private organisatieService: OrganisatieService, private toast: HotToastService) {
    // Reverse the order of which the toasts are displayed
    this.toast.defaultConfig = {
      ...this.toast.defaultConfig,
      reverseOrder: true
    }
   }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.putOrganisatie$.unsubscribe();
  }

  openModal() {
    this.loading = true;
    this.organisatie$ = this.organisatieService.getOrganisatieInfo().subscribe(
      result => {
        this.organisatie = result;
        console.log(result);
        
        this.loading = false;
      },
      error => {
        this.toast.error("Er ging iets mis. De organisatie kan niet worden opgehaald.", { position: 'bottom-right', dismissible: true, autoClose: false });
      }
    );

    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }

  onSubmit() {
    this.putOrganisatie$ = this.organisatieService.putOrganisatieAsOrganisatiebeheerder(this.organisatie.id, this.organisatie).pipe(
      this.toast.observe({
        loading: { content: 'Aanpassen...', position: 'bottom-right' },
        success: { content: 'Organisatie aangepast!', position: 'bottom-right', dismissible: true },
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
