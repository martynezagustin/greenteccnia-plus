import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment.prod';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RrhhService {
  private baseUrl: string = environment.apiUrl
  private viewRRHHElement = new BehaviorSubject<"employees" | "assists" | "accidents" | "liquidations">("employees")
  viewRRHHElement$ = this.viewRRHHElement.asObservable()
  constructor(private httpClient: HttpClient) { }
  getApiDataRRHH(enterpriseId: string): Observable<any> {
    return this.httpClient.get(`${this.baseUrl}/${enterpriseId}/rrhh/dashboard`, { withCredentials: true })
  }
  setSummaryView(view: "employees" | "assists" | "accidents" | "liquidations") {
    console.log("Vista", view)
    this.viewRRHHElement.next(view)
  }
}
