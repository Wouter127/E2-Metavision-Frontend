import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { Organisatie } from 'src/app/interfaces/Organisatie';
import { Weerstation } from 'src/app/interfaces/Weerstation';
import { OrganisatieService } from 'src/app/services/admin/organisatie.service';
import { WeerstationService } from 'src/app/services/admin/weerstation.service';

@Component({
  selector: 'app-weerstation-list',
  templateUrl: './weerstation-list.component.html',
  styleUrls: ['./weerstation-list.component.scss']
})
export class WeerstationListComponent implements OnInit, OnDestroy {
  // @Input() weerstation: any = {id: 0, organisatieId: 0, naam: "", isPubliekZichtbaar: false, gsmNummer: "", uniekeCode: "", created_at: new Date(), updated_at: new Date()};

  organisaties: Organisatie[] = [];
  organisaties$: Subscription = new Subscription();
  deleteWeerstation$: Subscription = new Subscription();
errorMessage = ""
  isAdmin = true

  constructor(private weerstationService: WeerstationService, private organisatieService: OrganisatieService) { }


  ngOnInit(): void {
    if (this.isAdmin) {
      this.getAllOrganisatiesWithWeerstations();
    } else {
      this.getOrganisatieWithWeerstations();
    }
    
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
    })
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
