import { Component, OnInit, ViewChild } from '@angular/core';
import { ApexChart, ChartComponent } from 'ng-apexcharts';
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
  selector: 'app-card-last-objective-progress',
  imports: [ChartComponent],
  templateUrl: './card-last-objective-progress.component.html',
  styleUrl: '../dashboard-objectives.component.css',
})


export class CardLastObjectiveProgressComponent implements OnInit{
  @ViewChild('lastObjectiveProgress') chart!: ChartComponent
  public evolutionLastObjectiveAggregated!: Partial<ChartOptions>
  subtitle: String = 'Evolución - último objetivo'
  lastObjective!: any
  actualProgressObjective!: number
  errorMessage!: String
  colorProgress!: string 
  public destroy = new Subject<void>()
  constructor(private objectiveService: ObjectiveService){}
  ngOnInit(): void {
    this.objectiveService.dashboardObjectives$.pipe(takeUntil(this.destroy)).subscribe(
      response => {
        console.log('El response que te llega para last objective',response)
        this.lastObjective = response?.lastObjective.evolutionLastObjectiveAggregated
        this.actualProgressObjective = response?.lastObjective.actualProgress || 0
        this.colorProgress = response?.lastObjective.color ? response?.lastObjective.color : ''
        this.printLastObjectiveSummary(this.lastObjective)
      }
    )
  }
  printLastObjectiveSummary(response: any) {
    if(!response){
      this.errorMessage = 'No se pueden graficar datos.'
    }
    this.evolutionLastObjectiveAggregated = {
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
        text: this.actualProgressObjective.toString(),
        offsetX: 0,
        style: {
          fontSize: '24px',
          fontFamily: 'Montserrat',
          fontWeight: '700',
          color: this.colorProgress
        }
      },
      subtitle: {
          text: 'Progreso actual',
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
