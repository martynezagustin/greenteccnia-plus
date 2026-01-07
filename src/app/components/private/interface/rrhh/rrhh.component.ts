import { Component, OnInit, ViewChild } from '@angular/core';
import { RrhhService } from '../../../../services/private/rrhh/rrhh/rrhh.service';
import { EnterpriseService } from '../../../../services/private/enterprise/enterprise.service';
import { ChartData, ChartType } from 'chart.js';
import { NgChartsModule } from 'ng2-charts';
import { formatValue } from '../../../../services/utilities/format-dates/formatNumbers';
import { RrhhModuleLoadComponent } from './rrhh-module-load/rrhh-module-load.component';
import { Router } from '@angular/router';
import { ApexChart, ApexLegend, ApexNonAxisChartSeries, ChartComponent } from 'ng-apexcharts';
import { CommonModule, NgClass } from '@angular/common';

export type ChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  labels: string[],
  legend: ApexLegend
}

@Component({
  selector: 'app-rrhh',
  imports: [RrhhModuleLoadComponent, ChartComponent, NgClass, CommonModule],
  templateUrl: './rrhh.component.html',
  styleUrl: './rrhh.component.css'
})
export class RrhhComponent implements OnInit {
  enterpriseId!: any
  //loading
  loading: Boolean = false
  //datos para pintar
  employeesLength!: Number
  percentage!: number
  // -- respecto a paridad de genero
  @ViewChild('chart') chart!: ChartComponent
  public chartOptions!: Partial<ChartOptions>
  //payroll
  payroll!: number
  //accidents
  accidents!: Number
  //errores de message
  errorMessageCanvas!: String
  errorMessageParityGender!: String
  constructor(private rrhhService: RrhhService, private enterpriseService: EnterpriseService, private router: Router) { }
  ngOnInit(): void {
    this.getEnterpriseId()
    if (this.enterpriseId) {
      this.rrhhService.rrhhSummary$.subscribe({
        next: (response) => {
          if (response) {
            this.errorMessageCanvas = ''
            this.employeesLength = response.employees.total
            this.payroll = response.payroll
            this.accidents = response.accidents
            this.percentage = response.employees.percentage
            console.log(this.percentage)
            this.loading = false
            this.printChart(response)
            if (this.employeesLength === 0) {
              this.errorMessageCanvas = 'No se pueden graficar datos si no hay empleados.'
            }
          }
        },
        error: (err) => {
          console.error(err);
        }
      })
      this.getApiData()
    }
  }
  getApiData() {
    this.loading = true
    this.rrhhService.getApiDataRRHH(this.enterpriseId).subscribe(
      response => {
        if (response && response.employees) {
          this.employeesLength = response.employees.total
          this.printChart(response)
          this.payroll = response.payroll
          this.accidents = response.accidents
          this.percentage = response.employees.percentage
          this.loading = false
          if (this.employeesLength === 0) {
            console.log("Se cumplio la condicion")
            this.errorMessageCanvas = 'No se pueden graficar datos si no hay empleados.'
          }
        } else {
          this.loading = false
          this.errorMessageCanvas = 'No se pueden graficar datos si no hay empleados.'
        }
      },
      err => {
        console.error(err);
      }
    )
  }
  getEnterpriseId() {
    this.enterpriseId = this.enterpriseService.getEnterpriseId()
  }
  printChart(response: any) {
    const labels = Object.keys(response.genderParity)
    const series = Object.values(response.genderParity) as ApexNonAxisChartSeries
    this.chartOptions = {
      series,
      chart: {
        type: 'donut'
      },
      labels,
      legend: {position:'bottom'}
    }
  }
  formatValue(num: number) {
    return formatValue(num)
  }
  back() {
    this.router.navigate(['/dashboard'])
  }
  shortenNumber(value: number): string {
    return Intl.NumberFormat('en', { notation: 'compact' }).format(value)
  }
}
