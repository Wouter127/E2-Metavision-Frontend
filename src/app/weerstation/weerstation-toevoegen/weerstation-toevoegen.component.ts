import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Weerstation } from 'src/app/interfaces/Weerstation';
import { WeerstationService } from 'src/app/services/admin/weerstation.service';

@Component({
  selector: 'app-weerstation-toevoegen',
  templateUrl: './weerstation-toevoegen.component.html',
  styleUrls: ['./weerstation-toevoegen.component.scss']
})
export class WeerstationToevoegenComponent implements OnInit, OnDestroy {

  isAdd: boolean = false;
  isEdit: boolean = false;
  weerstationId: number = 0;

  weerstation: Weerstation = { id: 0, gsmNummer: "" };

  isSubmitted: boolean = false;
  errorMessage: string = "";

  weerstation$: Subscription = new Subscription();
  postWeerstation$: Subscription = new Subscription();
  putWeerstation$: Subscription = new Subscription();

  constructor(private router: Router, private weerstationService: WeerstationService) {
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.postWeerstation$.unsubscribe();
  }

  onSubmit() {
    this.isSubmitted = true;
      this.postWeerstation$ = this.weerstationService.postWeerstation(this.weerstation).subscribe(result => {
                //all went well
                this.router.navigateByUrl("/alleweerstations");
              },
              error => {
                this.errorMessage = error.error.errors.gsmNummer;
                console.log(error);
              });
      }
}
