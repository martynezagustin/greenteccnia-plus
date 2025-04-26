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
}
