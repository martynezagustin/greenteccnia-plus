import { Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Department } from '../../../../../interfaces/enterprise/rrhh/employees/department/department.interface';

@Injectable({
  providedIn: 'root',
})
export class DepartmentService {
  private baseUrl: string = environment.apiUrl

  private departments = new BehaviorSubject<Department [] | null>(null)
  constructor(private httpClient: HttpClient) { }
  addDepartment(enterpriseId: string, data: any): Observable<any> {
    return this.httpClient.post(`${this.baseUrl}/${enterpriseId}/departments/add-department`, data, { withCredentials: true })
  }
  getDepartment(enterpriseId: string, departmentId: string) {
    return this.httpClient.get(`${this.baseUrl}/${enterpriseId}/departments/${departmentId}`, { withCredentials: true })
  }
  getAllDepartments(enterpriseId: string): Observable<Department[]> {
    return this.httpClient.get<Department[]>(`${this.baseUrl}/${enterpriseId}/departments`, { withCredentials: true }).pipe(
      tap((data: Department[]) => {
        this.departments.next(data)
      })
    )
  }
}
