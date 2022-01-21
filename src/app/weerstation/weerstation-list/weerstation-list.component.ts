import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Organisatie } from 'src/app/interfaces/Organisatie';
import { OrganisatieService } from 'src/app/services/admin/organisatie.service';
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

  organisaties: Organisatie[] = [];
  organisaties$: Subscription = new Subscription();
  deleteWeerstation$: Subscription = new Subscription();
  errorMessage: string = "";
  isAdmin = true;

  constructor(private weerstationService: WeerstationService, private organisatieService: OrganisatieService, private router: Router) { }

  ngOnInit(): void {
    if (this.isAdmin) {
      this.getAllOrganisatiesWithWeerstations();
    } else {
      this.getOrganisatieWithWeerstations();
    }
  }

  add() {
    this.router.navigate(['/weerstationtoevoegen'], {state: {mode: 'add'}});
  }

  ngOnDestroy() {
    this.organisaties$.unsubscribe();
    this.deleteWeerstation$.unsubscribe();
  }

  changeZichtbaarheid(weerstation: Weerstation) {
    if (weerstation.isPubliekZichtbaar) {
      weerstation.isPubliekZichtbaar = 0
    } else {
      weerstation.isPubliekZichtbaar = 1
    }
  
    this.weerstationService.editZichtbaarheid(weerstation.id, weerstation).subscribe((res: any) => {
      this.ngOnInit();
    });
  }

  deleteWeerstation(id: number) {
    if (this.weerstationService)
  this.deleteWeerstation$ = this.weerstationService.deleteWeerstation(id).subscribe(result => {
    //all went well
    this.ngOnInit();
  }, error => {
    //error
    this.errorMessage = error.message;
  });

}

  getOrganisatieWithWeerstations() {
    var organisatieId = 1
    this.organisaties$ = this.organisatieService.getOrganisatieWithWeerstations(organisatieId).subscribe(result => {
      this.organisaties = result;
    });
  }

  getAllOrganisatiesWithWeerstations() {
    this.organisaties$ = this.organisatieService.getAllOrganisatiesWithWeerstations().subscribe(result => this.organisaties = result)
  }
}
