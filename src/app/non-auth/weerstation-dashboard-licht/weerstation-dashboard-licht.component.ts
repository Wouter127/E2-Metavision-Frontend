import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ChartComponent } from 'ng-apexcharts';
import { Subscription } from 'rxjs';
import { Meting } from 'src/app/interfaces/Meting';
import { Weerstation } from 'src/app/interfaces/Weerstation';
import { WeerstationService } from 'src/app/services/weerstation.service';
import { preChartOptionsLicht } from '../weerstation-dashboard/chart-options';
import { WeerstationDashboardLocationComponent } from '../weerstation-dashboard-location/weerstation-dashboard-location.component';
import { HotToastService } from '@ngneat/hot-toast';

@Component({
  selector: 'app-weerstation-dashboard-licht',
  templateUrl: './weerstation-dashboard-licht.component.html',
  styleUrls: ['./weerstation-dashboard-licht.component.scss']
})
export class WeerstationDashboardLichtComponent implements OnInit {
  @ViewChild('chart', { static: false }) chart: ChartComponent = new ChartComponent();
  @ViewChild(WeerstationDashboardLocationComponent, { static: true }) weerstationdashboardlocationComponent!: WeerstationDashboardLocationComponent;
  public prechartOptionsLicht!: preChartOptionsLicht;

  //lichtwaardes
  IrlArray: { y: number; x: Date }[] = [];
  VilArray: { y: number; x: Date }[] = [];
  LuxArray: { y: number; x: Date }[] = [];
 
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
    //array licht
    this.IrlArray = [];
    this.VilArray = [];
    this.LuxArray = [];
    
    this.routeParams$ = this.route.params.subscribe(
      params => {
        this.weerstation$ = this.authWeerstationService.getDataBetweenDates(params['id'], begin, eind).subscribe(
          (result: Weerstation) => {
            this.weerstation = result;

            result.metings?.forEach((meting: Meting) => {
              //licht
              let Irl = Math.round(meting.irl * 100) / 100;
              let Vil = Math.round(meting.vil * 100) / 100;
              let Lux = Math.round(meting.lux * 100) / 100;
              //time
              let date = meting.time;

              //object licht
              let irlObject = { x: date, y: Irl };
              let vilObject = { x: date, y: Vil };
              let luxObject = { x: date, y: Lux };

              //array licht
              this.IrlArray.push(irlObject);
              this.VilArray.push(vilObject);
              this.LuxArray.push(luxObject);
            });


            // Update charts
            this.prechartOptionsLicht = {
              series: [{
                name: "Infrarood licht",
                data: this.IrlArray
              }],
              chart: {
                height: 350,
                type: 'area'
              },
              dataLabels: {
                enabled: false
              },
              title: {
                text: 'Infrarood licht',
              },
              noData: {
                text: 'Geen data om weer te geven.'
              },
              fill: {
                type: "solid",
                colors: ["#F00"],
                opacity: 0.5
              },
              xaxis: {
                type: "datetime",
                title: {
                  text: "Per datum/uur"
                }
              },
              yaxis: {
                title: {
                  text: "Metingen licht"
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

  //genereren lichtgrafieken
  public updateInfraroodlicht() {
    this.prechartOptionsLicht.series = [{
      name: "Infrarood licht",
      data: this.IrlArray
    }],
      this.prechartOptionsLicht.title = {
        text: 'Infrarood licht'
      },
      this.prechartOptionsLicht.chart = {
        type: 'area',
        height: 350
      },
      this.prechartOptionsLicht.fill = {
        type: "solid",
        colors: ["#F00"],
        opacity: 0.5
      },
      this.prechartOptionsLicht.xaxis = {
        type: "datetime",
        title: {
          text: "Per datum/uur"
        }
      };
    this.prechartOptionsLicht.yaxis = {
      title: {
        text: "Infrarood licht"
      }
    }
  }

  public updateVisueellicht() {
    this.prechartOptionsLicht.series = [{
      name: "Visueel licht",
      data: this.VilArray
    }],
      this.prechartOptionsLicht.title = {
        text: 'Visueel licht'
      },
      this.prechartOptionsLicht.chart = {
        type: 'area',
        height: 350
      },
      this.prechartOptionsLicht.fill = {
        type: "solid",
        colors: ["#C5D86D"],
        opacity: 0.7
      },
      this.prechartOptionsLicht.xaxis = {
        type: "datetime",
        title: {
          text: "Per datum/uur"
        }
      };
    this.prechartOptionsLicht.yaxis = {
      title: {
        text: "Visueel licht"
      }
    }
  }

  public updateLuxwaardes() {
    this.prechartOptionsLicht.series = [{
      name: "Lux waarde",
      data: this.LuxArray
    }],
      this.prechartOptionsLicht.title = {
        text: 'Lux waardes'
      },
      this.prechartOptionsLicht.chart = {
        type: 'area',
        height: 350
      },
      this.prechartOptionsLicht.fill = {
        type: "gradient",
        gradient: {
          shade: "dark",
          gradientToColors: ["#4CAF50"],
          shadeIntensity: 1,
          type: "horizontal",
          opacityFrom: 0.7,
          opacityTo: 1,
          stops: [0, 100, 100, 100]
        }
      },
      this.prechartOptionsLicht.xaxis = {
        type: "datetime",
        title: {
          text: "Per datum/uur"
        }
      };
    this.prechartOptionsLicht.yaxis = {
      title: {
        text: "Lux waardes"
      }
    }
  }

}