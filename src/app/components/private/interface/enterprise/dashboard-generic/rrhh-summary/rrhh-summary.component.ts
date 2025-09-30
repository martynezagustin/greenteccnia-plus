import { Component, OnInit } from '@angular/core';
import { ChartData, ChartOptions, ChartType } from 'chart.js';
import { NgChartsModule } from 'ng2-charts';
import { EnterpriseService } from '../../../../../../services/private/enterprise/enterprise.service';
import { EmployeesService } from '../../../../../../services/private/rrhh/employees/employees.service';
import { Router } from '@angular/router';
import { AddEmployeeComponent } from '../../../rrhh/rrhh-module-load/employees/add-employee/add-employee.component';

@Component({
  selector: 'rrhh-summary',
  imports: [NgChartsModule, AddEmployeeComponent],
  standalone: true,
  templateUrl: './rrhh-summary.component.html',
  styleUrl: '../dashboard-generic.component.css',
})
export class RrhhSummaryComponent implements OnInit {
  loading: boolean = false
  errorMessage: string = ''
  enterpriseId: string | null = ''
  public pieChartLabels: string[] = []
  public pieChartData!: ChartData<'pie'>
  public pieChartType: ChartType = 'pie'
  public pieChartOptions: ChartOptions = {
    responsive: true
  }
  constructor(private enterpriseService: EnterpriseService, private employeesService: EmployeesService, private router: Router) { }
  ngOnInit(): void {
    this.getEnterpriseId()
    this.getData()
    this.employeesService.parityGender$.subscribe(
      response => {
        this.printData(response)
      },
      err => {
        console.error(err);

      }
    )
  }
  getEnterpriseId() {
    this.enterpriseId = this.enterpriseService.getEnterpriseId()
  }
  getData() {
    this.loading = true
    this.employeesService.getParityGender(this.enterpriseId).subscribe(
      response => {
        console.log(response)
        this.printData(response)
        this.loading = false
        this.errorMessage = ''
      },
      error => {
        this.loading = false
        console.log(error)
        this.errorMessage = error.error.message
      }
    )
  }
  goToRRHH() {
    this.router.navigate(['dashboard/rrhh'])
  }
  printData(response: any) {
    this.pieChartLabels = Object.keys(response)
    this.pieChartData = {
      labels: this.pieChartLabels,
      datasets: [{
        data: Object.values(response),
        backgroundColor: [
          'rgb(0, 255, 21)',
          'rgb(0, 120, 6)',
          'rgb(72, 114, 71)'
        ]
      }]
    }
  }
}
