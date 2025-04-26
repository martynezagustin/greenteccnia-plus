import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../../../environments/environment.prod';
import { Observable } from 'rxjs';
import { Income } from '../../../../../../interfaces/enterprise/finances/cashFlow/income/income.interface';

@Injectable({
  providedIn: 'root'
})
export class IncomeService {

  constructor(private httpClient: HttpClient) {}
  baseUrl: String = environment.apiUrl
  addIncome(enterpriseId: String, body: Income): Observable<Income>{
    return this.httpClient.post<Income>(`${this.baseUrl}/${enterpriseId}/finances/add-income`, body, {withCredentials: true})
  }
  getIncomesesByCompositionConcept(enterpriseId: String){
    return this.httpClient.get<{category: string, amount: number, percentage: number}[]>(`${this.baseUrl}/${enterpriseId}/finances/actives/get-by-category-composition`, { withCredentials: true })
  }
}
