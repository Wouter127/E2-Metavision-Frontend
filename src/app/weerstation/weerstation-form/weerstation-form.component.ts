import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Weerstation } from 'src/app/interfaces/Weerstation';
import { WeerstationService } from 'src/app/services/admin/weerstation.service';

@Component({
  selector: 'app-weerstation-form',
  templateUrl: './weerstation-form.component.html',
  styleUrls: ['./weerstation-form.component.scss']
})
export class WeerstationFormComponent implements OnInit {

  weerstation: any = {};
  weerstationId: number = 0;
  weerstation$: Subscription = new Subscription();
  putWeerstation$: Subscription = new Subscription();
  errorMessage: string = '';
  isSubmitted: boolean = false;

  constructor(private router: Router, private weerstationService: WeerstationService) {
    this.weerstationId = +this.router.getCurrentNavigation()?.extras.state?.id;

    if (this.weerstationId != null && this.weerstationId > 0) {
      this.weerstation$ = this.weerstationService.getWeerstationById(this.weerstationId).subscribe(result => this.weerstation = result);
    }
   }

  ngOnInit(): void {    
  }

  changeZichtbaarheid(weerstation: Weerstation) {
    if (weerstation.isPubliekZichtbaar) {
      weerstation.isPubliekZichtbaar = 0
    } else {
      weerstation.isPubliekZichtbaar = 1
    }
  }

  onSubmit() {
    this.isSubmitted = true;
    this.putWeerstation$ = this.weerstationService.putWeerstation(this.weerstationId, this.weerstation).subscribe(result => {
      //all went well
      this.router.navigateByUrl("/mijnweerstations");
    },
    error => {
      this.errorMessage = error.message;
    });
  }

}
