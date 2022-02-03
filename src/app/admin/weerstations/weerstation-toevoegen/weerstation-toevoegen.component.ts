import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { DialogService } from '@ngneat/dialog';
import { HotToastService } from '@ngneat/hot-toast';
import { Subscription } from 'rxjs';
import { WeerstationService } from 'src/app/services/weerstation.service';

@Component({
  selector: 'app-weerstation-toevoegen',
  templateUrl: './weerstation-toevoegen.component.html',
  styleUrls: ['./weerstation-toevoegen.component.scss']
})
export class WeerstationToevoegenComponent implements OnInit, OnDestroy {
  @Input() title!: string;
  @Output() output = new EventEmitter();

  showModal: boolean = false;

  gsmNummer: string = '';

  postWeerstation$: Subscription = new Subscription();

  constructor(private router: Router, private weerstationService: WeerstationService, private toast: HotToastService, private dialog: DialogService) {
    // Reverse the order of which the toasts are displayed
    this.toast.defaultConfig = {
      ...this.toast.defaultConfig,
      reverseOrder: true
    }
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.postWeerstation$.unsubscribe();
  }

  openModal() {
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }

  onSubmit() {
    this.postWeerstation$ = this.weerstationService.postWeerstation(this.gsmNummer).pipe(
      this.toast.observe({
        loading: { content: 'Toevoegen...', position: 'bottom-right' },
        success: { content: 'Weerstation toegevoegd!', position: 'bottom-right', dismissible: true },
        error: {
          content: (e) => {
            let msg = '<ul>';
            msg += `<li><b>Er ging iets mis!</b></li>`;
            for (let key in e.error.errors) {
              msg += `<li>${e.error.errors[key]}</li>`;
            }
            msg += '</ul>';

            return msg;
          }, position: 'bottom-right', dismissible: true, duration: 5000
        },
      })
    ).subscribe(
      result => {
        this.gsmNummer = '';
        this.closeModal();

        this.output.next(); // Send event to parent component.

        this.dialog.success({
          title: '<h2 class="text-2xl">Weerstation toegevoegd</h2>',
          body: `<p class="text-lg">Er moeten nog een paar stappen ondernomen worden voordat het weerstation volledig is toegevoegd.</p>
                      </br>
                      <h3 class="text-xl font-semibold">Instellen van weerstation</h3>
                      <p class="underline">Voor het weerstation in te stellen is fysieke toegang tot het weerstation vereist!</p>
                      <ol class="text-lg ml-2"> 
                        <li>1. Haal de SD-kaart uit het weerstation en stop deze in je kaartlezer van je computer.</li>
                        <li>2. Voeg een bestand genaamd <span class="font-bold">gsm.txt</span> toe in de root directory van de SD-kaart.</li>
                        <li>3. Plak <span class="font-bold">alleen</span> het GSM nummer <span class="font-bold">${result.gsmNummer}</span> in dit bestand en sla dit bestand op.</li>
                        <li>4. Stop de SD-kaart terug in het weerstation.</li>
                        <li>5. Verbind het weerstation met de computer en upload een Arduino sketch.</li>
                      </ol>
                      </br>
                      <h3 class="text-xl font-semibold">Hoe wordt een weerstation geautoriseerd ?</h3>
                      <p class="text-lg">Wanneer een weerstation opstart zal deze zich 'announcen'. Dit betekent dat het weerstation een authorizatie token vastlegt met de API. Mocht dit weerstation al een authorizatie token hebben, dan wordt dit niet gedaan en zou het weerstation en de API al over eenzelfde authorizatie token beschikken.</p>
                      <p class="text-lg">De authorizatie token wordt bij elke request naar de API meegegeven om zich te authorizeren.</p>`
        });
      }
    );
  }
}
