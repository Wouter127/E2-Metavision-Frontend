import { Component, OnInit } from '@angular/core';
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
  constructor(private reset: PasswordResetService, private toast: HotToastService) {
    // Reverse the order of which the toasts are displayed
    this.toast.defaultConfig = {
      ...this.toast.defaultConfig,
      reverseOrder: true
    }
   }

  ngOnInit(): void {
  }

  onSubmit() {
    this.reset.stuurPasswoordResetLink(this.form).subscribe(
      data => this.handleResponse(data),
      error => console.log(error.error.error) 
    );
  }

  handleResponse(res: any) {

    console.log(res);
    this.form.email = null;
  }
}
