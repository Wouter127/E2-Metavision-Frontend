import {
    ChartComponent,
    ApexAxisChartSeries,
    ApexChart,
    ApexDataLabels,
    ApexXAxis,
    ApexYAxis,
    ApexTitleSubtitle,
    ApexNoData,
    ApexStroke,
    ApexFill
  } from "ng-apexcharts";
  
export interface ChartOptions {
    series: ApexAxisChartSeries;
    chart: ApexChart;
    dataLabels: ApexDataLabels;
    fill: ApexFill;
    xaxis: ApexXAxis;
    yaxis: ApexYAxis;
    stroke: ApexStroke;
    title: ApexTitleSubtitle;
    noData: ApexNoData;
};