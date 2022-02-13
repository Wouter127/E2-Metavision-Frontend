import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { PasswordResetService } from 'src/app/services/password-reset.service';

@Component({
  selector: 'app-nieuw-wachtwoord',
  templateUrl: './nieuw-wachtwoord.component.html',
  styleUrls: ['./nieuw-wachtwoord.component.scss']
})
export class NieuwWachtwoordComponent implements OnInit {
  public error = [];
  public form = {
    email: null,
    password: null,
    password_confirmation: null,
    resetToken: null
  }
  constructor(private router: Router, private route: ActivatedRoute, private passwordService: PasswordResetService, private toast: HotToastService) {
    route.queryParams.subscribe(params => {
      this.form.resetToken = params['token']
    });

    // Reverse the order of which the toasts are displayed
    this.toast.defaultConfig = {
      ...this.toast.defaultConfig,
      reverseOrder: true
    }
  }

  onSubmit() {
    this.passwordService.veranderPassword(this.form).pipe(
      this.toast.observe({
        loading: { content: 'Aanpassen...', position: 'bottom-right' },
        success: { content: 'Wachtwoord aangepast!', position: 'bottom-right', dismissible: true },
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
        this.router.navigate(['/login']);
      }
    )
  }


  ngOnInit(): void {
  }

}
