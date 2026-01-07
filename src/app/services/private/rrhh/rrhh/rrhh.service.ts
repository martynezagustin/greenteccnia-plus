import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment.prod';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { RRHHSummary } from '../../../../../interfaces/enterprise/rrhh/models/rrhh-sumary.interface';

@Injectable({
  providedIn: 'root'
})
export class RrhhService {
  private baseUrl: string = environment.apiUrl

  private rrhhSumary = new BehaviorSubject<RRHHSummary | null>(null)
  rrhhSummary$ = this.rrhhSumary.asObservable()

  private viewRRHHElement = new BehaviorSubject<"employees" | "assists" | "accidents" | "liquidations">("employees")
  viewRRHHElement$ = this.viewRRHHElement.asObservable()
  constructor(private httpClient: HttpClient) { }
  getApiDataRRHH(enterpriseId: string): Observable<RRHHSummary> {
    return this.httpClient.get<RRHHSummary>(`${this.baseUrl}/${enterpriseId}/rrhh/dashboard`, { withCredentials: true }).pipe(
      tap((data: any) => this.rrhhSumary.next(data))
    )
  }
  setSummaryView(view: "employees" | "assists" | "accidents" | "liquidations") {
    console.log("Vista", view)
    this.viewRRHHElement.next(view)
  }
}
