import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ChartComponent } from 'ng-apexcharts';
import { Subscription } from 'rxjs';
import { Meting } from 'src/app/interfaces/Meting';
import { Weerstation } from 'src/app/interfaces/Weerstation';
import { WeerstationService } from 'src/app/services/weerstation.service';
import { preChartOptionsTemperatuur, preChartOptionsLicht, preChartOptionsBatterij, preChartOptionsLuchtvochtigheid, chartOptionsColor } from './chart-options';
import { WeerstationDashboardLocationComponent } from '../weerstation-dashboard-location/weerstation-dashboard-location.component';
import { HotToastService } from '@ngneat/hot-toast';

@Component({
  selector: 'app-weerstation-dashboard',
  templateUrl: './weerstation-dashboard.component.html',
  styleUrls: ['./weerstation-dashboard.component.scss']
})

export class WeerstationDashboardComponent implements OnInit {
  @ViewChild('chart', { static: false }) chart: ChartComponent = new ChartComponent();
  public prechartOptionsTemperatuur!: preChartOptionsTemperatuur;
  public prechartOptionsLicht!: preChartOptionsLicht;
  public prechartOptionsBatterij!: preChartOptionsBatterij;
  public prechartOptionsLuchtvochtigheid!: preChartOptionsLuchtvochtigheid;

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
      width: 6
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
      text: 'Laden...'
    }
  };
  public chartOptionsBatterijPercentage: chartOptionsColor = {
    series: [
      {
        name: "Batterijpercentage",
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
      width: 3,
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
        text: 'Batterijpercentage'
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
  //lichtwaardes
  IrlArray: { y: number; x: Date }[] = [];
  VilArray: { y: number; x: Date }[] = [];
  LuxArray: { y: number; x: Date }[] = [];
  //luchtvochtigheid
  rhArray: { y: number; x: Date }[] = [];
  lw1Array: { y: boolean; x: Date }[] = [];
  lw2Array: { y: boolean; x: Date }[] = [];
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
    // Empty the arrays
    this.tempArray = [];
    this.temp2Array = [];
    this.temp3Array = [];
    //array licht
    this.IrlArray = [];
    this.VilArray = [];
    this.LuxArray = [];
    //array luchtvochtigheid
    this.rhArray = [];
    this.lw1Array = [];
    this.lw2Array = [];
    //array batterij
    this.bavArray = [];
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
              let bavObject = { x: date, y: bav };
              let bapObject = { x: date, y: bap };

              //array temperatuur
              this.tempArray.push(dataObject);
              this.temp2Array.push(dataObject2);
              this.temp3Array.push(dataObject3);
              //array licht
              this.IrlArray.push(irlObject);
              this.VilArray.push(vilObject);
              this.LuxArray.push(luxObject);
              //array luchtvochtigheid
              this.rhArray.push(rhObject);
              this.lw1Array.push(lw1Object);
              this.lw2Array.push(lw2Object);
              //array batterij
              this.bavArray.push(bavObject);
              this.bapArray.push(bapObject);
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

            this.prechartOptionsLicht = {
              series: [],
              chart: {
                height: 350,
                type: 'line'
              },
              dataLabels: {
                enabled: false
              },
              title: {
                text: 'Graph generator licht sensoren',
              },
              noData: {
                text: 'Selecteer een categorie om jouw grafiek te genereren'
              },
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
                  text: "Metingen licht"
                }
              }
            };

            this.prechartOptionsBatterij = {
              series: [],
              chart: {
                height: 350,
                type: 'line'
              },
              dataLabels: {
                enabled: false
              },
              title: {
                text: 'Graph generator batterij metingen',
              },
              noData: {
                text: 'Selecteer een categorie om jouw grafiek te genereren'
              },
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
                  text: "Batterij metingen"
                }
              }
            };

            this.prechartOptionsLuchtvochtigheid = {
              series: [],
              chart: {
                height: 350,
                type: 'line'
              },
              dataLabels: {
                enabled: false
              },
              title: {
                text: 'Graph generator vochtigheid sensoren',
              },
              noData: {
                text: 'Selecteer een categorie om jouw grafiek te genereren'
              },
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
                  text: "Metingen vochtigheid"
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

            this.chartOptionsLuchtvochtigheid.series = [{
              data: this.rhArray
            }];
            this.chartOptionsT2.noData = {
              text: 'Geen data om weer te geven.'
            }

            this.chartOptionsBatterijPercentage.series = [{
              data: this.bapArray
            }];
            this.chartOptionsBatterijPercentage.noData = {
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
          text: "Per meting"
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
        text: "Batterij percentage (%)"
      }
    }
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
          text: "Per meting"
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