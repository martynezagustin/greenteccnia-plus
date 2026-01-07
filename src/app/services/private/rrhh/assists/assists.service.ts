import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment.prod';
import { Assist } from '../../../../../interfaces/enterprise/rrhh/assists/assist.interface';
import { EmployeesService } from '../employees/employees.service';
import { BehaviorSubject, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AssistsService {
  assists = new BehaviorSubject<Assist[] | null>(null)
  assists$ = this.assists.asObservable()
  constructor(private httpClient: HttpClient, private employeeService: EmployeesService) { }
  baseUrl: string = environment.apiUrl
  addAssist(enterpriseId: string, employeeId: string, assistData: Assist) {
    return this.httpClient.post<Assist>(`${this.baseUrl}/${enterpriseId}/employees/${employeeId}/add-assist`, assistData, { withCredentials: true }).pipe(
      tap(() => {
        this.employeeService.getEmployee(enterpriseId, employeeId).subscribe(
          response => {
            this.employeeService.employeeToView.next(response.employee._id);
          }
        )
        this.getAllAssists(enterpriseId).subscribe()
      })
    )
  }
  getAllAssists(enterpriseId: string) {
    return this.httpClient.get<any>(`${this.baseUrl}/${enterpriseId}/assists`, { withCredentials: true }).pipe(
      tap((assists) => {
        this.assists.next(assists)
      })
    )
  }
}
