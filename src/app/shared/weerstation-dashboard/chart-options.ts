import {
    ChartComponent,
    ApexAxisChartSeries,
    ApexChart,
    ApexDataLabels,
    ApexXAxis,
    ApexYAxis,
    ApexTitleSubtitle,
    ApexPlotOptions,
    ApexNoData,
    ApexStroke,
    ApexFill,
    ApexLegend
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
};

export interface preChartOptions {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  title: ApexTitleSubtitle;
  noData: ApexNoData;
  fill: ApexFill;
  xaxis: ApexXAxis;
  yaxis: ApexYAxis;
};

export interface ChartOptions2 {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  stroke: ApexStroke | undefined;
  dataLabels: ApexDataLabels;
  yaxis: ApexYAxis;
  title: ApexTitleSubtitle;
};


