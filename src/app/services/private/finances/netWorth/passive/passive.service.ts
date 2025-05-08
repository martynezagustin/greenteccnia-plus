import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../../../environments/environment.prod';
import { Observable } from 'rxjs';
import { Passive } from '../../../../../../interfaces/enterprise/finances/netWorth/passive/passive.interface';

@Injectable({
  providedIn: 'root'
})
export class PassiveService {
  baseUrl: String = environment.apiUrl
  constructor(private httpClient: HttpClient) { }
  addPassive(enterpriseId: String, body: any) {
    return this.httpClient.post(`${this.baseUrl}/${enterpriseId}/finances/add-passive`, body, { withCredentials: true })
  }
  getAllLiabilities(enterpriseId: String): Observable<Passive[]> {
    return this.httpClient.get<Passive[]>(`${this.baseUrl}/${enterpriseId}/finances/passives`, { withCredentials: true })
  }
  getTotalLiabilitiesByNumber(enterpriseId: String): Observable<Number> {
    return this.httpClient.get<Number>(`${this.baseUrl}/${enterpriseId}/finances/passives/by-number`, { withCredentials: true })
  }
  getLiabilitiesByCompositionCategory(enterpriseId: String) {
    return this.httpClient.get<{ category: string, amount: number, percentage: number }[]>(`${this.baseUrl}/${enterpriseId}/finances/passives/get-by-category-composition`, { withCredentials: true })
  }
  getLiabilitiesByCompositionCategoryPerPeriod(enterpriseId: String, period: 'day' | 'month' | 'year' | undefined){
    return this.httpClient.get<{category: string, amount: number, percentage: number}[]>(`${this.baseUrl}/${enterpriseId}/finances/passives/get-by-category-composition-per-${period}`, { withCredentials: true })
  }
  projectedLiabilitiesForNextDate(enterpriseId: String): Observable<Number> {
    return this.httpClient.get<Number>(`${this.baseUrl}/${enterpriseId}/finances/passives/projection-next-date`, { withCredentials: true })
  }
  projectedLiabilitiesForNextMonth(enterpriseId: String): Observable<Number>{
    return this.httpClient.get<Number>(`${this.baseUrl}/${enterpriseId}/finances/passives/projection-next-month`, {withCredentials: true})
  }
  projectedLiabilitiesForNextYear(enterpriseId: String): Observable<Number>{
    return this.httpClient.get<Number>(`${this.baseUrl}/${enterpriseId}/finances/passives/projection-next-year`, {withCredentials: true})
  }
}
