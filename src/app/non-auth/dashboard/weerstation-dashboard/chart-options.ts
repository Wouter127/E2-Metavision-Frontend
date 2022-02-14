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


export interface preChartOptionsTemperatuur {
    series: ApexAxisChartSeries;
    chart: ApexChart;
    dataLabels: ApexDataLabels;
    title: ApexTitleSubtitle;
    noData: ApexNoData;
    fill: ApexFill;
    xaxis: ApexXAxis;
    yaxis: ApexYAxis;
    colors: string[];
};

export interface preChartOptionsLicht {
    series: ApexAxisChartSeries;
    chart: ApexChart;
    stroke: ApexStroke;
    dataLabels: ApexDataLabels;
    title: ApexTitleSubtitle;
    noData: ApexNoData;
    fill: ApexFill;
    xaxis: ApexXAxis;
    yaxis: ApexYAxis;
};

export interface preChartOptionsBatterij {
    series: ApexAxisChartSeries;
    chart: ApexChart;
    stroke: ApexStroke;
    dataLabels: ApexDataLabels;
    title: ApexTitleSubtitle;
    noData: ApexNoData;
    fill: ApexFill;
    xaxis: ApexXAxis;
    yaxis: ApexYAxis;
};

export interface preChartOptionsLuchtvochtigheid {
    series: ApexAxisChartSeries;
    chart: ApexChart;
    dataLabels: ApexDataLabels;
    title: ApexTitleSubtitle;
    noData: ApexNoData;
    fill: ApexFill;
    xaxis: ApexXAxis;
    yaxis: ApexYAxis;
};

export interface chartOptionsColor {
    series: ApexAxisChartSeries;
    chart: ApexChart;
    stroke: ApexStroke;
    dataLabels: ApexDataLabels;
    colors: string[];
    fill: ApexFill;
    title: ApexTitleSubtitle;
    xaxis: ApexXAxis;
    yaxis: ApexYAxis;
    noData: ApexNoData;
};
