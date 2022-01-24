import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Organisatie } from 'src/app/interfaces/Organisatie';
import { OrganisatieService } from 'src/app/services/admin/organisatie.service';
import { Router } from '@angular/router';
import { Weerstation } from 'src/app/interfaces/Weerstation';
import { WeerstationService } from 'src/app/services/admin/weerstation.service';
import { Observable, Subscription } from 'rxjs';
import { FormControl, FormGroup } from '@angular/forms';
import { HotToastService } from '@ngneat/hot-toast';

@Component({
  selector: 'app-weerstation-list',
  templateUrl: './weerstation-list.component.html',
  styleUrls: ['./weerstation-list.component.scss']
})
export class WeerstationListComponent implements OnInit, OnDestroy {
  loading: boolean = true;

  organisaties: Organisatie[] = [];
  organisaties$: Subscription = new Subscription();
  weerstationsZonderOrganisatie: Weerstation[] = [];
  weerstationsZonderOrganisatie$: Subscription = new Subscription();
  weerstation$: Subscription = new Subscription();
  deleteWeerstation$: Subscription = new Subscription();
  errorMessage: string = "";
  isAdmin = true;
  changeNaamId: number = 0;
  naam = '';
  weerstation: any = {naam: "", id: 0}

  form = new FormGroup({
    naam: new FormControl('')
  });

  constructor(private weerstationService: WeerstationService, private organisatieService: OrganisatieService, private router: Router, private toast: HotToastService) { 
    // Reverse the order of which the toasts are displayed
    this.toast.defaultConfig = {
      ...this.toast.defaultConfig,
      reverseOrder: true
    }
  }

  ngOnInit(): void {
    if (this.isAdmin) {
      this.getOrganisaties();
      this.getWeerstationsZonderOrganisatie();
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
    // this.weerstations$.unsubscribe();
    this.weerstation$.unsubscribe();
  }

  changeZichtbaarheid(weerstation: Weerstation) {
    if (weerstation.isPubliekZichtbaar) {
      weerstation.isPubliekZichtbaar = 0
    } else {
      weerstation.isPubliekZichtbaar = 1
    }
  
    this.weerstationService.putWeerstation(weerstation.id, weerstation).subscribe((res: any) => {
      console.log(res);
      
    });
  }

  handleSubmit(e: any){
    e.preventDefault();
    this.weerstation$ = this.weerstationService.putWeerstation(this.changeNaamId, this.weerstation ).subscribe((res: any) => {
      console.log(res);
      this.changeNaamId = 0;
      this.ngOnInit();
    });

  }

  handleKeyUp(e: any){
     if(e.keyCode === 13){
        this.handleSubmit(e);
     }
     this.weerstation.naam = this.naam
     console.log(this.naam);
  }

  changeNaam(id: number, naam: any) {
    this.changeNaamId = id;
    this.naam = naam;
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

  getOrganisaties() {
    this.organisaties$ = this.organisatieService.getOrganisaties().subscribe(
      result => {
          this.organisaties = result;
          this.loading = false;
      },
      error => {

      }
    );
  }

  getAllOrganisatiesWithWeerstations() {
    this.organisaties$ = this.organisatieService.getAllOrganisatiesWithWeerstations().subscribe(result => this.organisaties = result);
  }

  edit(id: number) {
    //Navigate to form in edit mode
    this.router.navigate(['/weerstations/form'], {state: {id: id}});
  }

  getWeerstationsZonderOrganisatie() {
    this.weerstationsZonderOrganisatie$ = this.weerstationService.getWeerstationsZonderOrganisaties().subscribe(result => this.weerstationsZonderOrganisatie = result)
  }
}
