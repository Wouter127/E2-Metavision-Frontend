import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PasswordResetService } from 'src/app/services/password-reset.service';

@Component({
  selector: 'app-nieuw-wachtwoord',
  templateUrl: './nieuw-wachtwoord.component.html',
  styleUrls: ['./nieuw-wachtwoord.component.scss']
})
export class NieuwWachtwoordComponent implements OnInit {
  public error=[];
  public form = {
    email:null,
    password: null,
    password_confirmation: null,
    resetToken: null
  }
  constructor(private route: ActivatedRoute, private passwordService: PasswordResetService) {
    route.queryParams.subscribe(params => {
      this.form.resetToken = params['token']
    });
   }

   onSubmit() {
      this.passwordService.veranderPassword(this.form).subscribe(
      )
   }

  
  ngOnInit(): void {
  }

}
