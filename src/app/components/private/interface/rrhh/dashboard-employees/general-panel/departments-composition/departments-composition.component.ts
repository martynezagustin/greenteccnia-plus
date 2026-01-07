import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { EmployeesService } from '../../../../../../../services/private/rrhh/employees/employees.service';
import { ApexChart, ApexLegend, ApexNonAxisChartSeries, ChartComponent } from 'ng-apexcharts';
import { Subject, takeUntil } from 'rxjs';

export type ChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  labels: string[],
  legend: ApexLegend
}

@Component({
  selector: 'app-departments-composition',
  imports: [ChartComponent],
  templateUrl: './departments-composition.component.html',
  styleUrl: '../general-panel.component.css',
})
export class DepartmentsCompositionComponent implements OnInit, OnDestroy {
  public destroy$ = new Subject<void>
  compDeparments!: { department: string, quantity: number } | undefined
  errorMessage!: String
  @ViewChild("chart") chart!: ChartComponent;
  public chartOptions!: Partial<ChartOptions>
  constructor(private employeesService: EmployeesService) { }
  ngOnInit(): void {
    this.employeesService.summaryEmployees$.pipe(takeUntil(this.destroy$)).subscribe(
      response => {
        console.log("El response", response)
        this.compDeparments = response?.totalDepartments
        let series
        let labels
        if (this.compDeparments) {
          series = Object.values(this.compDeparments)
          labels = Object.keys(this.compDeparments)
          this.printChart(series, labels)
        }
      },
      err =>{
        this.errorMessage = err.error.message || 'Ha ocurrido un error para graficar la composición departamental.'
      }
    )
  }
  ngOnDestroy(): void {
    this.destroy$.next()
    this.destroy$.complete()
  }
  printChart(series: any, labels: any) {
    if(!series || series.length === 0){
      this.errorMessage = 'No pueden graficarse datos de composición si no hay empleados.'
      return
    }
    this.chartOptions = {
      series: series,
      chart: {
        type: 'donut'
      },
      labels,
      legend: { position: 'bottom',labels:{colors: '#FFF'} },
    }
  }
}
