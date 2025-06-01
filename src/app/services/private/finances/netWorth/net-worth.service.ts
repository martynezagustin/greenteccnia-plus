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
  getNetWorthByCurrentPeriod(enterpriseId: string | null, period: 'year' | 'month' | 'trimester'): Observable<{ netWorthByCurrentPeriod: number, percentage: number }> {
    return this.httpClient.get<{ netWorthByCurrentPeriod: number; percentage: number }>(`${this.baseUrl}/${enterpriseId}/finances/net-worth/by-current-${period}`, { withCredentials: true })
  }
}
