import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { environment } from '../../../../../environments/environment.prod';
import { Employee } from '../../../../../interfaces/enterprise/rrhh/employees/employee.interface';

@Injectable({
  providedIn: 'root'
})
export class EmployeesService {
  baseUrl: String = environment.apiUrl
  constructor(private httpClient: HttpClient) { }
  //empleados ya cargados
  employees = new BehaviorSubject<Employee[]>([])
  employees$ = this.employees.asObservable()

  //paridad de genero
  parityGender = new BehaviorSubject<any | null>(null)
  parityGender$ = this.parityGender.asObservable()
  
  addEmployee(enterpriseId: string, data: Employee): Observable<Employee> {
    return this.httpClient.post<Employee>(`${this.baseUrl}/${enterpriseId}/employees/add-employee`, data, { withCredentials: true }).pipe((
      tap(() =>{
        this.getAllEmployees(enterpriseId).subscribe(
          response => {
            this.employees.next(response)
          },
          err => {
            console.error(err);
          }
        )
      })
    ))
  }
  getParityGender(enterpriseId: String | null): Observable<any> {
    return this.httpClient.get<any>(`${this.baseUrl}/${enterpriseId}/employees/filter/by-gender-parity`, { withCredentials: true })
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
}
