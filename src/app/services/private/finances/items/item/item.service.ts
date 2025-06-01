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

  baseUrl: String = environment.apiUrl
  //para actualizar en vivo
  private itemsSubject = new BehaviorSubject<Active[] | Passive[] | Income[] | Expense[] | null>(null)
  itemsSubject$ = this.itemsSubject.asObservable()
  // Observable to expose the itemsValue$ BehaviorSubject
  private viewItemSubject = new BehaviorSubject<'active' | 'passive' | 'income' | 'expense'>('income')
  viewItem$ = this.viewItemSubject.asObservable()

  //asignar el tipo para aggregar
  private addItemSubject = new BehaviorSubject<'active' | 'passive' | 'income' | 'expense'>('income')
  addItemSubject$ = this.addItemSubject.asObservable()

  //buscar el item a editar
  private loadingItemSubjectToUpdate = new BehaviorSubject<Active | Passive | Income | Expense | null>(null)
  loadingItemSubjectToUpdate$ = this.loadingItemSubjectToUpdate.asObservable()

  setViewItem(view: 'active' | 'passive' | 'income' | 'expense') {
    this.viewItemSubject.next(view)
  }
  setAddItem(view: 'active' | 'passive' | 'income' | 'expense') {
    this.addItemSubject.next(view)
  }
  setItemToUpdate(item: Active | Passive | Income | Expense | null) {
    this.loadingItemSubjectToUpdate.next(item)
  }
  setItems(items: Active[] | Passive[] | Income[] | Expense[]) {
    this.itemsSubject.next(items)
  }

  constructor(private httpClient: HttpClient) { }

  addItem(enterpriseId: String, item: String, body: Income | Expense | Active | Passive): Observable<{ message: string }> {
    return this.httpClient.post<{ message: string }>(`${this.baseUrl}/${enterpriseId}/finances/add-${item}`, body, { withCredentials: true })
  }
  getAllItems(enterpriseId: String, item: String): Observable<Active[] | Passive[] | Income[] | Expense[]> {
    console.log("Obteniendo todos los items de tipo", item, "para la empresa", enterpriseId)
    return this.httpClient.get<Active[] | Passive[] | Income[] | Expense[]>(`${this.baseUrl}/${enterpriseId}/finances/${item}s`, { withCredentials: true })
  }
  getValueItemsByCurrentPeriod(enterpriseId: string | null,
    item: String,
    period: 'date' | 'month' | 'year' | 'trimester'): Observable<{ getItemsByCurrentPeriod: number, percentage: number, items: (Income[] | Expense[] | Active[] | Passive[]) }> {
    console.log("Item", item, "periodo", period)
    return this.httpClient.get<{ getItemsByCurrentPeriod: number, percentage: number, items: (Income[] | Expense[] | Active[] | Passive[]) }>(`${this.baseUrl}/${enterpriseId}/finances/${item}s/values/by-current-${period}`, { withCredentials: true })
  }
  getItemsByCurrentPeriod(enterpriseId: String, item: String, period: String): Observable<Active[] | Income[] | Passive[] | Expense[]> {
    return this.httpClient.get<Active[] | Income[] | Passive[] | Expense[]>(`${this.baseUrl}/${enterpriseId}/finances/${item}s/by-current-${period}`, { withCredentials: true })
  }
  getTotalItemsByNumber(enterpriseId: String, item: String): Observable<Number> {
    return this.httpClient.get<Number>(`${this.baseUrl}/${enterpriseId}/finances/${item}s/by-number`, { withCredentials: true })
  }
  getItemsByCompositionCategory(enterpriseId: String, item: String) {
    return this.httpClient.get<{ category: string, amount: number, percentage: number }[]>(`${this.baseUrl}/${enterpriseId}/finances/${item}s/get-by-category-composition`, { withCredentials: true })
  }
  getItemsByCompositionCategoryPerPeriod(enterpriseId: String, period: 'day' | 'month' | 'year' | 'trimester' | undefined, item: String) {
    console.log(`${this.baseUrl}/${enterpriseId}/finances/${item}s/get-by-category-composition-per-${period}`)
    return this.httpClient.get<{ category: string, amount: number, percentage: number }[]>(`${this.baseUrl}/${enterpriseId}/finances/${item}s/get-by-category-composition-per-${period}`, { withCredentials: true })
  }
  getItemsByCompositionPaymentMethod(enterpriseId: String, item: String) {
    return this.httpClient.get<{ paymentMethod: string, amount: number, percentage: number }[]>(`${this.baseUrl}/${enterpriseId}/finances/${item}s/get-by-payment-method-composition`, { withCredentials: true })
  }
  getItemsByCompositionPaymentMethodPerPeriod(enterpriseId: String, period: 'day' | 'month' | 'year' | undefined, item: String) {
    return this.httpClient.get<{ category: string, amount: number, percentage: number }[]>(`${this.baseUrl}/${enterpriseId}/finances/${item}s/get-by-payment-method-composition-per-${period}`, { withCredentials: true })
  }
  deleteItem(enterpriseId: String, item: String, itemId: String) {
    return this.httpClient.delete(`${this.baseUrl}/${enterpriseId}/finances/${item}s/delete/${itemId}`, { withCredentials: true })
  }
  updateItem(enterpriseId: String, item: 'active' | 'passive' | 'income' | 'expense', body: Income | Active | Passive | Expense, itemId: String): Observable<{ message: string }> {
    return this.httpClient.put<{ message: string }>(`${this.baseUrl}/${enterpriseId}/finances/${item}s/update/${itemId}`, body, { withCredentials: true }).pipe(
      tap(() => {
        this.getAllItems(enterpriseId, item).subscribe((items) => {
          this.setItems(items)
        }
        )
      })
    )
  }
}
