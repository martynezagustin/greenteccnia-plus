import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment.prod';
import { RRHHObjective } from '../../../../../interfaces/enterprise/rrhh/objective/objective.interface';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { DashboardObjectivesData } from '../../../../../interfaces/enterprise/rrhh/objective/dashboard.interface';

@Injectable({
  providedIn: 'root',
})
export class ObjectiveService {

  //misc para employees
  dashboardObjectives = new BehaviorSubject<DashboardObjectivesData | null>(null)
  dashboardObjectives$ = this.dashboardObjectives.asObservable()

  private baseUrl: string = environment.apiUrl
  constructor(private httpClient: HttpClient) { }
  createObjective(data: RRHHObjective, enterpriseId: any) {
    return this.httpClient.post(`${this.baseUrl}/${enterpriseId}/rrhh/objectives`, data, { withCredentials: true })
  }
  printDashboard(enterpriseId: any): Observable<DashboardObjectivesData> {
    return this.httpClient.get<DashboardObjectivesData>(`${this.baseUrl}/${enterpriseId}/rrhh/objectives/print/dashboard`, { withCredentials: true }).pipe(tap((data) => {
      this.dashboardObjectives.next(data)
      console.log(this.dashboardObjectives.value)
    }))
  } //esto traerá los datos del backend
}
