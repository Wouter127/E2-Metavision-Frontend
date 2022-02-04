import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ChartComponent } from 'ng-apexcharts';
import { Subscription } from 'rxjs';
import { Meting } from 'src/app/interfaces/Meting';
import { Weerstation } from 'src/app/interfaces/Weerstation';
import { WeerstationService } from 'src/app/services/weerstation.service';
import { preChartOptionsLuchtvochtigheid } from '../weerstation-dashboard/chart-options';
import { WeerstationDashboardLocationComponent } from '../weerstation-dashboard-location/weerstation-dashboard-location.component';
import { HotToastService } from '@ngneat/hot-toast';


@Component({
  selector: 'app-weerstation-dashboard-luchtvochtigheid',
  templateUrl: './weerstation-dashboard-luchtvochtigheid.component.html',
  styleUrls: ['./weerstation-dashboard-luchtvochtigheid.component.scss']
})

export class WeerstationDashboardLuchtvochtigheidComponent implements OnInit {
  @ViewChild('chart', { static: false }) chart: ChartComponent = new ChartComponent();
  @ViewChild(WeerstationDashboardLocationComponent, { static: true }) weerstationdashboardlocationComponent!: WeerstationDashboardLocationComponent;
  public prechartOptionsLuchtvochtigheid!: preChartOptionsLuchtvochtigheid;


  //luchtvochtigheid
  rhArray: { y: number; x: Date }[] = [];
  lw1Array: { y: boolean; x: Date }[] = [];
  lw2Array: { y: boolean; x: Date }[] = [];
  
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
    //array luchtvochtigheid
    this.rhArray = [];
    this.lw1Array = [];
    this.lw2Array = [];
    
    this.routeParams$ = this.route.params.subscribe(
      params => {
        this.weerstation$ = this.authWeerstationService.getDataBetweenDates(params['id'], begin, eind).subscribe(
          (result: Weerstation) => {
            this.weerstation = result;

            result.metings?.forEach((meting: Meting) => {
              //time
              let date = meting.time;

              //luchtvochtigheid
              let rh = Math.round(meting.rf * 100) / 100;
              let lw1 = meting.lw1;
              let lw2 = meting.lw2;
              
              //object luchtvochtigheid
              let rhObject = { x: date, y: rh };
              let lw1Object = { x: date, y: lw1 };
              let lw2Object = { x: date, y: lw2 };
              
              //array luchtvochtigheid
              this.rhArray.push(rhObject);
              this.lw1Array.push(lw1Object);
              this.lw2Array.push(lw2Object);
              
            });


            // Update charts
            this.prechartOptionsLuchtvochtigheid = {
              series: [{
                name: "RH waarde (luchtvochtigheid)",
                data: this.rhArray
              }],
              chart: {
                height: 350,
                type: 'bar'
              },
              dataLabels: {
                enabled: false
              },
              title: {
                text: 'Rh waardes (luchtvochtigheid)',
              },
              noData: {
                text: 'Geen data om weer te geven.'
              },
              fill: {
                type: "solid",
                colors: ["#4ECDC4"]
              },
              xaxis: {
                type: "datetime",
                title: {
                  text: "Per datum/uur"
                }
              },
              yaxis: {
                title: {
                  text: "Rh waardes (luchtvochtigheid)"
                }
              }
            };

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

  //genereren luchtvochtigheidsgrafieken
  public updateRh() {
    this.prechartOptionsLuchtvochtigheid.series = [{
      name: "RH waarde (luchtvochtigheid)",
      data: this.rhArray
    }],
      this.prechartOptionsLuchtvochtigheid.title = {
        text: 'Rh waardes (luchtvochtigheid)'
      },
      this.prechartOptionsLuchtvochtigheid.chart = {
        type: 'bar',
        height: 350
      },
      this.prechartOptionsLuchtvochtigheid.fill = {
        type: "solid",
        colors: ["#4ECDC4"]
      },
      this.prechartOptionsLuchtvochtigheid.xaxis = {
        type: "datetime",
        title: {
          text: "Per datum/uur"
        }
      };
    this.prechartOptionsLuchtvochtigheid.yaxis = {
      title: {
        text: "Rh waardes (luchtvochtigheid)"
      }
    }
  }

  public updateLw1() {
    this.prechartOptionsLuchtvochtigheid.series = [{
      name: "LW1 sensor (bladnat)",
      data: this.lw1Array
    }],
      this.prechartOptionsLuchtvochtigheid.title = {
        text: 'LW1 bladnat sensor'
      },
      this.prechartOptionsLuchtvochtigheid.chart = {
        type: 'bar',
        height: 350
      },
      this.prechartOptionsLuchtvochtigheid.fill = {
        type: "gradient",
        gradient: {
          shade: "light",
          gradientToColors: ["#4CAF50"],
          shadeIntensity: 1,
          type: "horizontal",
          opacityFrom: 0.7,
          opacityTo: 1,
          stops: [0, 100, 100, 100]
        }
      },
      this.prechartOptionsLuchtvochtigheid.xaxis = {
        type: "datetime",
        title: {
          text: "Per datum/uur"
        }
      };
    this.prechartOptionsLuchtvochtigheid.yaxis = {
      title: {
        text: "LW1 waarde (bladnat)"
      }
    }
  }

  public updateLw2() {
    this.prechartOptionsLuchtvochtigheid.series = [{
      name: "LW2 sensor (bladnat)",
      data: this.lw2Array
    }],
      this.prechartOptionsLuchtvochtigheid.title = {
        text: 'LW2 bladnat sensor'
      },
      this.prechartOptionsLuchtvochtigheid.chart = {
        type: 'bar',
        height: 350
      },
      this.prechartOptionsLuchtvochtigheid.fill = {
        type: "gradient",
        gradient: {
          shade: "light",
          gradientToColors: ["#4CAF50"],
          shadeIntensity: 1,
          type: "horizontal",
          opacityFrom: 0.7,
          opacityTo: 1,
          stops: [0, 100, 100, 100]
        }
      },
      this.prechartOptionsLuchtvochtigheid.xaxis = {
        type: "datetime",
        title: {
          text: "Per datum/uur"
        }
      };
    this.prechartOptionsLuchtvochtigheid.yaxis = {
      title: {
        text: "LW2 waarde (bladnat)"
      }
    }
  }

}