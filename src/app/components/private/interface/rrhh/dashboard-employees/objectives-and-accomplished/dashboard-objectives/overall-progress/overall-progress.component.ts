import { Component, OnInit, ViewChild } from '@angular/core';
import {
  ApexNonAxisChartSeries,
  ApexChart,
  ChartComponent,
  ApexTitleSubtitle,
  XAxisAnnotations,
  ApexXAxis
} from 'ng-apexcharts';
import { Subject, takeUntil } from 'rxjs';
import { ObjectiveService } from '../../../../../../../../services/private/rrhh/objective/objective.service';

export type ChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  stroke: ApexStroke;
  title: ApexTitleSubtitle;
  subtitle: ApexTitleSubtitle;
  tooltip: ApexTooltip
}

@Component({
  selector: 'app-overall-progress',
  imports: [ChartComponent],
  templateUrl: './overall-progress.component.html',
  styleUrl: '../dashboard-objectives.component.css'
})
export class OverallProgressComponent implements OnInit {
  //chart
  @ViewChild('overallProgress') chart!: ChartComponent
  public evolutionOveralProgressOptions!: Partial<ChartOptions>
  overallProgress!: any
  lastOverallProgress!: number
  colorOverallProgress!: string
  public destroy = new Subject<void>()
  //misc
  errorMessage!: String
  constructor(private objectiveService: ObjectiveService) { }
  ngOnInit(): void {
    this.objectiveService.dashboardObjectives$.pipe(takeUntil(this.destroy)).subscribe(
      response => {
        this.overallProgress = response?.overallProgress.evolutionOverallProgress
        this.lastOverallProgress = response?.overallProgress.actualProgress.value || 0
        this.colorOverallProgress = response ? response?.overallProgress.actualProgress.color : 'whitesmoke'
        this.printOverallProgress(this.overallProgress)
        console.log(response)
      },
      err => {
        this.errorMessage = err.error.message || 'No se pueden graficar datos del progreso general.'
      }
    )
  }
  printOverallProgress(response: any) {
    console.log(response)
    this.evolutionOveralProgressOptions = {
      series: response.series,
      chart: {
        type: 'area',
        height: 120,
        sparkline: {
          enabled: true
        }
      },
      stroke: {
        width: 2,
        curve: 'smooth'
      },
      title: {
        text: this.lastOverallProgress.toString(),
        offsetX: 0,
        style: {
          fontSize: '24px',
          color: this.colorOverallProgress,
          fontFamily: 'Montserrat',
          fontWeight: '700'
        }
      },
      subtitle: {
          text: 'Progreso general - hoy',
          offsetX: 0,
          style: {
            fontSize: '14px',
            fontFamily: 'Montserrat',
            
          }
        },
      tooltip: {
        enabled: true,
        x: {
          format: 'dd MM yyyy'
        },
        y: {
          formatter: (val: number) => `${val}%`,
        }
      },
      xaxis: {
        type: 'datetime'
      }
    }
  }
}
