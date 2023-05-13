import { Component, OnInit, ViewChild } from '@angular/core';
import { ContainerService } from './container.service';
import { Container, ResponseBody, ResponseBodyObjeto } from './model/container';
import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexTitleSubtitle,
  ApexNonAxisChartSeries,
  ApexResponsive,
} from 'ng-apexcharts';

export type ChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  responsive: ApexResponsive[];
  labels: any;
};

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'test-charts-homecenter';
  @ViewChild('chart', { static: false }) chart!: ChartComponent | any;
  chartOptions!: Partial<ChartOptions>;
  chartOptions2!: Partial<ChartOptions>;
  chartOptions3!: Partial<ChartOptions>;
  containerList: ResponseBodyObjeto[] | any;
  filteredInProcess: ResponseBodyObjeto[] | any;
  filteredRecount: ResponseBodyObjeto[] | any;
  filteredToStart: ResponseBodyObjeto[] | any;
  inProcess: string = 'EN PROCESO';
  recount: string = 'RECONTEO';
  toStart: string = 'POR INICIAR';
  serieInProcess: Array<number> = [];
  serieInRecount: Array<number> = [];
  serieToStart: Array<number> = [];
  countInProcess: number = 0;
  countInRecount: number = 0;
  countToStart: number = 0;
  total: number = 0;

  constructor(private containerService: ContainerService) {
    let responsiveOptions = [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 200,
          },
          legend: {
            position: 'bottom',
          },
        },
      },
    ];

    // GRAFICA 1
    this.chartOptions = {
      series: [],
      chart: {
        type: 'donut',
      },
      // labels: ["Team A", "Team B", "Team C", "Team D", "Team E"],
      responsive: responsiveOptions,
    };

    // GRAFICA 2
    this.chartOptions2 = {
      series: [],
      chart: {
        type: 'donut',
      },
      responsive: responsiveOptions,
    };

    // GRAFICA 3
    this.chartOptions3 = {
      series: [],
      chart: {
        type: 'donut',
      },
      // labels: ["Team A", "Team B", "Team C", "Team D", "Team E"],
      responsive: responsiveOptions,
    };
  }

  ngOnInit(): void {
    this.getContainerDestination();
  }
  //  funcion para obtener los contenedores de destinos
  getContainerDestination() {
    // consumir servicio que obtiene el json
    this.containerService.getJSON().subscribe((data) => {
      let bodylist: ResponseBody = JSON.parse(data.response[0].body);
      console.log('body', bodylist);
      this.containerList = bodylist.Objeto;
      this.filteredContainerByStates(this.containerList);
    });
  }

  // funcion para filtrar los contenedores por estados, obtener las series de las graficas y totalizadores
  filteredContainerByStates(containerList: ResponseBodyObjeto[]) {
    // filtrar por estado
    this.filteredInProcess = containerList.filter(
      (item) => item.Estado === this.inProcess
    );
    this.filteredRecount = containerList.filter(
      (item) => item.Estado === this.recount
    );
    this.filteredToStart = containerList.filter(
      (item) => item.Estado === this.toStart
    );

    // obtener la serie de datos para graficar el estado en proceso
    this.serieInProcess = this.filteredInProcess.map(
      (item: ResponseBodyObjeto) => {
        return item.Id_Contenedor_Trasvaciado;
      }
    );

    // obtener la serie de datos para graficar el estado recuento
    this.serieInRecount = this.filteredRecount.map(
      (item: ResponseBodyObjeto) => {
        return item.Id_Contenedor_Trasvaciado;
      }
    );

    // obtener la serie de datos para graficar el estado proceso
    this.serieToStart = this.filteredToStart.map(
      (item: ResponseBodyObjeto) => {
        return item.Id_Contenedor_Trasvaciado;
      }
    );

    // AGREGAR LAS SERIES EN EL OBJETO DEL CHART
    this.chartOptions.series = this.serieInProcess;
    this.chartOptions2.series = this.serieInRecount;
    this.chartOptions3.series = this.serieToStart;
    
    // CONTAR POR LOS ESTADOS
    this.countInProcess = this.serieInProcess.reduce((item, a) => item + a, 0);
    this.countInRecount = this.serieInRecount.reduce((item, a) => item + a, 0);
    this.countToStart = this.serieToStart.reduce((item, a) => item + a, 0);
    
    // TOTAL
    this.total = this.countInProcess + this.countInRecount + this.countToStart;
  }
}
