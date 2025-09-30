import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, switchMap, tap } from 'rxjs';
import { environment } from '../../../../../environments/environment.prod';
import { Employee } from '../../../../../interfaces/enterprise/rrhh/employees/employee.interface';
import { RrhhService } from '../rrhh/rrhh.service';
import { RRHHSummary } from '../../../../../interfaces/enterprise/rrhh/models/rrhh-sumary.interface';

@Injectable({
  providedIn: 'root'
})
export class EmployeesService {
  baseUrl: String = environment.apiUrl
  constructor(private httpClient: HttpClient, private rrhhService: RrhhService) { }
  //empleados ya cargados
  employees = new BehaviorSubject<Employee[]>([])
  employees$ = this.employees.asObservable()

  //para editar
  employeeToEdit = new BehaviorSubject<Employee | null>(null)
  employeeToEdit$ = this.employeeToEdit.asObservable()

  //paridad de genero
  parityGender = new BehaviorSubject<any | null>(null)
  parityGender$ = this.parityGender.asObservable()

  addEmployee(enterpriseId: string, data: Employee): Observable<RRHHSummary> {
    return this.httpClient.post<Employee>(`${this.baseUrl}/${enterpriseId}/employees/add-employee`, data, { withCredentials: true }).pipe(
      switchMap(() => this.getAllEmployees(enterpriseId)),
      tap((employees) => {
        this.employees.next(employees)
      }),
      //pedimos rrhh
      switchMap(() => this.rrhhService.getApiDataRRHH(enterpriseId)),
      switchMap(() => this.getParityGender(enterpriseId))
    );
  }
  getParityGender(enterpriseId: String | null): Observable<any> {
    return this.httpClient.get<any>(`${this.baseUrl}/${enterpriseId}/employees/filter/by-gender-parity`, { withCredentials: true }).pipe(
      tap((data) => {
        this.parityGender.next(data)
      })
    )
  }
  setParityGender(data: any) {
    this.parityGender.next(data)
  }
  getAllEmployees(enterpriseId: string) {
    return this.httpClient.get<Employee[]>(`${this.baseUrl}/${enterpriseId}/employees`, { withCredentials: true }).pipe(
      tap((employees) => {
        this.employees.next(employees)
      })
    )
  }
  deleteEmployee(enterpriseId: string, employeeId: string): Observable<any> {
    return this.httpClient.delete<Employee[]>(`${this.baseUrl}/${enterpriseId}/employees/delete-employee/${employeeId}`, { withCredentials: true }).pipe(
      switchMap(() => this.getAllEmployees(enterpriseId)),
      tap((e) => {
        this.employees.next(e)
      }),
      switchMap(() => this.rrhhService.getApiDataRRHH(enterpriseId))
    )
  }
  setEmployeeToEdit(employee: Employee | null) {
    this.employeeToEdit.next(employee)
  }
  updateEmployee(enterpriseId: string, employeeId: string, data: Employee): Observable<any> {
    return this.httpClient.put<any>(`${this.baseUrl}/${enterpriseId}/employees/update-employee/${employeeId}`, data, { withCredentials: true }).pipe(
      tap((e) => {
        this.employees.next(e)
      }),
      switchMap(() => this.getAllEmployees(enterpriseId)),
      switchMap(() => this.rrhhService.getApiDataRRHH(enterpriseId))
    )
  }
}
