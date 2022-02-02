import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ChartComponent } from 'ng-apexcharts';
import { Subscription } from 'rxjs';
import { Meting } from 'src/app/interfaces/Meting';
import { Weerstation } from 'src/app/interfaces/Weerstation';
import { WeerstationService } from 'src/app/services/weerstation.service';
import { preChartOptionsTemperatuur, chartOptionsColor } from '../weerstation-dashboard/chart-options';
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


  public chartOptionsT1: chartOptionsColor = {
    series: [
      {
        name: "T1 sensor (buitentemperatuur)",
        data: []
      }
    ],
    chart: {
      height: 350,
      type: "line"
    },
    stroke: {
      width: 5,
      curve: "smooth"
    },
    dataLabels: {
      enabled: false
    },
    colors: ['#4CAF50'],
    fill: {
      type: "gradient",
      gradient: {
        shade: "dark",
        gradientToColors: ["#FDD835"],
        shadeIntensity: 1,
        type: "horizontal",
        opacityFrom: 1,
        opacityTo: 1,
        stops: [0, 100, 100, 100]
      }
    },
    title: {
      text: "T1 sensor metingen (buiten)"
    },
    xaxis: {
      type: 'datetime',
      title: {
        text: 'Per datum/uur'
      }
    },
    yaxis: {
      title: {
        text: 'T1 sensorwaardes'
      }
    },
    noData: {
      text: 'Laden...'
    }
  }
  public chartOptionsT2: chartOptionsColor = {
    series: [
      {
        name: "T2 sensor (binnen de isolatie)",
        data: []
      }
    ],
    chart: {
      type: "line",
      height: 350,
      zoom: {
        enabled: true
      }
    },
    stroke: {
      width: 5,
      curve: "smooth"
    },
    dataLabels: {
      enabled: false
    },
    colors: ['#4CAF50'],
    title: {
      text: "T2 sensor metingen (binnen de isolatie)"
    },
    fill: {
      type: "gradient",
      gradient: {
        shade: "dark",
        gradientToColors: ["#F86624"],
        shadeIntensity: 1,
        type: "horizontal",
        opacityFrom: 0.9,
        opacityTo: 1,
        stops: [0, 100, 100, 100]
      }
    },
    xaxis: {
      type: "datetime",
      title: {
        text: 'Per datum/uur'
      }
    },
    yaxis: {
      title: {
        text: 'Batterij percentage'
      }
    },
    noData: {
      text: 'Laden...'
    }
  };
  
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
              series: [],
              chart: {
                height: 350,
                type: 'line'
              },
              dataLabels: {
                enabled: false
              },
              title: {
                text: 'Graph generator temperatuur sensoren',
              },
              noData: {
                text: 'Selecteer een categorie om jouw grafiek te genereren'
              },
              colors: ['#FFFFFF'],
              fill: {
                type: "solid",
                colors: ['#FFFFFF']
              },
              xaxis: {
                title: {
                  text: "Per datum/uur"
                }
              },
              yaxis: {
                title: {
                  text: "Metingen temperatuur"
                }
              }
            };

            this.chartOptionsT1.series = [{
              data: this.tempArray
            }];
            this.chartOptionsT1.noData = {
              text: 'Geen data om weer te geven.'
            }
            
            this.chartOptionsT2.series = [{
              data: this.temp2Array
            }];
            this.chartOptionsT2.noData = {
              text: 'Geen data om weer te geven.'
            }

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
          text: "Per meting"
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