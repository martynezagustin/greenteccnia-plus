import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ObjectiveService } from '../../../../../../../../services/private/rrhh/objective/objective.service';
import { ApexTooltip, ChartComponent, ApexChart, ApexStroke, ApexNonAxisChartSeries, ApexTitleSubtitle, ApexDataLabels, ApexXAxis, ApexPlotOptions } from 'ng-apexcharts';
import { Subject, takeUntil } from 'rxjs';
import { error } from 'console';

export type ChartOptions = {
  series: ApexNonAxisChartSeries;
  xaxis: ApexXAxis;
  title: ApexTitleSubtitle;
  dataLabels: ApexDataLabels;
  chart: ApexChart;
  colors: any;
  stroke: ApexStroke;
  plotOptions: ApexPlotOptions;
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
    console.log(response.data)
    this.mostUsedClassifications = {
      series: response.series,
      chart: {
        type: 'treemap',
        height: 280,
        toolbar: {
          show: false
        }
      },
      plotOptions: {
        treemap: {
          distributed: true
        }
      },
      colors: ['#008FFB', '#00E396', '#FEB019', '#FF4560', '#775DD0', '#546E7A', '#26a69a', '#D10CE8'],
      dataLabels: {
        enabled: true,
        style: {
          fontSize: '14px',
          fontFamily: 'Helvetica, Arial, sans-serif',
          fontWeight: 'bold',
          colors: ['#fff']
        }
      },
      xaxis: {
        categories: response.categories
      },
      title: {
        text: 'Clasificaciones más utilizadas',
        align: 'center',
        style: {
          fontSize: '16px',
          fontWeight: 'bold',
          color: '#263238'
        }
      },
      stroke: {
        width: 1,
        colors: ['#fff']
      },
      tooltip: {
        custom: ({ seriesIndex, dataPointIndex, w }) => {
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
