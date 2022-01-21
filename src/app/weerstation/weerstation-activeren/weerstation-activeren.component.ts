import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { WeerstationService } from 'src/app/services/organisatiebeheerder/weerstation.service';

@Component({
  selector: 'app-weerstation-activeren',
  templateUrl: './weerstation-activeren.component.html',
  styleUrls: ['./weerstation-activeren.component.scss']
})
export class WeerstationActiverenComponent implements OnInit, OnDestroy {
    uniekeCode: string = "";
    isSubmitted: boolean = false;
    errorMessage: string = "";

    activeerWeerstation$: Subscription = new Subscription();


  constructor(private router: Router, private weerstationService: WeerstationService) {

   }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
      this.activeerWeerstation$.unsubscribe();
  }

  onSubmit() {
    this.isSubmitted = true;
    this.activeerWeerstation$ = this.weerstationService.activeerWeerstation(this.uniekeCode).subscribe(result => {
      this.router.navigateByUrl("/alleweerstations");
    },
    error => {
      this.errorMessage = error.error.message;
    });
  }

}
