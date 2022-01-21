import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Weerstation } from 'src/app/interfaces/Weerstation';
import { WeerstationService } from 'src/app/services/admin/weerstation.service';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-weerstation-list',
  templateUrl: './weerstation-list.component.html',
  styleUrls: ['./weerstation-list.component.scss']
})
export class WeerstationListComponent implements OnInit, OnDestroy {
  weerstations: Weerstation[] = [];
  weerstations$: Subscription = new Subscription();
  deleteWeerstation$: Subscription = new Subscription();

  errorMessage: string = '';


  constructor(private weerstationService: WeerstationService, private router: Router) {

   }

  ngOnInit(): void {
    this.getWeerstations()
  }

  ngOnDestroy(): void {
    this.weerstations$.unsubscribe();
    this.deleteWeerstation$.unsubscribe();
  }

  add() {
    this.router.navigate(['/weerstationtoevoegen'], {state: {mode: 'add'}});
  }

  delete(id: number) {
      if (this.weerstationService)
    this.deleteWeerstation$ = this.weerstationService.deleteWeerstation(id).subscribe(result => {
      //all went well
      this.getWeerstations();
    }, error => {
      //error
      this.errorMessage = error.message;
    });
  }

  getWeerstations() {
    this.weerstations$ = this.weerstationService.getWeerstations().subscribe(result => { this.weerstations = result
                                                                                          console.log(this.weerstations)
    });
  }

}
