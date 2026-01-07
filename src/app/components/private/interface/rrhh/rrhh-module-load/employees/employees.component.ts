import { Component, NgModule, OnDestroy, OnInit } from '@angular/core';
import { EmployeesService } from '../../../../../../services/private/rrhh/employees/employees.service';
import { EnterpriseService } from '../../../../../../services/private/enterprise/enterprise.service';
import { Employee } from '../../../../../../../interfaces/enterprise/rrhh/employees/employee.interface';
import { AddEmployeeComponent } from './add-employee/add-employee.component';
import { formatValue } from '../../../../../../services/utilities/format-dates/formatNumbers';
import Swal from 'sweetalert2';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ViewEmployeeComponent } from "./view-employee/view-employee.component";
import { CommonModule } from '@angular/common';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-employees',
  imports: [AddEmployeeComponent, CommonModule, RouterLink, FormsModule, ViewEmployeeComponent],
  templateUrl: './employees.component.html',
  styleUrl: './employees.component.css'
})
export class EmployeesComponent implements OnInit, OnDestroy {
  public destroy$ = new Subject<void>
  nameControl: string = '';
  departmentControl: string = '';
  enterpriseId!: any;
  employees: Employee[] = [];
  errorMessage = '';
  loading = false;
  deletedSuccessfully = '';
  deletedErrorMessage = '';
  viewMore!: Boolean
  createAvaiable!: boolean
  readonly departments = [
    "Administración", "Recursos Humanos", "Finanzas", "Marketing", "Ventas",
    "Producción", "Logística", "Tecnología de la Información", "Atención al Cliente",
    "Investigación y Desarrollo", "Calidad", "Legal", "Compras", "Proyectos",
    "Comunicación", "Otro"
  ];

  constructor(
    private employeesService: EmployeesService,
    private enterpriseService: EnterpriseService,
  ) { }

  ngOnInit(): void {
    this.enterpriseId = this.enterpriseService.getEnterpriseId();
    this.loadEmployees();
    this.employeesService.employees$.pipe(takeUntil(this.destroy$)).subscribe(
      response => {
        if(response){
          this.employees = response
        }
      },
      err => {
        console.error(err);
      }
    )
  }
  ngOnDestroy(): void {
    this.destroy$.next()
    this.destroy$.complete()
  }
  private loadEmployees(): void {
    this.loading = true;
    this.errorMessage = '';
    this.employeesService.getAllEmployees(this.enterpriseId).subscribe({
      next: res => {
        this.employees = res.employees;
        this.viewMore = res.viewMore
        this.loading = false;
      },
      error: err => {
        this.errorMessage = err.error?.message || 'Error al cargar empleados';
        this.createAvaiable = err.error.createAvaiable
        console.log(this.createAvaiable)
        this.loading = false;
      }
    });
  }

  get filteredEmployees(): Employee[] {
    const text = this.nameControl.toLowerCase().trim();
    return this.employees.filter(emp => {
      const fullName = (emp.personalInfo.name + " " + emp.personalInfo.lastname).toLowerCase();
      const matchName = fullName.includes(text);
      const matchDept = !this.departmentControl || emp.jobInfo.department.name === this.departmentControl;
      return matchName && matchDept;
    });
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
          this.loadEmployees();
        },
        error: err => {
          this.deletedErrorMessage = err.error?.message || 'Error al eliminar empleado';
        }
      });
    }).catch(console.error);
  }

  formatValue(num: number): string {
    return formatValue(num);
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