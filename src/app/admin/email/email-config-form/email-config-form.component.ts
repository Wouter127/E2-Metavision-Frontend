import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { HotToastService } from '@ngneat/hot-toast';
import { Subscription } from 'rxjs';
import { EmailService } from 'src/app/services/email.service';

@Component({
  selector: 'app-email-config-form',
  templateUrl: './email-config-form.component.html',
  styleUrls: ['./email-config-form.component.scss']
})
export class EmailConfigFormComponent implements OnInit {
  @Input() title!: string;
  @Output() output = new EventEmitter();

  loading: boolean = true;
  showModal: boolean = false;

  emailConfig: any;
  emailConfig$: Subscription = new Subscription();

  putEmailConfig$: Subscription = new Subscription();

  constructor(private emailService: EmailService, private toast: HotToastService) { 
    // Reverse the order of which the toasts are displayed
    this.toast.defaultConfig = {
      ...this.toast.defaultConfig,
      reverseOrder: true
    }
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.putEmailConfig$.unsubscribe();
  }

  closeModal() {
    this.showModal = false;
  }

  openEditModal() {
    this.title = "Email configuratie aanpassen";

    this.emailConfig$ = this.emailService.getEmailConfig().subscribe(
      result => {
        this.emailConfig = result;
        this.loading = false;
        this.showModal = true;
      },
      error => {
        this.toast.error("Er ging iets mis. De email configuratie kan niet worden opgehaald.", { position: 'bottom-right', dismissible: true, autoClose: false });
      }
    );
  }

  onSubmit() {
    this.putEmailConfig$ = this.emailService.putEmailConfig(this.emailConfig.id, this.emailConfig).pipe(
      this.toast.observe({
        loading: { content: 'Aanpassen...', position: 'bottom-right' },
        success: { content: 'Email configuratie aangepast!', position: 'bottom-right', dismissible: true },
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
