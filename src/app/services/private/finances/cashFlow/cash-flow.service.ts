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
  getCashFlow(enterpriseId: String) {
    return this.httpClient.get(`${this.baseUrl}/${enterpriseId}/finances/cash-flow`, { withCredentials: true })
  }
  getCashFlowByCurrentDate(enterpriseId: String) {
    return this.httpClient.get(`${this.baseUrl}/${enterpriseId}/finances/cash-flow/by-current-date`, { withCredentials: true})
  }
  getCashFlowByCurrentMonth(enterpriseId: String) {
    return this.httpClient.get(`${this.baseUrl}/${enterpriseId}/finances/cash-flow/by-current-month`, { withCredentials: true})
  }
  getCashFlowByCurrentYear(enterpriseId: String) {
    return this.httpClient.get(`${this.baseUrl}/${enterpriseId}/finances/cash-flow/by-current-year`, { withCredentials: true})
  }
}
