import { Component } from '@angular/core';
import { RouterModule } from "@angular/router";
import { AddEmployeeComponent } from '../rrhh-module-load/employees/add-employee/add-employee.component';

@Component({
  selector: 'app-dashboard-employees',
  imports: [RouterModule, AddEmployeeComponent],
  templateUrl: './dashboard-employees.component.html',
  styleUrl: './dashboard-employees.component.css'
})
export class DashboardEmployeesComponent {

}
