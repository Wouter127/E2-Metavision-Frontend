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

export interface chartOptionsT1 {
    series: ApexAxisChartSeries;
    chart: ApexChart;
    dataLabels: ApexDataLabels;
    fill: ApexFill;
    xaxis: ApexXAxis;
    yaxis: ApexYAxis;
    stroke: ApexStroke;
    title: ApexTitleSubtitle;
    colors: string[];
};

export interface chartOptionsT2 {
    series: ApexAxisChartSeries;
    chart: ApexChart;
    xaxis: ApexXAxis;
    stroke: ApexStroke | undefined;
    dataLabels: ApexDataLabels;
    yaxis: ApexYAxis;
    title: ApexTitleSubtitle;
    colors: string[];
};


export interface chartOptionsLuchtvochtigheid {
    series: ApexAxisChartSeries;
    chart: ApexChart;
    xaxis: ApexXAxis;
    stroke: ApexStroke | undefined;
    dataLabels: ApexDataLabels;
    yaxis: ApexYAxis;
    title: ApexTitleSubtitle;
    colors: string[];
};


export interface chartOptionsBatterijPercentage {
    series: ApexAxisChartSeries;
    chart: ApexChart;
    xaxis: ApexXAxis;
    stroke: ApexStroke | undefined;
    dataLabels: ApexDataLabels;
    yaxis: ApexYAxis;
    title: ApexTitleSubtitle;
    colors: string[];
};








