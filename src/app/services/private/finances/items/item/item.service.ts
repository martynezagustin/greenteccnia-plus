import { Injectable } from '@angular/core';
import { environment } from '../../../../../../environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Active } from '../../../../../../interfaces/enterprise/finances/netWorth/active/active.interface';
import { Passive } from '../../../../../../interfaces/enterprise/finances/netWorth/passive/passive.interface';
import { Income } from '../../../../../../interfaces/enterprise/finances/cashFlow/income/income.interface';
import { Expense } from '../../../../../../interfaces/enterprise/finances/cashFlow/expense/expense.interface';

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  private _itemsValue$ = new BehaviorSubject<{
    label: string;
    value: number;
    percentage: number;
    items: (Income[] | Expense[] | Active[] | Passive[]);
  } | null>(null);

  public itemsValue$ = this._itemsValue$.asObservable()

  baseUrl: String = environment.apiUrl
  constructor(private httpClient: HttpClient) { }
  addItem(enterpriseId: String, item: String, body: Income): Observable<Income> {
    return this.httpClient.post<Income>(`${this.baseUrl}/${enterpriseId}/finances/add-${item}`, body, { withCredentials: true })
  }
  getAllItems(enterpriseId: String, item: String): Observable<Active[] | Passive[] | Income[] | Expense[]> {
    return this.httpClient.get<Active[] | Passive[] | Income[] | Expense[]>(`${this.baseUrl}/${enterpriseId}/finances/${item}s`, { withCredentials: true })
  }
  getValueItemsByCurrentPeriod(enterpriseId: String,
    item: String,
    period: 'date' | 'month' | 'year' | 'trimester'): Observable<{ getItemsByCurrentPeriod: number, percentage: number, items: (Income[] | Expense[] | Active[] | Passive[]) }> {
    return this.httpClient.get<{ getItemsByCurrentPeriod: number, percentage: number, items: (Income[] | Expense[] | Active[] | Passive[]) }>(`${this.baseUrl}/${enterpriseId}/finances/${item}s/values/by-current-${period}`, { withCredentials: true }).pipe(
      tap((result: any) => result.getItemsByCurrentPeriod)
    )
  }
  getTotalValueItems(enterpriseId: String, item: String){}
  getItemsByCurrentPeriod(enterpriseId: String, item: String, period: String): Observable<Active[] | Income[] | Passive[] | Expense[]> {
    return this.httpClient.get<Active[] | Income[] | Passive[] | Expense[]>(`${this.baseUrl}/${enterpriseId}/finances/${item}s/by-current-${period}`, { withCredentials: true })
  }
  getTotalItemsByNumber(enterpriseId: String, item: String): Observable<Number> {
    return this.httpClient.get<Number>(`${this.baseUrl}/${enterpriseId}/finances/${item}s/by-number`, { withCredentials: true })
  }
  getItemsByCompositionCategory(enterpriseId: String, item: String) {
    return this.httpClient.get<{ category: string, amount: number, percentage: number }[]>(`${this.baseUrl}/${enterpriseId}/finances/${item}s/get-by-category-composition`, { withCredentials: true })
  }
  getItemsByCompositionCategoryPerPeriod(enterpriseId: String, period: 'day' | 'month' | 'year' | undefined, item: String) {
    return this.httpClient.get<{ category: string, amount: number, percentage: number }[]>(`${this.baseUrl}/${enterpriseId}/finances/${item}s/get-by-category-composition-per-${period}`, { withCredentials: true })
  }
  getItemsByCompositionPaymentMethod(enterpriseId: String, item: String) {
    return this.httpClient.get<{ paymentMethod: string, amount: number, percentage: number }[]>(`${this.baseUrl}/${enterpriseId}/finances/${item}s/get-by-payment-method-composition`, { withCredentials: true })
  }
  getItemsByCompositionPaymentMethodPerPeriod(enterpriseId: String, period: 'day' | 'month' | 'year' | undefined, item: String) {
    return this.httpClient.get<{ category: string, amount: number, percentage: number }[]>(`${this.baseUrl}/${enterpriseId}/finances/${item}s/get-by-payment-method-composition-per-${period}`, { withCredentials: true })
  }
  deleteItem(enterpriseId: String, item: String, itemId: String){
    return this.httpClient.delete(`${this.baseUrl}/${enterpriseId}/finances/${item}s/delete/${itemId}`, {withCredentials: true})
  }
}
