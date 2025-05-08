import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../../../environments/environment.prod';
import { Observable } from 'rxjs';
import { Income } from '../../../../../../interfaces/enterprise/finances/cashFlow/income/income.interface';

@Injectable({
  providedIn: 'root'
})
export class IncomeService {

  constructor(private httpClient: HttpClient) { }
  baseUrl: String = environment.apiUrl
  addIncome(enterpriseId: String, body: Income): Observable<Income> {
    return this.httpClient.post<Income>(`${this.baseUrl}/${enterpriseId}/finances/add-income`, body, { withCredentials: true })
  }
  getAllIncomes(enterpriseId: String): Observable<Income[]> {
    return this.httpClient.get<Income[]>(`${this.baseUrl}/${enterpriseId}/finances/incomes`, { withCredentials: true })
  }
  getTotalIncomesByNumber(enterpriseId: String): Observable<Number> {
    return this.httpClient.get<Number>(`${this.baseUrl}/${enterpriseId}/finances/incomes/by-number`, { withCredentials: true })
  }
  getIncomesByCompositionCategory(enterpriseId: String) {
    return this.httpClient.get<{ category: string, amount: number, percentage: number }[]>(`${this.baseUrl}/${enterpriseId}/finances/incomes/get-by-category-composition`, { withCredentials: true })
  }
  getIncomesByCompositionCategoryPerPeriod(enterpriseId: String, period: 'day' | 'month' | 'year' | undefined) {
    return this.httpClient.get<{ category: string, amount: number, percentage: number }[]>(`${this.baseUrl}/${enterpriseId}/finances/incomes/get-by-category-composition-per-${period}`, { withCredentials: true })
  }
  projectedIncomesForNextDate(enterpriseId: String): Observable<Number> {
    return this.httpClient.get<Number>(`${this.baseUrl}/${enterpriseId}/finances/incomes/projection-next-date`, { withCredentials: true })
  }
  projectedIncomesForNextMonth(enterpriseId: String): Observable<Number>{
    return this.httpClient.get<Number>(`${this.baseUrl}/${enterpriseId}/finances/incomes/projection-next-month`, {withCredentials: true})
  }
  projectedIncomesForNextYear(enterpriseId: String): Observable<Number>{
    return this.httpClient.get<Number>(`${this.baseUrl}/${enterpriseId}/finances/incomes/projection-next-year`, {withCredentials: true})
  }
}
