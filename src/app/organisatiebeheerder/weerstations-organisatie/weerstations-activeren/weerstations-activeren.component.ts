import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { WeerstationService } from 'src/app/services/weerstation.service';

@Component({
  selector: 'app-weerstations-activeren',
  templateUrl: './weerstations-activeren.component.html',
  styleUrls: ['./weerstations-activeren.component.scss']
})
export class WeerstationsActiverenComponent implements OnInit {

  uniekeCode: string = "";
  isSubmitted: boolean = false;
  errorMessage: string = "";

  activeerWeerstation$: Subscription = new Subscription();

  constructor(private router: Router, private weerstationService: WeerstationService) { }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.activeerWeerstation$.unsubscribe();
  }

  onSubmit() {
    this.isSubmitted = true;
    this.activeerWeerstation$ = this.weerstationService.activeerWeerstation(this.uniekeCode).subscribe(
    result => {
      // TODO: navigeer naar lijst van weerstations van de organisatie.
    },
      error => {
        this.errorMessage = error.error.message;
      });
  }

}
