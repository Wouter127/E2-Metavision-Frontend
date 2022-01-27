import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DialogService } from '@ngneat/dialog';
import { HotToastService } from '@ngneat/hot-toast';
import { Subscription } from 'rxjs';
import { AlarmWaardeService } from 'src/app/services/alarm-waarde.service';
import { SchakelWaardeService } from 'src/app/services/schakel-waarde.service';
import { WeerstationService } from 'src/app/services/weerstation.service';
import { WeerstationsAlarmSchakelwaardesFormComponent } from '../weerstations-alarm-schakelwaardes-form/weerstations-alarm-schakelwaardes-form.component';

@Component({
  selector: 'app-weerstations-alarm-schakelwaardes-list',
  templateUrl: './weerstations-alarm-schakelwaardes-list.component.html',
  styleUrls: ['./weerstations-alarm-schakelwaardes-list.component.scss']
})
export class WeerstationsAlarmSchakelwaardesListComponent implements OnInit {
  @ViewChild(WeerstationsAlarmSchakelwaardesFormComponent, { static: true }) alarmwaardesFormComponent!: WeerstationsAlarmSchakelwaardesFormComponent;

  loading: boolean = true;

  weerstation: any = {};
  weerstation$: Subscription = new Subscription();

  constructor(
    private weerstationService: WeerstationService,
    private route: ActivatedRoute,
    private toast: HotToastService,
    private dialog: DialogService,
    private alarmWaardeService: AlarmWaardeService,
    private schakelWaardeService: SchakelWaardeService) {

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
        this.loading = false;
        console.log(this.weerstation.schakel_waardes.length);

      },
      error => {
        this.toast.error("Er ging iets mis.  De alarm- en schakelwaarden kunnen niet worden opgehaald.", { position: 'bottom-right', dismissible: true, autoClose: false })
      }
    );
  }

  toevoegenAlarmwaarde() {
    this.alarmwaardesFormComponent.openAddAlarmWaardeModal();

    // When the alarmwaarde is edited successfully, refresh the list of alarmwaardes.
    this.alarmwaardesFormComponent.output.subscribe(() => {
      const weerstationId = this.route.snapshot.paramMap.get('id')?.toString();
      this.getWeerstation(weerstationId);
    });
  }

  wijzigAlarmWaarde(id: any) {
    this.alarmwaardesFormComponent.openEditAlarmWaardeModal(id);

    // When the alarmwaarde is edited successfully, refresh the list of alarmwaardes.
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
            success: { content: 'Alarmwaarde verwijderd! <br> Deze wijzigingen worden binnen 15 minuten doorgevoerd.', position: 'bottom-right', dismissible: true },
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

  toevoegenSchakelwaarde() {
    this.alarmwaardesFormComponent.openAddSchakelWaardeModal();

    // When the schakelwaarde is edited successfully, refresh the list of schakelwaardes.
    this.alarmwaardesFormComponent.output.subscribe(() => {
      const weerstationId = this.route.snapshot.paramMap.get('id')?.toString();
      this.getWeerstation(weerstationId);
    });
  }

  wijzigSchakelWaarde(id: any) {
    this.alarmwaardesFormComponent.openEditSchakelWaardeModal(id);

    // When the schakelwaarde is edited successfully, refresh the list of schakelwaardes.
    this.alarmwaardesFormComponent.output.subscribe(() => {
      const weerstationId = this.route.snapshot.paramMap.get('id')?.toString();
      this.getWeerstation(weerstationId);
    });
  }

  verwijderSchakelWaarde(id: any): void {
    console.log("verwijder", id);
    this.dialog.confirm({
      title: 'schakelwaarde verwijderen?',
      body: 'Deze actie kan niet ongedaan gemaakt worden.'
    }).afterClosed$.subscribe(confirmed => {
      if (confirmed) {
        this.schakelWaardeService.deleteSchakelwaarde(id).pipe(
          this.toast.observe({
            loading: { content: 'Verwijderen...', position: 'bottom-right' },
            success: { content: 'schakelwaarde verwijderd! <br> Deze wijzigingen worden binnen 15 minuten doorgevoerd.', position: 'bottom-right', dismissible: true },
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
