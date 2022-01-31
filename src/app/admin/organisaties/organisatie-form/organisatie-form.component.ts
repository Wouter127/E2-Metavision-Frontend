import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { HotToastService } from '@ngneat/hot-toast';
import { Subscription } from 'rxjs';
import { Organisatie } from 'src/app/interfaces/Organisatie';
import { OrganisatieService } from 'src/app/services/organisatie.service';

@Component({
  selector: 'app-organisatie-form',
  templateUrl: './organisatie-form.component.html',
  styleUrls: ['./organisatie-form.component.scss']
})
export class OrganisatieFormComponent implements OnInit {
  @Input() title!: string;
  @Output() output = new EventEmitter();

  organisatie: any = {};
  organisatie$: Subscription = new Subscription();

  organisaties: Organisatie[] = [];
  organisaties$: Subscription = new Subscription();

  loading: boolean = true;
  showModal: boolean = false;

  putOrganisatie$: Subscription = new Subscription();

  isAdd: boolean = false;
  isEdit: boolean = false;

  constructor(private organisatieService: OrganisatieService, private toast: HotToastService) {
    // Reverse the order of which the toasts are displayed
    this.toast.defaultConfig = {
      ...this.toast.defaultConfig,
      reverseOrder: true
    }
   }

  ngOnInit(): void { }

  ngOnDestroy(): void {
    this.putOrganisatie$.unsubscribe();
    this.isEdit = false;
    this.isAdd = false;
  }

  openEditModal(id: number) {
    this.isEdit = true;
    this.loading = true;
    this.showModal = true;
    this.title = "Organisatie aanpassen"

    this.organisatie$ = this.organisatieService.getOrganisatieById(id).subscribe(
      result => {
        this.organisatie = result;
        console.log(result);
        
        this.loading = false;
      },
      error => {
        this.toast.error("Er ging iets mis.  De organisatie kan niet worden opgehaald.", { position: 'bottom-right', dismissible: true, autoClose: false });       
      }
    );
    
  }

  openAddModal() {
    this.isAdd = true;
    this.showModal = true;
    this.title = "Organisatie toevoegen"
    this.loading = false;

    // this.getSensoren();
    // this.switches$ = this.switchLogicService.getSwitches().subscribe(result => {
    //   this.switches = result;
    //   this.loading = false;
    // });
    
  }

  closeModal() {
    this.showModal = false;
    this.isAdd = false;
    this.isEdit = false;
  }

  onChange() {
    
  }

  onSubmit() {
    this.putOrganisatie$ = this.organisatieService.putOrganisatie(this.organisatie.id, this.organisatie).pipe(
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
