import { Component, OnDestroy, OnInit } from '@angular/core';
import { EmployeesService } from '../../../../../../../services/private/rrhh/employees/employees.service';
import { Employee } from '../../../../../../../../interfaces/enterprise/rrhh/employees/employee.interface';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { departments } from '../../../../../../../utils/RRHH/employees/departments';
import { formatValue } from '../../../../../../../services/utilities/format-dates/formatNumbers';
import { ViewEmployeeComponent } from "../../../rrhh-module-load/employees/view-employee/view-employee.component";
import Swal from 'sweetalert2';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-list-employees',
  imports: [CommonModule, FormsModule, ViewEmployeeComponent],
  templateUrl: './list-employees.component.html',
  styleUrl: '../general-panel.component.css',
})
export class ListEmployeesComponent implements OnInit, OnDestroy {
  public destroy$ = new Subject<void>
  enterpriseId: any = localStorage.getItem('enterpriseId')
  nameControl: string = '';
  departmentControl: string = '';
  employees: Employee[] = []
  errorMessage!: String
  //about deletes options
  deletedSuccessfully!: String
  deletedErrorMessage!: String
  readonly departments = departments
  constructor(private employeesService: EmployeesService) { }
  ngOnInit(): void {
    this.employeesService.summaryEmployees$.pipe(takeUntil(this.destroy$)).subscribe(
      response => {
        if (response) {
          this.employees = response.totalEmployeesList
        }
      },
      err => {
        console.error(err)
      }
    )
  }
  ngOnDestroy(): void {
    this.destroy$.next()
    this.destroy$.complete()
  }
  get filteredEmployees(): Employee[] {
    const text = this.nameControl.toLowerCase().trim();
    return this.employees.filter(emp => {
      const fullName = (emp.personalInfo.name + " " + emp.personalInfo.lastname).toLowerCase()
      const matchName = fullName.includes(text)
      const matchDept = !this.departmentControl || emp.jobInfo.department.name === this.departmentControl
      return matchName && matchDept
    })
  }
  formatValue(value: Number) {
    return formatValue(value)
  }
  deleteEmployee(employeeId: string): void {
    Swal.fire({
      title: '<h2 style="font-family:Montserrat; letter-spacing:-1.2px">¿Estás seguro?</h2>',
      text: "No podrás revertir esta acción una vez confirmada.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: "Cancelar"
    }).then(result => {
      if (!result.isConfirmed) return;
      this.deletedSuccessfully = '';
      this.employeesService.deleteEmployee(this.enterpriseId, employeeId).subscribe({
        next: async () => {
          await Swal.fire({
            title: '<h2 style="font-family:Montserrat; letter-spacing:-1.2px">Empleado eliminado</h2>',
            text: 'El empleado se eliminó correctamente.',
            showCloseButton: true,
          });
        },
        error: err => {
          this.deletedErrorMessage = err.error?.message || 'Error al eliminar empleado';
        }
      });
    }).catch(console.error);
  }
  setEmployeeToUpdate(employee: Employee | null): void {
    this.employeesService.setEmployeeToEdit(employee);
  }
  setNullEmployeeToEdit(): void {
    this.employeesService.setEmployeeToEdit(null)
  }
  setEmployeeToView(id: string) {
    console.log(id)
    this.employeesService.setEmployeeToView(id)
  }
}
