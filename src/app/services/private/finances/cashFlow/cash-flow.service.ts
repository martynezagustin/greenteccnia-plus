import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment.prod';
import { BehaviorSubject, forkJoin, Observable } from 'rxjs';
import { CashFlowFullData } from '../../../../../interfaces/enterprise/finances/cashFlow/models/cash-flow.interface';

@Injectable({
  providedIn: 'root'
})
export class CashFlowService {

  private fullCashFlow = new BehaviorSubject<CashFlowFullData | null>(null)
  fullCashFlow$ = this.fullCashFlow.asObservable()

  refreshAllCashFlowData(enterpriseId: String) {
    const periods = ['date', 'month', 'year']
    const requests = [
      this.getCashFlow(enterpriseId),
      ...periods.map(period => this.getCashFlowByCurrentPeriod(enterpriseId, period)),
    ];
    forkJoin(requests).subscribe(([total, date, month, year]) => {
      const fullData: CashFlowFullData = {
        total: total as number,
        currentDate: (date as any).cashFlowByCurrentPeriod,
        currentMonth: (month as any).cashFlowByCurrentPeriod,
        currentYear: (year as any).cashFlowByCurrentPeriod,
        percentages: {
          currentDate: (date as any).percentage,
          currentMonth: (month as any).percentage,
          currentYear: (year as any).percentage
        }
      }
      this.fullCashFlow.next(fullData)
    })
  }

  baseUrl: String = environment.apiUrl
  constructor(private httpClient: HttpClient) { }
  getCashFlow(enterpriseId: String): Observable<Number> {
    return this.httpClient.get<Number>(`${this.baseUrl}/${enterpriseId}/finances/cash-flow`, { withCredentials: true })
  }
  getCashFlowByCurrentPeriod(enterpriseId: String | null, period: String): Observable<{ cashFlowByCurrentPeriod: number; percentage: number }> {
    return this.httpClient.get<{ cashFlowByCurrentPeriod: number; percentage: number }>(`${this.baseUrl}/${enterpriseId}/finances/cash-flow/by-current-${period}`, { withCredentials: true })
  }
  projectedCashFlowForNextMonth(enterpriseId: String): Observable<{ projectedCashFlowOrNetWorth: number; percentage: number }> {
    return this.httpClient.get<{ projectedCashFlowOrNetWorth: number; percentage: number }>(`${this.baseUrl}/${enterpriseId}/finances/cash-flow/projection-next-month`, { withCredentials: true })
  }
}
