import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ObjectiveService } from '../../../../../../../../services/private/rrhh/objective/objective.service';
import { ApexTooltip, ChartComponent, ApexChart, ApexStroke, ApexNonAxisChartSeries, ApexTitleSubtitle, ApexDataLabels, ApexXAxis } from 'ng-apexcharts';
import { Subject, takeUntil } from 'rxjs';
import { error } from 'console';

export type ChartOptions = {
  series: ApexNonAxisChartSeries;
  xaxis: ApexXAxis;
  title: ApexTitleSubtitle;
  dataLabels: ApexDataLabels;
  chart: ApexChart;
  colors: any
  stroke: ApexStroke;
  tooltip: ApexTooltip,
}

@Component({
  selector: 'app-most-used-clasification',
  imports: [ChartComponent],
  templateUrl: './most-used-classifications.component.html',
  styleUrl: '../dashboard-objectives.component.css',
})
export class MostUsedClassificationsComponent implements OnInit, OnDestroy {
  constructor(private objectiveService: ObjectiveService) { }
  @ViewChild("mostUsedClassifications") chart!: ChartComponent
  public mostUsedClassifications!: Partial<ChartOptions>
  public destroyRef = new Subject<void>()
  errorMessage!: String
  ngOnInit(): void {
    this.objectiveService.dashboardObjectives$.pipe(takeUntil(this.destroyRef)).subscribe(
      response => {
        this.printMostUsedClasifications(response?.mostUsedClassifications)
      },
      err => {
        this.errorMessage = err.error.message
      }
    )
  }
  ngOnDestroy(): void {
    this.destroyRef.next() //la siguiente
    this.destroyRef.complete() //acá la completás la suscripción y listo
  }
  printMostUsedClasifications(response: any) {
    console.log('El response',response)
    if(!response.series.data || response.series.data.length === 0){
      this.errorMessage = 'No se pueden graficar datos si no se han ingresado objetivos.'
      return
    }
    this.mostUsedClassifications = {
      series: response.series,
      chart: {
        type: 'treemap',
        toolbar: {
          show: false
        },
        height: 280
      },
      dataLabels: {
        enabled: true
      },
      stroke:{
        width: 0
      },
      colors: ['#0d581d', 'rgb(62, 146, 109)', 'rgb(30,30,30)', 'rgba(23,192,99,0.7)'],
      tooltip: {
        custom: ({ series, seriesIndex, dataPointIndex, w }) => {
          const item = w.config.series[seriesIndex].data[dataPointIndex];
          return `
              <div style="padding:10px">
                <strong>${item.x}</strong><br/>
                Objetivos: ${item.y}<br/>
                Progreso promedio: ${item.avgProgress}%
              </div>
            `;
        }
      }
    }
  }
}
