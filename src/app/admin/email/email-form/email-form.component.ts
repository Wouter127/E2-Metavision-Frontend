import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { HotToastService } from '@ngneat/hot-toast';
import { Subscription } from 'rxjs';
import { Email } from 'src/app/interfaces/Email';
import { EmailService } from 'src/app/services/email.service';

@Component({
  selector: 'app-email-form',
  templateUrl: './email-form.component.html',
  styleUrls: ['./email-form.component.scss']
})
export class EmailFormComponent implements OnInit {
  @Input() title!: string;
  @Output() output = new EventEmitter();

  loading: boolean = true;
  showModal: boolean = false;

  email!: Email;
  email$: Subscription = new Subscription();

  putEmail$: Subscription = new Subscription();

  constructor(private emailService: EmailService, private toast: HotToastService) {
    // Reverse the order of which the toasts are displayed
    this.toast.defaultConfig = {
      ...this.toast.defaultConfig,
      reverseOrder: true
    }
   }

  ngOnInit(): void {
  }

  closeModal() {
    this.showModal = false;
  }

  openEditModal(id: number) {
    this.title = "Email tekst aanpassen";

    this.email$ = this.emailService.getEmailById(id).subscribe(
      result => {
        this.email = result;   
        this.loading = false;
        this.showModal = true;

        this.title = `'${result.naam}' tekst aanpassen`;
      },
      error => {
        this.toast.error("Er ging iets mis. De email kan niet worden opgehaald.", { position: 'bottom-right', dismissible: true, autoClose: false });
      }
    );
  }

  onSubmit() {
    this.putEmail$ = this.emailService.putEmail(this.email.id, this.email).pipe(
      this.toast.observe({
        loading: { content: 'Aanpassen...', position: 'bottom-right' },
        success: { content: 'Email aangepast!', position: 'bottom-right', dismissible: true },
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
