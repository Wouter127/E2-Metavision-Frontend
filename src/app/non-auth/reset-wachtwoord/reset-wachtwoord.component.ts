import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { PasswordResetService } from 'src/app/services/password-reset.service';

@Component({
  selector: 'app-reset-wachtwoord',
  templateUrl: './reset-wachtwoord.component.html',
  styleUrls: ['./reset-wachtwoord.component.scss']
})
export class ResetWachtwoordComponent implements OnInit {
  public form  = {
    email: null
  };
  constructor(private router: Router, private reset: PasswordResetService, private toast: HotToastService) {
    // Reverse the order of which the toasts are displayed
    this.toast.defaultConfig = {
      ...this.toast.defaultConfig,
      reverseOrder: true
    }
   }

  ngOnInit(): void {
  }

  onSubmit() {
    this.reset.stuurPasswoordResetLink(this.form).pipe(
      this.toast.observe({
        loading: { content: 'Versturen...', position: 'bottom-right' },
        success: { content: 'Email verstuurd! Controleer uw inbox.', position: 'bottom-right', dismissible: true },
        error: {
          content: (e) => {
            let msg = '<ul>';
            msg += `<li><b>Er ging iets mis!</b></li>`;
            if (e.statusText === "Internal Server Error") {
              msg += `<li>Controleer of u al een email heeft ontvangen.</li>`;
            }
            else {
              for (let key in e.error.errors) {
                msg += `<li>${e.error.errors[key]}</li>`;
              }
            }
            msg += '</ul>';

            return msg;
          }, position: 'bottom-right', dismissible: true, duration: 5000
        },
      })
    ).subscribe(
      result => {
        this.router.navigate(['/']);
      }
    );
  }
}
