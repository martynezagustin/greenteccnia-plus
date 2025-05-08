import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment.prod';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CashFlowService {
  baseUrl: String = environment.apiUrl
  constructor(private httpClient: HttpClient) { }
  getCashFlow(enterpriseId: String): Observable<Number> {
    return this.httpClient.get<Number>(`${this.baseUrl}/${enterpriseId}/finances/cash-flow`, { withCredentials: true })
  }
  getCashFlowByCurrentDate(enterpriseId: String) {
    return this.httpClient.get(`${this.baseUrl}/${enterpriseId}/finances/cash-flow/by-current-date`, { withCredentials: true })
  }
  getCashFlowByCurrentPeriod(enterpriseId: String, period: String): Observable<{ cashFlowByCurrentPeriod: number; percentage: number }> {
    return this.httpClient.get<{ cashFlowByCurrentPeriod: number; percentage: number }>(`${this.baseUrl}/${enterpriseId}/finances/cash-flow/by-current-${period}`, { withCredentials: true })
  }
  getCashFlowByCurrentYear(enterpriseId: String): Observable<{ cashFlowByCurrentPeriod: number; percentage: number }> {
    return this.httpClient.get<{ cashFlowByCurrentPeriod: number; percentage: number }>(`${this.baseUrl}/${enterpriseId}/finances/cash-flow/by-current-year`, { withCredentials: true })
  }
  projectedCashFlowForNextMonth(enterpriseId: String): Observable<{ projectedCashFlowOrNetWorth: number; percentage: number }> {
    return this.httpClient.get<{ projectedCashFlowOrNetWorth: number; percentage: number }>(`${this.baseUrl}/${enterpriseId}/finances/cash-flow/projection-next-month`, { withCredentials: true })
  }
}
