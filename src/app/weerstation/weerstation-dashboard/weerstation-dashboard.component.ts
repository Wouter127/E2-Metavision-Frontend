import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

import {
  ChartComponent,
} from "ng-apexcharts";
import { Weerstation } from 'src/app/interfaces/Weerstation';
import { ChartOptions, preChartOptions, ChartOptions2 } from './chart-options';
import { AuthWeerstationService } from 'src/app/services/auth/weerstation.service';
import { Meting } from 'src/app/interfaces/Meting';


@Component({
  selector: 'app-weerstation-dashboard',
  templateUrl: './weerstation-dashboard.component.html',
  styleUrls: ['./weerstation-dashboard.component.scss']
})
export class WeerstationDashboardComponent implements OnInit {
  @ViewChild('chart', { static: false}) chart: ChartComponent = 
      new ChartComponent();
  public chartOptions!: ChartOptions;
  public prechartOptions!: preChartOptions;
  public chartOptions2: any = {} 

  graphLoaded: boolean = false;

  begin: string | string = "2022-01-14";
  eind: string | string = "2022-01-14";

  
  // public updateInfraroodlicht() {
  //   this.prechartOptions.series = [{
  //       data: [150, 111, 85, 22, 47, 66, 94, 121, 12]
  //   }],
  //   this.prechartOptions.title = {
  //       text: 'Infrarood licht'
  //   },
  //   this.prechartOptions.chart = {
  //       type: 'bar'
  //   },
  //   this.prechartOptions.fill = {
  //       type: "gradient",
  //       gradient: {
  //         shade: "dark",
  //         gradientToColors: ["#F00"],
  //         shadeIntensity: 1,
  //         type: "horizontal",
  //         opacityFrom: 1,
  //         opacityTo: 1,
  //         stops: [0, 100, 100, 100]
  //       }
  //   },
  //   this.prechartOptions.xaxis = {
  //     title: {
  //       text: "Per meting"
  //     }
  //   };
  //   this.prechartOptions.yaxis = {
  //     title: {
  //       text: "Infrarood licht"
  //     }
  //   }
  // }

  public updateVisueellicht() {
    this.prechartOptions.series = [{
        data: [30, 55, 88, 99, 42, 10, 140, 100, 75]
    }],
    this.prechartOptions.title = {
        text: 'Visueel licht'
    },
    this.prechartOptions.chart = {
        type: 'area'
    },
    this.prechartOptions.fill = {
        type: "gradient",
        gradient: {
          shade: "dark",
          gradientToColors: ["#354a40"],
          shadeIntensity: 1,
          type: "horizontal",
          opacityFrom: 1,
          opacityTo: 1,
          stops: [0, 100, 100, 100]
        }
    },
    this.prechartOptions.xaxis = {
      title: {
        text: "Per meting"
      }
    };
    this.prechartOptions.yaxis = {
      title: {
        text: "Visueel licht"
      }
    }
  }

  public updateLuxwaardes() {
    this.prechartOptions.series = [{
        data: [150, 111, 85, 22, 47, 66, 94, 121, 12]
    }],
    this.prechartOptions.title = {
        text: 'Lux waardes'
    },
    this.prechartOptions.chart = {
        type: 'area'
    },
    this.prechartOptions.fill = {
        type: "gradient",
        gradient: {
          shade: "dark",
          gradientToColors: [""],
          shadeIntensity: 1,
          type: "horizontal",
          opacityFrom: 1,
          opacityTo: 1,
          stops: [0, 100, 100, 100]
        }
    },
    this.prechartOptions.xaxis = {
      title: {
        text: "Per meting"
      }
    };
    this.prechartOptions.yaxis = {
      title: {
        text: "Infrarood licht"
      }
    }
  }
    
    

  weerstation!:Weerstation;
  weerstation$:Subscription = new Subscription();
  routeParams$:Subscription = new Subscription();

  constructor(private route: ActivatedRoute, private authWeerstationService: AuthWeerstationService) { 
    
    //temperatuur
    let tempArray: { y: number; x: Date }[] = [];
    let temp2Array: { y: number; x: Date }[] = [];
    let temp3Array: { y: number; x: Date }[] = [];
    //lichtwaardes
    let IrlArray: { y: number; x: Date }[] = [];
    let VilArray: { y: number; x: Date }[] = [];
    let LuxArray: { y: number; x: Date }[] = [];
    //luchtvochtigheid
    let rhArray: { y: number; x: Date }[] = [];
    let lw1Array: { y: boolean; x: Date }[] = [];
    let lw2Array: { y: boolean; x: Date }[] = [];
    //batterijwaardes
    let bavArray: { y: number; x: Date }[] = [];
    let bapArray: { y: number; x: Date }[] = [];

    this.authWeerstationService
      .getDataBetweenDates(2, this.begin, this.eind)
      .subscribe((result: Weerstation) => {
          console.log("test" + result);

          //Array.from(result).forEach((meting: Metingen) => {
          result.metings?.forEach((meting: Meting) => {
            
          console.log("data ingeladen")
          

          //temperatuur
          let temperatuur1 = Math.round(meting.t1 * 100) / 100;
          let temperatuur2 = Math.round(meting.t2 * 100) / 100;
          let temperatuur3 = Math.round(meting.t3 * 100) / 100;
          //licht
          let Irl = Math.round(meting.irl * 100) / 100;
          let Vil = Math.round(meting.vil * 100) / 100;
          let Lux = Math.round(meting.lux * 100) / 100;
          //time
          let date = meting.time;
          //luchtvochtigheid
          let rh = Math.round(meting.rf * 100) / 100;
          let lw1 = meting.lw1;
          let lw2 = meting.lw2;
          //batterijpercentage
          let bav = Math.round(meting.bav);
          let bap = Math.round(meting.bap);

          //object temperatuur
          let dataObject = { x: date, y: temperatuur1 };
          let dataObject2 = { x: date, y: temperatuur2 };
          let dataObject3 = { x: date, y: temperatuur3 };
          //object licht
          let irlObject = { x: date, y: Irl };
          let vilObject = { x: date, y: Vil };
          let luxObject = { x: date, y: Lux };
          //object luchtvochtigheid
          let rhObject = { x: date, y: rh };
          let lw1Object = { x: date, y: lw1 };
          let lw2Object = { x: date, y: lw2 };
          //object batterij
          let bavObject = { x:date, y: bav };
          let bapObject = { x:date, y: bap };

          //array temperatuur
          tempArray.push(dataObject);
          temp2Array.push(dataObject2);
          temp3Array.push(dataObject3);
          //array licht
          IrlArray.push(irlObject);
          VilArray.push(vilObject);
          LuxArray.push(luxObject);
          //array luchtvochtigheid
          rhArray.push(rhObject);
          lw1Array.push(lw1Object);
          lw2Array.push(lw2Object);
          //array batterij
          bavArray.push(bavObject);
          bapArray.push(bapObject);
        })
      });
  
    this.graphLoaded = true;

    this.routeParams$ = this.route.params.subscribe(
      params => {
        console.log(params['id']);

        this.weerstation$ = this.authWeerstationService.getWeerstationWithMetingen(params['id'],this.begin,this.eind).subscribe(
          result => {

            this.weerstation = result; 

            console.log(result);
            console.log(tempArray);
            
            this.prechartOptions = {
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
              fill: {
                type: "solid",
              },
              xaxis: {
                title: {
                  text: "Metingen"
                }
              },
              yaxis: {
                title: {
                  text: "Soort licht"
                }
              }
            };

            this.chartOptions = {
              series: [
                {
                  name: "T1",
                  //data: [10, 41, 35, 51, 49, 62, 69, 91, 148]
                  data: tempArray
                }
              ],
              chart: {
                height: 350,
                type: "line"
              },
              stroke: {
                width: 7,
                curve: "smooth"
              },
              dataLabels: {
                enabled: false
              },
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
                text: result.naam
              },
              xaxis: {
                type: 'category',
                title: {
                    text: 'Per datum/uur'
                },
                //categories: resultId
                categories: this.eind
              },
              yaxis: {
                title: {
                    text: 'T1 sensorwaardes'
                }
              }
            };

            this.chartOptions2 = {
              series: [
                {
                  name: "Batterij percentage",
                  data:  bapArray
                }
              ],
              chart: {
                type: "area",
                height: 350,
                zoom: {
                  enabled: false
                }
              },
              dataLabels: {
                enabled: false
              },
              stroke: {
                curve: "smooth"
              },
        
              title: {
                text: result.naam
              },
              xaxis: {
                type: "datetime",
                categories: this.eind,
                title: {
                  text: 'Per datum/uur'
              }
              },
              yaxis: {
                title: {
                  text: 'Batterij percentage'
              }
              }
            };


          }
        )
      }
    )
  }


  ngOnInit(): void {

  }

  
  public updateInfraroodlicht() {
    this.prechartOptions.series = [{
        data: [150, 111, 85, 22, 47, 66, 94, 121, 12]
    }],
    this.prechartOptions.title = {
        text: 'Infrarood licht'
    },
    this.prechartOptions.chart = {
        type: 'bar'
    },
    this.prechartOptions.fill = {
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
    this.prechartOptions.xaxis = {
      title: {
        text: "Per meting"
      }
    };
    this.prechartOptions.yaxis = {
      title: {
        text: "Infrarood licht"
      }
    }
  }

}
