import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Organisatie } from 'src/app/interfaces/Organisatie';
import { OrganisatieService } from 'src/app/services/organisatie.service';
import { WeerstationService } from 'src/app/services/weerstation.service';

@Component({
  selector: 'app-ota',
  templateUrl: './ota.component.html',
  styleUrls: ['./ota.component.scss']
})
export class OtaComponent implements OnInit {

  organisaties: any[] = [];
  organisaties$: Subscription = new Subscription();

  planOta$: Subscription = new Subscription();

  file: any;
  vandaag: Date = new Date();
  vanafDatum: string;  
  vanafTijd: any;  

  formData: FormData = new FormData();

  constructor(private weerstationService: WeerstationService, private organisatieService: OrganisatieService) { 
    this.vanafDatum = this.vandaag.toISOString().split('T')[0];
    this.vanafTijd = this.vandaag.toLocaleTimeString().substring(0,5);
  }

  ngOnInit(): void {
    this.organisaties$ = this.organisatieService.getOrganisaties().subscribe(
      result => {
        let organisatieWeerstationsMetExtraProp: any[] = result;
        organisatieWeerstationsMetExtraProp = organisatieWeerstationsMetExtraProp.map((o: any) => ({...o, isChecked: false}));
        organisatieWeerstationsMetExtraProp = organisatieWeerstationsMetExtraProp.map(o => ({ ...o, weerstations: o.weerstations.map((w: any) => ({ ...w, isChecked: false })) }));

        this.organisaties = organisatieWeerstationsMetExtraProp;
      },
      error => {

      }
    )    
  }

  ngOnDestroy(): void {
    this.organisaties$.unsubscribe();
    this.planOta$.unsubscribe();
  }

  onFileSelect(event: any): void {
    // create a reference to the storage bucket location
    this.file = event.target.files[0];
  }

  organisatieListItem(event: any): void {
    let id = event.target.value;
    let checked = event.target.checked;
    
    // Check / Uncheck all the weerstations of the selected organisation
    this.organisaties.find((o: any) => o.id == id).weerstations.map((w: any) => w.isChecked = checked);
  }

  weerstationListItem(event: any): void {
    let id = event.target.value;
    let checked = event.target.checked;

    let organisatieId = this.organisaties.map((o: any) => o.weerstations.find((w: any) => w.id == id)).find((a: []) => a != undefined).organisatieId;

    if (checked === false) {
      // Uncheck organisatie checkbox
      this.organisaties.find((o: any) => o.id === organisatieId).isChecked = checked;  
    }

    if (checked === true) {
      // Check organisatie checkbox if all weerstations are checked
      let totalWeerstations = this.organisaties.find((o: any) => o.id === organisatieId).weerstations.length;
      let counter = 0;

      this.organisaties.find((o: any) => o.id === organisatieId).weerstations.map((w: any) => {if (w.isChecked === true) {counter++;}});
      
      if (totalWeerstations === counter) {
        this.organisaties.find((o: any) => o.id === organisatieId).isChecked = checked;
      }
    }
  }

  onSubmit(): void {
    const otaVanaf = this.vanafDatum + ' ' + this.vanafTijd + ':00';

    let weerstationIds: number[] = [];
    this.organisaties.map((o: any) => o.weerstations.map((w: any) => {if (w.isChecked === true) {weerstationIds.push(w.id)}}));
    
    this.planOta$ = this.weerstationService.planOta(1, this.file, otaVanaf, weerstationIds).subscribe(
      result => {
        console.log('result', result);
      },
      error => {
        console.log('error', error);
      }
    );
  }

}
