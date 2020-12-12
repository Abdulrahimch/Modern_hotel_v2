import { Component, OnInit, ViewChild } from '@angular/core';
import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexDataLabels,
  ApexTooltip,
  ApexYAxis,
  ApexPlotOptions,
  ApexResponsive,
  ApexStroke,
  ApexLegend,
  ApexTitleSubtitle,
  ApexFill
} from 'ng-apexcharts';
import { EChartOption } from 'echarts';

export type SparklineChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  markers: any; //ApexMarkers;
  stroke: any; //ApexStroke;
  yaxis: ApexYAxis | ApexYAxis[];
  plotOptions: ApexPlotOptions;
  dataLabels: ApexDataLabels;
  colors: string[];
  labels: string[] | number[];
  title: ApexTitleSubtitle;
  subtitle: ApexTitleSubtitle;
  legend: ApexLegend;
  fill: ApexFill;
  tooltip: ApexTooltip;
};

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  @ViewChild('chart') chart: ChartComponent;
  public commonBarSparklineOptions: Partial<SparklineChartOptions> = {
    chart: {
      type: "bar",
      width: 100,
      height: 25,
      sparkline: {
        enabled: true
      }
    },
    plotOptions: {
      bar: {
        columnWidth: "40%"
      }
    },
    series: [
      {
        name: "income",
        data: [31, 40, 28, 44, 60, 55, 68, 51, 42, 85, 77]
      }
    ],
    tooltip: {
      fixed: {
        enabled: false
      },
      x: {
        show: false
      },
      y: {
      },
      marker: {
        show: false
      }
    }
  };
  constructor() {

  }

  public chartAreaOptions = {
    xkey: 'w',
    ykeys: ['x', 'y', 'z'],
    labels: ['delux', 'super delux', 'vila'],
    pointSize: 0,
    lineWidth: 2,
    resize: true,
    fillOpacity: 0.8,
    behaveLikeLine: true,
    gridLineColor: '#e0e0e0',
    hideHover: 'auto',
    lineColors: ['#9e9e9e', '#cd99d6', '#7ee4f1'],
  };
  public chartAreaData = [
    { w: '2019 Q1', x: 2, y: 0, z: 0 },
    { w: '2019 Q2', x: 50, y: 15, z: 5 },
    { w: '2019 Q3', x: 15, y: 50, z: 23 },
    { w: '2019 Q4', x: 45, y: 12, z: 7 },
    { w: '2019 Q5', x: 20, y: 32, z: 55 },
    { w: '2019 Q6', x: 39, y: 67, z: 20 },
    { w: '2019 Q7', x: 20, y: 9, z: 5 },
  ];

  donut_chart: EChartOption = {
    tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b} : {c} ({d}%)'
    },
    legend: {
      show: false,
      data: [
        'Single',
        'Double',
        'King',
        'Executive Suite',
        'Apartments'
      ],
      textStyle: {
        color: '#9aa0ac',
        padding: [5, 10],
      }
    },
    toolbox: {
      show: false,
    },
    series: [
      {
        name: 'Access to the resource',
        type: 'pie',
        radius: ['35%', '55%'],
        itemStyle: {
          normal: {
            label: {
              show: !0
            },
            labelLine: {
              show: !0
            }
          },
          emphasis: {
            label: {
              show: !0,
              position: 'center',
              textStyle: {
                fontSize: '14',
                fontWeight: 'normal'
              }
            }
          }
        },
        data: [
          {
            value: 734,
            name: 'Single'
          },
          {
            value: 567,
            name: 'Double'
          },
          {
            value: 464,
            name: 'King'
          },
          {
            value: 364,
            name: 'Executive Suite'
          },
          {
            value: 323,
            name: 'Apartments'
          }
        ]
      }
    ],
    color: ['#3CDBC2', '#FF2742', '#235A66', '#FFAB2F', '#86AEAC']
  };


  ngOnInit() {
  }
}
