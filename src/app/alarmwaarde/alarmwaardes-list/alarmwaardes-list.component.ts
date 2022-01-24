import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DialogService } from '@ngneat/dialog';
import { HotToastService } from '@ngneat/hot-toast';
import { Subscription } from 'rxjs';
import { WeerstationService } from 'src/app/services/organisatiebeheerder/weerstation.service';
import { AlarmWaardeService } from 'src/app/services/organisatiebeheerder/alarm-waarde.service';
import { AlarmwaardesFormComponent } from '../alarmwaardes-form/alarmwaardes-form.component';
import { AlarmWaarde } from 'src/app/interfaces/Alarm-waarde';

@Component({
  selector: 'app-alarmwaardes-list',
  templateUrl: './alarmwaardes-list.component.html',
  styleUrls: ['./alarmwaardes-list.component.scss']
})
export class AlarmwaardesListComponent implements OnInit {
  @ViewChild(AlarmwaardesFormComponent, { static: true }) alarmwaardesFormComponent!: AlarmwaardesFormComponent;

  loading: boolean = true;

  weerstation: any = {};
  weerstation$: Subscription = new Subscription();



  constructor(
    private weerstationService: WeerstationService,
    private route: ActivatedRoute,
    private toast: HotToastService,
    private dialog: DialogService,
    private alarmWaardeService: AlarmWaardeService) {

    // Reverse the order of which the toasts are displayed
    this.toast.defaultConfig = {
      ...this.toast.defaultConfig,
      reverseOrder: true
    }
  }

  ngOnInit(): void {
    const weerstationId = this.route.snapshot.paramMap.get('id')?.toString();
    this.getWeerstation(weerstationId);
  }

  ngOnDestroy(): void {
    this.weerstation$.unsubscribe();
  }

  getWeerstation(id: any) {
    this.weerstation$ = this.weerstationService.getWaardesByWeerstationId(id).subscribe(
      result => {
        this.weerstation = result;
        console.log(this.weerstation);
        this.loading = false;
      },
      error => {
        this.toast.error("Er ging iets mis.  De gebruiker kan niet worden opgehaald.", { position: 'bottom-right', dismissible: true, autoClose: false })
      }
    );
  }

  toevoegenAlarmwaarde() {
    console.log("voeg toe");
  }

  wijzigAlarmWaarde(id: any) {
    console.log("wijzig: ", id);

    this.alarmwaardesFormComponent.openModal(id);

    // When the gebruiker is edited successfully, refresh the list of gebruikers.
    this.alarmwaardesFormComponent.output.subscribe(() => {
      const weerstationId = this.route.snapshot.paramMap.get('id')?.toString();
      this.getWeerstation(weerstationId);
    });
  }

  verwijderAlarmWaarde(id: any): void {
    console.log("verwijder", id);
    this.dialog.confirm({
      title: 'Alarmwaarde verwijderen?',
      body: 'Deze actie kan niet ongedaan gemaakt worden.'
    }).afterClosed$.subscribe(confirmed => {
      if (confirmed) {
        this.alarmWaardeService.deleteAlarmwaarde(id).pipe(
          this.toast.observe({
            loading: { content: 'Verwijderen...', position: 'bottom-right' },
            success: { content: 'Alarmwaarde verwijderd!', position: 'bottom-right', dismissible: true },
            error: { content: 'Er ging iets mis.', position: 'bottom-right', dismissible: true },
          })
        ).subscribe(
          result => {
            const weerstationId = this.route.snapshot.paramMap.get('id')?.toString();
            this.getWeerstation(weerstationId);
          }
        );
      }
    });
  }
}
