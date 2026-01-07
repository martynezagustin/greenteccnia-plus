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
  selector: 'app-assists-today',
  imports: [ChartComponent],
  templateUrl: './assists-today.component.html',
  styleUrl: '../general-panel.component.css',
})
export class AssistsTodayComponent implements OnInit, OnDestroy {
  @ViewChild("chart") chart!: ChartComponent;
  public destroy$ = new Subject<void>
  public chartOptions!: Partial<ChartOptions>
  totalAssists!: { [status: string]: number }
  totalAssistsPerPunctuality!: { [punctualityStatus: string]: number }
  currentIndex: number = 0
  errorMessage!: string
  loading: Boolean = true
  references: Record<string, string> = {
    'on-time': 'Presente',
    'absent': 'Ausente',
    'license': 'Licencia',
    'vacations': 'Vacaciones',
    'late': 'Tarde'
  }
  constructor(private employeesService: EmployeesService) { }
  ngOnInit(): void {
    this.errorMessage = ''
    this.employeesService.summaryEmployees$.pipe(takeUntil(this.destroy$)).subscribe(
      response => {
        this.loading = true
        this.totalAssists = response?.totalAssists ?? {}
        this.totalAssistsPerPunctuality = response?.totalAssistsPerPunctuality ?? {}
        console.log(this.totalAssistsPerPunctuality)
        this.currentIndex = 0
        this.renderStep()
      },
      err => {
        this.errorMessage = err.error.message || 'Ha ocurrido un error y no pueden graficarse las asistencias de hoy. Comprueba si faltan datos.'
      }
    )
  }
  ngOnDestroy(): void {
    this.destroy$.next()
    this.destroy$.complete()
  }
  renderStep() {
    this.errorMessage = ''
    if (this.currentIndex === 0) {
      const series = Object.values(this.totalAssists)
      const labels = Object.keys(this.totalAssists)
      this.printChart(series, labels)
      return
    }
    const series = Object.values(this.totalAssistsPerPunctuality)
    const labels = Object.keys(this.totalAssistsPerPunctuality)
    this.printChart(series, labels)
  }
  printChart(series: any, labels: any) {
    let labelsNormalized
    if (series.length === 0 || !series) {
      if (!this.errorMessage) {
        this.errorMessage = 'No pueden realizarse gráficos si no hay datos.'
        return
      }
    }
    if (this.currentIndex === 0) {
      labelsNormalized = this.normalizeLabels(labels)
    }
    this.chartOptions = {
      series,
      chart: {
        type: 'donut',
        height: 200
      },
      labels,
      legend: { position: 'bottom', labels: { colors: '#FFF' } }
    }
  }
  normalizeLabels(response: Record<string, any>): string[] {
    return Object.keys(response).map(key =>
      this.references[key] ?? key
    )
  }
  next() {
    this.currentIndex++
    console.log(this.currentIndex);
    this.renderStep()
  }
  prev() {
    this.currentIndex--
    console.log(this.currentIndex);
    this.renderStep()
  }
}
