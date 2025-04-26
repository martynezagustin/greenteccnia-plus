import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment.prod';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NetWorthService {
  baseUrl: String = environment.apiUrl
  constructor(private httpClient: HttpClient) { }
  getNetWorth(enterpriseId: String): Observable<Number> {
    return this.httpClient.get<Number>(`${this.baseUrl}/${enterpriseId}/finances/net-worth`, { withCredentials: true });
  }
  getNetWorthByCurrentYear(enterpriseId: String){
    return this.httpClient.get(`${this.baseUrl}/${enterpriseId}/finances/net-worth/by-current-year`, { withCredentials: true })
  }
  getNetWorthByCurrentMonth(enterpriseId: String) {
    return this.httpClient.get(`${this.baseUrl}/${enterpriseId}/finances/net-worth/by-current-month`, { withCredentials: true })
  }
  getNetWorthByCurrentDate(enterpriseId: String) {
    return this.httpClient.get(`${this.baseUrl}/${enterpriseId}/finances/net-worth/by-current-date`, { withCredentials: true })
  }
}
