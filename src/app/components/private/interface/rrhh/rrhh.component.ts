import { Component, OnInit } from '@angular/core';
import { RrhhService } from '../../../../services/private/rrhh/rrhh/rrhh.service';
import { EnterpriseService } from '../../../../services/private/enterprise/enterprise.service';
import { ChartData, ChartOptions, ChartType } from 'chart.js';
import { NgChartsModule } from 'ng2-charts';
import { formatValue } from '../../../../services/utilities/format-dates/formatNumbers';
import { RrhhModuleLoadComponent } from './rrhh-module-load/rrhh-module-load.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-rrhh',
  imports: [NgChartsModule, RrhhModuleLoadComponent,],
  templateUrl: './rrhh.component.html',
  styleUrl: './rrhh.component.css'
})
export class RrhhComponent implements OnInit {
  enterpriseId!: any
  //loading
  loading: Boolean = false
  //datos para pintar
  employeesLength!: Number
  percentage!: Number
  // -- respecto a paridad de genero
  public pieChartLabels: string[] = []
  public pieChartData!: ChartData<'pie'>
  public pieChartType: ChartType = 'pie'
  public pieChartOptions: ChartOptions = {
    responsive: true
  }
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
      this.getApiData()
      this.rrhhService.rrhhSummary$.subscribe(
        response => {
          if (response) {
            this.errorMessageCanvas = ''
            this.employeesLength = response.employees.total
            this.printChart(response)
            this.payroll = response.payroll
            this.accidents = response.accidents
            this.percentage = response.employees.percentage
            this.loading = false
            if (this.employeesLength === 0) {
              this.errorMessageCanvas = 'No se pueden graficar datos si no hay empleados.'
            }
          }
        },
        err => {
          console.error(err);
        }
      )
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
    this.pieChartLabels = Object.keys(response.genderParity)
    this.pieChartData = {
      labels: this.pieChartLabels,
      datasets: [{
        data: Object.values(response.genderParity),
        backgroundColor: [
          'rgb(0, 255, 21)',
          'rgb(0, 120, 6)',
          'rgb(72, 114, 71)',
          'rgba(84, 180, 83, 1)'
        ]
      }]
    }
  }
  formatValue(num: number) {
    return formatValue(num)
  }
  back() {
    this.router.navigate(['/dashboard'])
  }
  shortenNumber(value: number): string{
    return Intl.NumberFormat('en',{notation: 'compact'}).format(value)
  }
}
