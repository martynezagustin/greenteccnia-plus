import { Component, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { EmployeesService } from '../../../../../../../services/private/rrhh/employees/employees.service';
import { ApexAxisChartSeries, ApexChart, ApexDataLabels, ApexGrid, ApexStroke, ApexTitleSubtitle, ApexXAxis, ChartComponent, NgApexchartsModule } from 'ng-apexcharts';
import { WorkEnvironmentSnapshot } from '../../../../../../../../interfaces/enterprise/rrhh/employees/workEnvironment/workEnvironmentSnapshot.interface';
import { Subject, takeUntil } from 'rxjs';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  yaxis: ApexYAxis;
  dataLabels: ApexDataLabels;
  grid: ApexGrid;
  stroke: ApexStroke;
  title: ApexTitleSubtitle
}

@Component({
  selector: 'app-work-environment-evolution',
  imports: [NgApexchartsModule],
  templateUrl: './work-environment-evolution.component.html',
  styleUrl: '../general-panel.component.css',
  encapsulation: ViewEncapsulation.None
})
export class WorkEnvironmentEvolutionComponent implements OnInit, OnDestroy {
  public destroy$ = new Subject<void>
  //charts
  @ViewChild("chart") Chart!: ChartComponent;
  public chartOptions!: Partial<ChartOptions>
  //misc
  errorMessage!: String
  constructor(private employeesService: EmployeesService) { }
  ngOnInit(): void {
    this.employeesService.summaryEmployees$.pipe(takeUntil(this.destroy$)).subscribe(
      response => {
        console.log(response?.workEnvironmentSnapshots)
        this.printChart(response?.workEnvironmentSnapshots)
      },
      err => {
        console.error(err);
      }
    )
  }
  ngOnDestroy(): void {
    this.destroy$.next()
    this.destroy$.complete()
  }
  printChart(response: any) {
    const grouped: { [month: string]: number[] } = {}

    const monthsName = [
      'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
      'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'
    ];

    response.forEach((elem: WorkEnvironmentSnapshot) => {
      console.log(elem)
      const d = new Date(elem.createdAt)
      const monthIndex = d.getMonth()
      const monthLabel = monthsName[monthIndex]

      if (!grouped[monthLabel]) grouped[monthLabel] = []
      grouped[monthLabel].push(elem.workEnvironmentScore)
    })

    const monthsWithData = monthsName.filter(m => grouped[m])

    console.log(monthsWithData)
    //armamos un dataset y sumamos x mes
    const dataset = monthsWithData.map(m => {
      const scores = grouped[m]
      return (scores.reduce((acc, curr) => acc + curr, 0) / scores.length)
    })
    if(!dataset || dataset.length === 0) {
      this.errorMessage = 'No pueden realizarse gráficos de evolución del clima laboral si no existen datos. Comienza a recolectar encuestas de tus empleados y espera al cierre del mes.'
    }

    this.chartOptions = {
      series: [
        {
          name: 'Puntaje',
          data: dataset
        }
      ],
      chart: {
        id: 'chart-last-snapshots',
        height: 200,
        type: 'line',
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: 'straight'
      },
      title: {
        text: 'Últimos meses',
        align: 'left',
        style: {
          color: '#FFF'
        }
      },
      grid: {
        row: {
          colors: ['whitesmoke', 'transparent'],
          opacity: 0.6
        }
      },
      yaxis:{
        labels:{
          style: {
            colors: 'rgb(0,255,127)'
          }
        }
      },
      xaxis: {
        categories: monthsWithData,
        labels:{
          style: {
            colors: ['rgb(0,255,127)']
          }
        }
      }
    }
  }
}
