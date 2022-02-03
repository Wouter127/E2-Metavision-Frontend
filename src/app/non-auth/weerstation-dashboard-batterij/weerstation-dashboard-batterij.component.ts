import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ChartComponent } from 'ng-apexcharts';
import { Subscription } from 'rxjs';
import { Meting } from 'src/app/interfaces/Meting';
import { Weerstation } from 'src/app/interfaces/Weerstation';
import { WeerstationService } from 'src/app/services/weerstation.service';
import { preChartOptionsBatterij } from '../weerstation-dashboard/chart-options';
import { WeerstationDashboardLocationComponent } from '../weerstation-dashboard-location/weerstation-dashboard-location.component';
import { HotToastService } from '@ngneat/hot-toast';

@Component({
  selector: 'app-weerstation-dashboard-batterij',
  templateUrl: './weerstation-dashboard-batterij.component.html',
  styleUrls: ['./weerstation-dashboard-batterij.component.scss']
})

export class WeerstationDashboardBatterijComponent implements OnInit {
  @ViewChild('chart', { static: false }) chart: ChartComponent = new ChartComponent();
  @ViewChild(WeerstationDashboardLocationComponent, { static: true }) weerstationdashboardlocationComponent!: WeerstationDashboardLocationComponent;
  public prechartOptionsBatterij!: preChartOptionsBatterij;

  //batterijwaardes
  bavArray: { y: number; x: Date }[] = [];
  bapArray: { y: number; x: Date }[] = [];

  // Chosen dates
  eindDate = new Date();
  beginDate = new Date();

  begin: string;
  eind: string;

  weerstation!: Weerstation;
  weerstation$: Subscription = new Subscription();
  routeParams$: Subscription = new Subscription();

  constructor(private route: ActivatedRoute, private authWeerstationService: WeerstationService, private toast: HotToastService) {
    this.beginDate.setDate(this.eindDate.getDate() - 2);
    this.begin = this.beginDate.toISOString().split('T')[0]
    this.eind = this.eindDate.toISOString().split('T')[0];

    // Reverse the order of which the toasts are displayed
    this.toast.defaultConfig = {
      ...this.toast.defaultConfig,
      reverseOrder: true
    }
  }


  ngOnInit(): void {
    this.getData(this.begin, this.eind);
  }



  getData(begin: string, eind: string) {
    //array batterij
    this.bavArray = [];
    this.bapArray = [];

    this.routeParams$ = this.route.params.subscribe(
      params => {
        this.weerstation$ = this.authWeerstationService.getDataBetweenDates(params['id'], begin, eind).subscribe(
          (result: Weerstation) => {
            this.weerstation = result;

            result.metings?.forEach((meting: Meting) => {
              //time
              let date = meting.time;

              //batterijpercentage
              let bav = Math.round(meting.bav);
              let bap = Math.round(meting.bap);

              //object batterij
              let bavObject = { x: date, y: bav };
              let bapObject = { x: date, y: bap };

              //array batterij
              this.bavArray.push(bavObject);
              this.bapArray.push(bapObject);
            });

            this.prechartOptionsBatterij = {
              series: [{
                name: "Batterijspanning",
                data: this.bavArray
              }],
              chart: {
                height: 350,
                type: 'bar'
              },
              dataLabels: {
                enabled: false
              },
              title: {
                text: 'Batterijspanning',
              },
              noData: {
                text: 'Geen data om weer te geven.'
              },
              fill: {
                type: "gradient",
                gradient: {
                  shade: "dark",
                  gradientToColors: ["#F00"],
                  shadeIntensity: 1,
                  type: "horizontal",
                  opacityFrom: 1,
                  opacityTo: 1,
                  stops: [0, 100, 100, 100]
                }
              },
              xaxis: {
                type: "datetime",
                title: {
                  text: "Per datum/uur"
                }
              },
              yaxis: {
                title: {
                  text: "Batterijspanning"
                }
              }
            };

          },
          error => {
            console.log('Error getting metings:', error);
          }
        );
      }
    );
  }


  public updateDate() {
    this.getData(this.begin, this.eind);
  }

  //genereren batterijgrafieken
  public updateBatterijspanning() {
    this.prechartOptionsBatterij.series = [{
      name: "Batterijspanning",
      data: this.bavArray
    }],
      this.prechartOptionsBatterij.title = {
        text: 'Batterijspanning'
      },
      this.prechartOptionsBatterij.chart = {
        type: 'bar',
        height: 350
      },
      this.prechartOptionsBatterij.fill = {
        type: "gradient",
        gradient: {
          shade: "dark",
          gradientToColors: ["#F00"],
          shadeIntensity: 1,
          type: "horizontal",
          opacityFrom: 1,
          opacityTo: 1,
          stops: [0, 100, 100, 100]
        }
      },
      this.prechartOptionsBatterij.xaxis = {
        type: "datetime",
        title: {
          text: "Per datum/uur"
        }
      };
    this.prechartOptionsBatterij.yaxis = {
      title: {
        text: "Batterijspanning"
      }
    }
  }

  public updateBatterijpercentage() {
    this.prechartOptionsBatterij.series = [{
      name: "Batterij percentage",
      data: this.bapArray
    }],
      this.prechartOptionsBatterij.title = {
        text: 'Batterijpercentage'
      },
      this.prechartOptionsBatterij.chart = {
        type: 'line',
        height: 350
      },
      this.prechartOptionsBatterij.fill = {
        type: "gradient",
        gradient: {
          shade: "dark",
          gradientToColors: ["#F00"],
          shadeIntensity: 1,
          type: "horizontal",
          opacityFrom: 1,
          opacityTo: 1,
          stops: [0, 100, 100, 100]
        }
      },
      this.prechartOptionsBatterij.xaxis = {
        type: "datetime",
        title: {
          text: "Per datum/uur"
        }
      };
    this.prechartOptionsBatterij.yaxis = {
      title: {
        text: "Batterij percentage (%)"
      }
    }
  }

}