import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from "@angular/router";
import { AddEmployeeComponent } from '../rrhh-module-load/employees/add-employee/add-employee.component';
import { EmployeesService } from '../../../../../services/private/rrhh/employees/employees.service';
import { response } from 'express';

@Component({
  selector: 'app-dashboard-employees',
  imports: [RouterModule, AddEmployeeComponent],
  templateUrl: './dashboard-employees.component.html',
  styleUrl: './dashboard-employees.component.css'
})
export class DashboardEmployeesComponent implements OnInit {
  //algunos datos necesarios para cargar los componentes
  enterpriseId: string | null = localStorage.getItem('enterpriseId')
  errorMessage: string = ''
  constructor(private employeeService: EmployeesService, private router: Router) { }
  ngOnInit(): void {
    if (this.enterpriseId) {
      this.employeeService.loadSummaryOnce(this.enterpriseId)
    }
  }
  back(){
    this.router.navigate(['/dashboard/rrhh'])
  }
}
