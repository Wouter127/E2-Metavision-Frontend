import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { HotToastService } from '@ngneat/hot-toast';
import { Subscription } from 'rxjs';
import { HelpService } from 'src/app/services/help.service';

@Component({
  selector: 'app-vraag-form',
  templateUrl: './vraag-form.component.html',
  styleUrls: ['./vraag-form.component.scss']
})
export class VraagFormComponent implements OnInit {
  @Input() title!: string;
  @Output() output = new EventEmitter();

  vraag: any = {};
  vraag$: Subscription = new Subscription();

  loading: boolean = true;
  showModal: boolean = false;

  putVraag$: Subscription = new Subscription();
  postVraag$: Subscription = new Subscription();

  isAdd: boolean = false;
  isEdit: boolean = false;


  constructor(private helpService: HelpService, private toast: HotToastService) {
    // Reverse the order of which the toasts are displayed
    this.toast.defaultConfig = {
      ...this.toast.defaultConfig,
      reverseOrder: true
    }
   }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.putVraag$.unsubscribe();
    this.postVraag$.unsubscribe();
    this.isEdit = false;
    this.isAdd = false;
  }

  openEditModal(id: number) {
    this.showModal = true;
    this.isEdit = true;
    this.loading = true;
    this.title = "Vraag aanpassen"
    this.vraag$ = this.helpService.getVraagById(id).subscribe(
      result => {
        this.vraag = result;
        this.loading = false;
        console.log(result);
        
      },
      error => {
        this.toast.error("Er ging iets mis.  De vraag kan niet worden opgehaald.", { position: 'bottom-right', dismissible: true, autoClose: false });       
      }
    );
    
  }

  openAddModal() {
    this.isAdd = true;
    this.showModal = true;
    this.title = "Vraag toevoegen"
    this.loading = false;
  }

  closeModal() {
    this.showModal = false;
    this.isAdd = false;
    this.isEdit = false;
  }

  vraagChangeHandler(event: any) {
      this.vraag.waarde = parseInt(event.target.value);
      console.log(this.vraag);
      
  }

  antwoordChangeHandler(event: any) {
    this.vraag.antwoord = parseInt(event.target.value);
}

  onSubmit() {
    if (this.isEdit) {
    this.putVraag$ = this.helpService.putVraag(this.vraag.id, this.vraag).pipe(
      this.toast.observe({
        loading: { content: 'Aanpassen...', position: 'bottom-right' },
        success: { content: 'Vraag aangepast!', position: 'bottom-right', dismissible: true },
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
        this.isEdit = false;

        this.output.next(); // Send event to parent component.
      }
    );
    }
    if (this.isAdd) {
      console.log("vraag", this.vraag);
      
      this.postVraag$ = this.helpService.postVraag(this.vraag).pipe(
        this.toast.observe({
          loading: { content: 'Nieuw...', position: 'bottom-right' },
          success: { content: 'Vraag gemaakt!', position: 'bottom-right', dismissible: true },
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
          this.isAdd = false;
  
          this.output.next(); // Send event to parent component.
        }
      );
    }
  }
  

}
