import { Component, OnInit, ViewChild } from '@angular/core';
import { HotToastService } from '@ngneat/hot-toast';
import { Subscription } from 'rxjs';
import { Email } from 'src/app/interfaces/Email';
import { EmailService } from 'src/app/services/email.service';
import { EmailConfigFormComponent } from '../email-config-form/email-config-form.component';
import { EmailFormComponent } from '../email-form/email-form.component';

@Component({
  selector: 'app-email-list',
  templateUrl: './email-list.component.html',
  styleUrls: ['./email-list.component.scss']
})
export class EmailListComponent implements OnInit {
  @ViewChild(EmailFormComponent, { static: true }) emailFormComponent!: EmailFormComponent;
  @ViewChild(EmailConfigFormComponent, { static: true }) emailConfigFormComponent!: EmailConfigFormComponent;

  loading: boolean = true;

  emails: Email[] = [];
  emails$: Subscription = new Subscription();

  emailConfig: any;
  emailConfig$: Subscription = new Subscription();

  constructor(private emailService: EmailService, private toast: HotToastService) {
    // Reverse the order of which the toasts are displayed
    this.toast.defaultConfig = {
      ...this.toast.defaultConfig,
      reverseOrder: true
    }
  }

  ngOnInit(): void {
    this.getEmails();
    this.getEmailConfig();
  }

  ngOnDestroy(): void {
    this.emails$.unsubscribe();
    this.emailConfig$.unsubscribe();
  }

  wijzigEmail(id: number): void {
    this.emailFormComponent.openEditModal(id);

    // When the gebruiker is edited successfully, refresh the list of gebruikers.
    this.emailFormComponent.output.subscribe(() => {
      this.getEmails();
    });
  }

  wijzigEmailConfig(): void {
    this.emailConfigFormComponent.openEditModal();

    // When the gebruiker is edited successfully, refresh the list of gebruikers.
    this.emailConfigFormComponent.output.subscribe(() => {
      this.getEmailConfig();
    });
  }

  getEmails(): void {
    this.loading = true;
    this.emails$ = this.emailService.getEmails().subscribe(
      result => {
        this.emails = result;
        this.loading = false;
      },
      error => {
        this.toast.error("Er ging iets mis. De emails kunnen niet worden opgehaald.", { position: 'bottom-right', dismissible: true, autoClose: false });
      }
    );
  }

  getEmailConfig(): void {
    this.emailConfig$ = this.emailService.getEmailConfig().subscribe(
      result => {
        this.emailConfig = result;
        this.loading = false;
      },
      error => {
        this.toast.error("Er ging iets mis. De email configuratie kan niet worden opgehaald.", { position: 'bottom-right', dismissible: true, autoClose: false });
      }
    );
  }
}
