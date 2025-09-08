import { Component, OnInit } from '@angular/core';
import { EmployeesService } from '../../../../../../services/private/rrhh/employees/employees.service';
import { EnterpriseService } from '../../../../../../services/private/enterprise/enterprise.service';
import { Employee } from '../../../../../../../interfaces/enterprise/rrhh/employees/employee.interface';
import { AddEmployeeComponent } from './add-employee/add-employee.component';

@Component({
  selector: 'app-employees',
  imports: [AddEmployeeComponent],
  templateUrl: './employees.component.html',
  styleUrl: './employees.component.css'
})
export class EmployeesComponent implements OnInit {
  enterpriseId: any
  employees: Employee[] = []
  //misc
  errorMessage!: String
  loading!: Boolean
  constructor(private employeesService: EmployeesService, private enterpriseService: EnterpriseService) { }
  ngOnInit(): void {
    this.getEnterpriseId()
    this.getEmployees()
    this.employeesService.employees$.subscribe(
      response => {
        this.employees = response
        this.errorMessage = ''
      },
      err => {
        this.errorMessage = err.error.message
      }
    )
  }
  getEnterpriseId() {
    this.enterpriseId = this.enterpriseService.getEnterpriseId()
  }
  getEmployees() {
    this.loading = true
    this.errorMessage = ''
    this.employeesService.getAllEmployees(this.enterpriseId).subscribe(
      response => {
        this.employees = response
        console.log(this.employees)
        this.loading = false
      },
      err => {
        this.errorMessage = err.error.message
        this.loading = false
      }
    )
  }
}
