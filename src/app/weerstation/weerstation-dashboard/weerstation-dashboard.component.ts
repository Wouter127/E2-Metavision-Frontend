import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexDataLabels,
  ApexGrid,
  ApexFill,
  ApexStroke,
  ApexXAxis,
  ApexYAxis,
  ApexTitleSubtitle,
  ApexNoData
} from "ng-apexcharts";
import { Weerstation } from 'src/app/interfaces/Weerstation';
import { ChartOptions } from './chart-options';
import { AuthWeerstationService } from 'src/app/services/auth/weerstation.service';


@Component({
  selector: 'app-weerstation-dashboard',
  templateUrl: './weerstation-dashboard.component.html',
  styleUrls: ['./weerstation-dashboard.component.scss']
})
export class WeerstationDashboardComponent implements OnInit {
  @ViewChild("chart") chart!: ChartComponent;
  public chartOptions!: ChartOptions;

  weerstation!:Weerstation;
  weerstation$:Subscription = new Subscription();
  routeParams$:Subscription = new Subscription();

  constructor(private route: ActivatedRoute, private authWeerstationService: AuthWeerstationService) { 
    
    this.routeParams$ = this.route.params.subscribe(
      params => {
        console.log(params['id']);

        this.weerstation$ = this.authWeerstationService.getWeerstationWithMetingen(params['id']).subscribe(
          result => {

            //console.log(result);
            
            this.weerstation = result; 

            //let resultId: number[] = []
            //let resultT1: number[] = []
            //if (result.metings){
            //  for (var meting of result.metings) {
            //    resultId.push(meting.id)
                //resultT1.push(meting.t1)
            //  } 
            //}

            //console.log(resultId);
            
            
            this.chartOptions = {
              series: [
                {
                  name: "My-series",
                  data: [10, 41, 35, 51, 49, 62, 69, 91, 148]
                  //data: resultT1
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
                    text: 'Per meting'
                },
                //categories: resultId
                categories: ["Jan", "Feb",  "Mar",  "Apr",  "May",  "Jun",  "Jul",  "Aug", "Sep"]
              },
              yaxis: {
                title: {
                    text: 'T1 sensorwaardes'
                }
              },
              noData: {
                text: 'Aan het laden...'
              }
            };
          }
        )
      }
    )
  }

  ngOnInit(): void {

  }

}
