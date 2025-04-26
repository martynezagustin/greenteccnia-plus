import { Injectable } from '@angular/core';
import { environment } from '../../../../../../environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { Active } from '../../../../../../interfaces/enterprise/finances/netWorth/active/active.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ActiveService {
  baseUrl: String = environment.apiUrl
  constructor(private httpClient: HttpClient) { }
  addActive(enterpriseId: String, body: any): Observable<Active> {
    return this.httpClient.post<Active>(`${this.baseUrl}/${enterpriseId}/finances/add-active`, body, { withCredentials: true })
  }
  getAllActives(enterpriseId: String): Observable<Active[]> {
    return this.httpClient.get<Active[]>(`${this.baseUrl}/${enterpriseId}/finances/actives`, { withCredentials: true })
  }
  getTotalActivesByNumber(enterpriseId: String): Observable<Number> {
    return this.httpClient.get<Number>(`${this.baseUrl}/${enterpriseId}/finances/actives/by-number`, { withCredentials: true })
  }
  getActivesByCompositionCategory(enterpriseId: String){
    return this.httpClient.get<{category: string, amount: number, percentage: number}[]>(`${this.baseUrl}/${enterpriseId}/finances/actives/get-by-category-composition`, { withCredentials: true })
  }
  getActivesByCompositionCategoryPerPeriod(enterpriseId: String, period: 'day' | 'month' | 'year' | undefined){
    return this.httpClient.get<{category: string, amount: number, percentage: number}[]>(`${this.baseUrl}/${enterpriseId}/finances/actives/get-by-category-composition-per-${period}`, { withCredentials: true })
  }
  projectedActivesForNextDate(enterpriseId: String): Observable<Number>{
    return this.httpClient.get<Number>(`${this.baseUrl}/${enterpriseId}/finances/actives/projection-next-date`, {withCredentials: true})
  }
  projectedActivesForNextMonth(enterpriseId: String): Observable<Number>{
    return this.httpClient.get<Number>(`${this.baseUrl}/${enterpriseId}/finances/actives/projection-next-month`, {withCredentials: true})
  }
  projectedActivesForNextYear(enterpriseId: String): Observable<Number>{
    return this.httpClient.get<Number>(`${this.baseUrl}/${enterpriseId}/finances/actives/projection-next-year`, {withCredentials: true})
  }
}
