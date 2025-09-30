import { Component, OnInit } from '@angular/core';
import { EmployeesService } from '../../../../../../services/private/rrhh/employees/employees.service';
import { EnterpriseService } from '../../../../../../services/private/enterprise/enterprise.service';
import { Employee } from '../../../../../../../interfaces/enterprise/rrhh/employees/employee.interface';
import { AddEmployeeComponent } from './add-employee/add-employee.component';
import { formatValue } from '../../../../../../services/utilities/format-dates/formatNumbers';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-employees',
  imports: [AddEmployeeComponent, CommonModule, RouterLink],
  templateUrl: './employees.component.html',
  styleUrl: './employees.component.css'
})
export class EmployeesComponent implements OnInit {
  enterpriseId: any
  employees: Employee[] = []
  //misc
  errorMessage!: String
  loading!: Boolean
  //deleteds
  deletedSuccessfully!: String
  deletedErrorMessage!: String
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
        this.employees = response.slice(0,3)
        console.log(this.employees)
        this.loading = false
      },
      err => {
        this.errorMessage = err.error.message
        this.loading = false
      }
    )
  }
  deleteEmployee(employeeId: any) {
    Swal.fire({
      title: '<h2 style="font-family:Montserrat; letter-spacing:-1.2px">¿Estás seguro?</h2>',
      text: "No podrás revertir esta acción una vez confirmada.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: "Cancelar"
    }).then((result) => {
      if (!result.isConfirmed) return;
      this.deletedSuccessfully = ''
      this.employeesService.deleteEmployee(this.enterpriseId, employeeId).subscribe(
        () => {
          Swal.fire({
            title: '<h2 style="font-family:Montserrat; letter-spacing:-1.2px">Empleado eliminado</h2>',
            text: 'El empleado se eliminó correctamente.',
            showCloseButton: true,
          })
        },
        err => {
          this.deletedErrorMessage = err.error.message
        }
      )
    }).catch((err) => {
      console.error(err);
    })
  }
  formatValue(num: Number) {
    return formatValue(num)
  }
  setEmployeeToUpdate(employee: Employee | null) {
    this.employeesService.setEmployeeToEdit(employee)
  }
}