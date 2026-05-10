import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { ObjectiveService } from '../../../../../../../../services/private/rrhh/objective/objective.service';
import {
  ApexNonAxisChartSeries,
  ApexResponsive,
  ApexChart,
  ChartComponent,
  ApexXAxis,
  ApexYAxis
} from 'ng-apexcharts';

export type ChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  responsive: ApexResponsive[];
  labels: any;
  dataLabels: any,
  xaxis: ApexXAxis,
  yaxis: ApexYAxis,
  colors: any;
  legend?: any;
  stroke?: any;
};

@Component({
  selector: 'app-historic-snapshots',
  imports: [ChartComponent],
  templateUrl: './historic-snapshots.component.html',
  styleUrl: '../dashboard-objectives.component.css',
})
export class HistoricSnapshotsComponent implements OnDestroy, OnInit {
  //📈 CHARTS
  @ViewChild("snapshots") chart!: ChartComponent
  public evolutionStatusObjectivesOptions!: Partial<ChartOptions>
  public destroyRef = new Subject<void>()
  evolutionStatusObjectives!: any
  errorMessage!: String
  constructor(private objectiveService: ObjectiveService) { }
  ngOnDestroy(): void {
    this.destroyRef.next()
    this.destroyRef.complete()
  }
  ngOnInit(): void {
    this.objectiveService.dashboardObjectives$.pipe(takeUntil(this.destroyRef)).subscribe(
      response => {
        this.evolutionStatusObjectives = response?.evolutionStatusObjectives
        if (this.evolutionStatusObjectives) {
          this.printSnapshots(this.evolutionStatusObjectives)
          console.log(this.evolutionStatusObjectives)
        }
      },
      err => {
        this.errorMessage = 'Ocurrió un error al cargar los datos del dashboard.'
        console.error(err);
      }
    )
  }
  printSnapshots(response: any) {
    if(!response.categories || !response.series || response.categories.length === 0 || response.series.length === 0){
      this.errorMessage= 'No se encontraron datos para mostrar en el gráfico de evolución de objetivos.'
      return
    }
    this.evolutionStatusObjectivesOptions = {
      chart: {
        height: 350,
        type: 'area',
        zoom: {
          enabled: false
        }
      },
      series: response.series,
      xaxis: {
        categories:
          response.categories
      },
      dataLabels:{
        enabled: false
      },
      stroke:{
        curve: 'smooth'
      },
      yaxis: {
        
        labels: {
          formatter: function(val:number){
            return val.toFixed(0)
          },
          style: {
            fontFamily: 'Montserrat',
            fontWeight: '600',
            colors: ['rgb(0,95,17)']
          }
        }
      }
    }
  }
}
