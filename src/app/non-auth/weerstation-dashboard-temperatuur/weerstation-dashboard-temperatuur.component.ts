import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ChartComponent } from 'ng-apexcharts';
import { Subscription } from 'rxjs';
import { Meting } from 'src/app/interfaces/Meting';
import { Weerstation } from 'src/app/interfaces/Weerstation';
import { WeerstationService } from 'src/app/services/weerstation.service';
import { preChartOptionsTemperatuur } from '../weerstation-dashboard/chart-options';
import { WeerstationDashboardLocationComponent } from '../weerstation-dashboard-location/weerstation-dashboard-location.component';
import { HotToastService } from '@ngneat/hot-toast';

@Component({
  selector: 'app-weerstation-dashboard-temperatuur',
  templateUrl: './weerstation-dashboard-temperatuur.component.html',
  styleUrls: ['./weerstation-dashboard-temperatuur.component.scss']
})

export class WeerstationDashboardTemperatuurComponent implements OnInit {
  @ViewChild('chart', { static: false }) chart: ChartComponent = new ChartComponent();
  @ViewChild(WeerstationDashboardLocationComponent, { static: true }) weerstationdashboardlocationComponent!: WeerstationDashboardLocationComponent;
  public prechartOptionsTemperatuur!: preChartOptionsTemperatuur;

  loading: boolean = true
  //temperatuur
  tempArray: { y: number; x: Date }[] = [];
  temp2Array: { y: number; x: Date }[] = [];
  temp3Array: { y: number; x: Date }[] = [];
  
  
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
    // Empty the arrays
    this.tempArray = [];
    this.temp2Array = [];
    this.temp3Array = [];
    
    this.routeParams$ = this.route.params.subscribe(
      params => {
        this.weerstation$ = this.authWeerstationService.getDataBetweenDates(params['id'], begin, eind).subscribe(
          (result: Weerstation) => {
            this.weerstation = result;

            result.metings?.forEach((meting: Meting) => {
              //temperatuur
              let temperatuur1 = Math.round(meting.t1 * 100) / 100;
              let temperatuur2 = Math.round(meting.t2 * 100) / 100;
              let temperatuur3 = Math.round(meting.t3 * 100) / 100;
             
              //time
              let date = meting.time;

              //object temperatuur
              let dataObject = { x: date, y: temperatuur1 };
              let dataObject2 = { x: date, y: temperatuur2 };
              let dataObject3 = { x: date, y: temperatuur3 };
              

              //array temperatuur
              this.tempArray.push(dataObject);
              this.temp2Array.push(dataObject2);
              this.temp3Array.push(dataObject3);
            });


            // Update charts
            this.prechartOptionsTemperatuur = {
              series: [{
                name: "T1 sensor",
                data: this.tempArray
              }],
              chart: {
                height: 350,
                type: 'bar'
              },
              dataLabels: {
                enabled: false
              },
              title: {
                text: 'T1 sensor',
              },
              noData: {
                text: 'Geen data om weer te geven.'
              },
              colors: ['#FFFFFF'],
              fill: {
                type: "gradient",
                colors: ["#FEB019"]
              },
              xaxis: {
                type: "datetime",
                title: {
                  text: "Per datum/uur"
                }
              },
              yaxis: {
                title: {
                  text: "T1 sensor"
                }
              }
            };

            this.loading = false;
          },
          error => {
          }
        );
      }
    );
  }


  public updateDate() {
    this.getData(this.begin, this.eind);
  }


  //genereren temperatuurgrafieken

  public updateT1() {
    this.prechartOptionsTemperatuur.series = [{
      name: "T1 sensor",
      data: this.tempArray
    }],
      this.prechartOptionsTemperatuur.title = {
        text: 'T1 sensor'
      },
      this.prechartOptionsTemperatuur.chart = {
        type: 'bar',
        height: 350
      },
      this.prechartOptionsTemperatuur.fill = {
        type: "gradient",
        colors: ["#FEB019"]
      },
      this.prechartOptionsTemperatuur.xaxis = {
        type: "datetime",
        title: {
          text: "Per datum/uur"
        }
      };
    this.prechartOptionsTemperatuur.yaxis = {
      title: {
        text: "T1 sensor"
      }
    }
  }

  public updateT2() {
    this.prechartOptionsTemperatuur.series = [{
      name: "T2 sensor",
      data: this.temp2Array
    }],
      this.prechartOptionsTemperatuur.title = {
        text: 'T2 sensor'
      },
      this.prechartOptionsTemperatuur.chart = {
        type: 'bar',
        height: 350
      },
      this.prechartOptionsTemperatuur.fill = {
        type: "gradient",
        colors: ["#FEB019"]
      },
      this.prechartOptionsTemperatuur.xaxis = {
        type: "datetime",
        title: {
          text: "Per datum/uur"
        }
      };
    this.prechartOptionsTemperatuur.yaxis = {
      title: {
        text: "T2 sensor"
      }
    }
  }

  public updateT3() {
    this.prechartOptionsTemperatuur.series = [{
      name: "T3 sensor",
      data: this.temp3Array
    }],
      this.prechartOptionsTemperatuur.title = {
        text: 'T3 sensor'
      },
      this.prechartOptionsTemperatuur.chart = {
        type: 'area',
        height: 350
      },
      this.prechartOptionsTemperatuur.fill = {
        type: "gradient",
        colors: ["#FEB019"]
      },
      this.prechartOptionsTemperatuur.xaxis = {
        type: "datetime",
        title: {
          text: "Per datum/uur"
        }
      };
    this.prechartOptionsTemperatuur.yaxis = {
      title: {
        text: "T3 sensor"
      }
    }
  }

}