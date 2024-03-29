import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ChartComponent } from 'ng-apexcharts';
import { Subscription } from 'rxjs';
import { Meting } from 'src/app/interfaces/Meting';
import { Weerstation } from 'src/app/interfaces/Weerstation';
import { WeerstationService } from 'src/app/services/weerstation.service';
import { chartOptionsColor } from './chart-options';
import { HotToastService } from '@ngneat/hot-toast';

@Component({
  selector: 'app-weerstation-dashboard',
  templateUrl: './weerstation-dashboard.component.html',
  styleUrls: ['./weerstation-dashboard.component.scss']
})

export class WeerstationDashboardComponent implements OnInit {
  @ViewChild('chart', { static: false }) chart: ChartComponent = new ChartComponent();

  loading: boolean = true

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
      width: 2,
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
      text: 'Geen data om weer te geven.'
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
      width: 2,
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
      text: 'Geen data om weer te geven.'
    }
  };
  public chartOptionsLuchtvochtigheid: chartOptionsColor = {
    series: [
      {
        name: "RH waardes (luchtvochtigheid)",
        data: []
      }
    ],
    chart: {
      type: "bar",
      height: 350,
      zoom: {
        enabled: true
      }
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      width: 2
    },
    colors: ['#662E9B'],
    fill: {
      type: "gradient",
      gradient: {
        shade: "dark",
        gradientToColors: ["#662E9B"],
        shadeIntensity: 1,
        type: "horizontal",
        opacityFrom: 0.9,
        opacityTo: 1,
        stops: [0, 100, 100, 100]
      }
    },
    title: {
      text: "RH waardes (luchtvochtigheid)"
    },
    xaxis: {
      type: "datetime",
      title: {
        text: 'Per datum/uur'
      }
    },
    yaxis: {
      title: {
        text: 'RH waarde (luchtvochtigheid)'
      }
    },
    noData: {
      text: 'Geen data om weer te geven.'
    }
  };
  public chartOptionsBatterijPercentage: chartOptionsColor = {
    series: [
      {
        name: "Batterijpercentage (%)",
        data: []
      }
    ],
    chart: {
      type: "area",
      height: 350,
      zoom: {
        enabled: true
      }
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      width: 2,
      curve: "smooth"
    },
    colors: ['#13D8AA'],
    fill: {
      type: "gradient",
      gradient: {
        shade: "dark",
        gradientToColors: ["#A300D6"],
        shadeIntensity: 1,
        type: "horizontal",
        opacityFrom: 0.9,
        opacityTo: 0.7,
        stops: [0, 100, 100]
      }
    },

    title: {
      text: "Batterijpercentage"
    },
    xaxis: {
      type: "datetime",
      title: {
        text: 'Per datum/uur'
      }
    },
    yaxis: {
      title: {
        text: 'Batterijpercentage (%)'
      },
      min: 0,
      max: 100
    },
    noData: {
      text: 'Geen data om weer te geven.'
    }
  };

  //temperatuur
  tempArray: { y: number; x: Date }[] = [];
  temp2Array: { y: number; x: Date }[] = [];
  //luchtvochtigheid
  rhArray: { y: number; x: Date }[] = [];
  //batterijwaardes
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
    this.begin = this.beginDate.toISOString().split('T')[0];
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
    //array luchtvochtigheid
    this.rhArray = [];
    //array batterij
    this.bapArray = [];
    
    this.routeParams$ = this.route.params.subscribe(
      params => {
        this.weerstation$ = this.authWeerstationService.getDataBetweenDates(params['id'], begin, eind).subscribe(
          (result: Weerstation) => {
            this.weerstation = result;

            result.metings?.forEach((meting: Meting) => {
              //temperatuur
              let temperatuur1 = Math.round(meting.t1 * 100) / 100;
              let temperatuur2 = Math.round(meting.t2 * 100) / 100;
              //time
              let date = meting.time;
              //luchtvochtigheid
              let rh = Math.round(meting.rf * 100) / 100;
              //batterijpercentage
              let bap = Math.round(meting.bap);

              //object temperatuur
              let dataObject = { x: date, y: temperatuur1 };
              let dataObject2 = { x: date, y: temperatuur2 };
              //object luchtvochtigheid
              let rhObject = { x: date, y: rh };
              //object batterij
              let bapObject = { x: date, y: bap };

              //array temperatuur
              this.tempArray.push(dataObject);
              this.temp2Array.push(dataObject2);
              //array luchtvochtigheid
              this.rhArray.push(rhObject);
              //array batterij
              this.bapArray.push(bapObject);
            });


            // Update charts
            this.chartOptionsT1.series = [{
              name: 'T1 sensor (buitentemperatuur)',
              data: this.tempArray
            }];
            this.chartOptionsT1.noData = {
              text: 'Geen data om weer te geven.'
            }
            
            this.chartOptionsT2.series = [{
              name: 'T2 sensor (binnen de isolatie)',
              data: this.temp2Array
            }];
            this.chartOptionsT2.noData = {
              text: 'Geen data om weer te geven.'
            }

            this.chartOptionsLuchtvochtigheid.series = [{
              name: 'RH waardes (luchtvochtigheid)',
              data: this.rhArray
            }];
            this.chartOptionsT2.noData = {
              text: 'Geen data om weer te geven.'
            }

            this.chartOptionsBatterijPercentage.series = [{
              name: 'Batterijpercentage (%)',
              data: this.bapArray
            }];
            this.chartOptionsBatterijPercentage.noData = {
              text: 'Geen data om weer te geven.'
            }
            this.chartOptionsBatterijPercentage.yaxis = {
              min: 0,
              max: 100,
              forceNiceScale: false,
              tickAmount: 4
            }

            this.loading = false

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

}