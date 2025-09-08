import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment.prod';
import { BehaviorSubject, forkJoin, Observable } from 'rxjs';
import { NetWorthFullData } from '../../../../../interfaces/enterprise/finances/cashFlow/models/net-worth.interface';

@Injectable({
  providedIn: 'root'
})
export class NetWorthService {
  baseUrl: String = environment.apiUrl
  constructor(private httpClient: HttpClient) { }

  private fullNetWorth = new BehaviorSubject<NetWorthFullData | null>(null)
  fullNetWorth$ = this.fullNetWorth.asObservable()

  refreshAllNetWorthData(enterpriseId: string) {
    const periods = ['month', 'trimester', 'year']
    const requests = [
      this.getNetWorth(enterpriseId),
      ...periods.map(period => this.getNetWorthByCurrentPeriod(enterpriseId, period as 'month' | 'trimester' | 'year')),
    ];
    forkJoin(requests).subscribe(([total, trimester, month, year]) => {
      const fullData: NetWorthFullData = {
        total: total as number,
        currentTrimester: (trimester as any).netWorthByCurrentPeriod,
        currentMonth: (month as any).netWorthByCurrentPeriod,
        currentYear: (year as any).netWorthByCurrentPeriod,
        percentages: {
          currentTrimester: (trimester as any).percentage,
          currentMonth: (month as any).percentage,
          currentYear: (year as any).percentage
        }
      }
      this.fullNetWorth.next(fullData)
    })
  }
  getNetWorth(enterpriseId: String): Observable<Number> {
    return this.httpClient.get<Number>(`${this.baseUrl}/${enterpriseId}/finances/net-worth`, { withCredentials: true });
  }
  getNetWorthByCurrentPeriod(enterpriseId: string | null, period: 'year' | 'month' | 'trimester'): Observable<{ netWorthByCurrentPeriod: number, percentage: number }> {
    return this.httpClient.get<{ netWorthByCurrentPeriod: number; percentage: number }>(`${this.baseUrl}/${enterpriseId}/finances/net-worth/by-current-${period}`, { withCredentials: true })
  }
}
