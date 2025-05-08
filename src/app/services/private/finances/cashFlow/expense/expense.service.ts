import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../../../environments/environment.prod';
import { Expense } from '../../../../../../interfaces/enterprise/finances/cashFlow/expense/expense.interface';

@Injectable({
  providedIn: 'root'
})
export class ExpenseService {
  baseUrl: String = environment.apiUrl
  constructor(private httpClient: HttpClient) { }
  addExpense(enterpriseId: String, body: any): Observable<Expense> {
    return this.httpClient.post<Expense>(`${this.baseUrl}/${enterpriseId}/finances/add-expense`, body, { withCredentials: true })
  }
  getTotalExpensesByNumber(enterpriseId: String): Observable<Number> {
    return this.httpClient.get<Number>(`${this.baseUrl}/${enterpriseId}/finances/expenses/by-number`, { withCredentials: true })
  }

  getAllExpenses(enterpriseId: String): Observable<Expense[]> {
    return this.httpClient.get<Expense[]>(`${this.baseUrl}/${enterpriseId}/finances/expenses`, { withCredentials: true })
  }
  getExpensesByCompositionCategory(enterpriseId: String) {
    return this.httpClient.get<{ category: string, amount: number, percentage: number }[]>(`${this.baseUrl}/${enterpriseId}/finances/expenses/get-by-category-composition`, { withCredentials: true })
  }
  getExpensesByCompositionCategoryPerPeriod(enterpriseId: String, period: 'day' | 'month' | 'year' | undefined) {
    return this.httpClient.get<{ category: string, amount: number, percentage: number }[]>(`${this.baseUrl}/${enterpriseId}/finances/expenses/get-by-category-composition-per-${period}`, { withCredentials: true })
  }
  projectedExpensesForNextDate(enterpriseId: String): Observable<Number> {
    return this.httpClient.get<Number>(`${this.baseUrl}/${enterpriseId}/finances/expenses/projection-next-date`, { withCredentials: true })
  }
  projectedExpensesForNextMonth(enterpriseId: String): Observable<Number> {
    return this.httpClient.get<Number>(`${this.baseUrl}/${enterpriseId}/finances/expenses/projection-next-month`, { withCredentials: true })
  }
  projectedExpensesForNextYear(enterpriseId: String): Observable<Number> {
    return this.httpClient.get<Number>(`${this.baseUrl}/${enterpriseId}/finances/expenses/projection-next-year`, { withCredentials: true })
  }
}
