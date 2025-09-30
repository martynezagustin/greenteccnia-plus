import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment.prod';
import { BehaviorSubject, Observable, switchMap, tap } from 'rxjs';
import { Bank } from '../../../../../interfaces/enterprise/rrhh/banks/bank.interface';

@Injectable({
  providedIn: 'root'
})
export class BankService {
  private baseUrl: string = environment.apiUrl

  private banks = new BehaviorSubject<Bank[] | null>(null)
  banks$ = this.banks.asObservable()
  constructor(private httpClient: HttpClient) { }
  createBank(enterpriseId: string, data: any) {
    return this.httpClient.post(`${this.baseUrl}/${enterpriseId}/banks/create-bank`, data, { withCredentials: true }).pipe(
      switchMap(() => this.getAllBanks(enterpriseId))
    )
  }
  getBank(enterpriseId: string, bankId: string) {
    return this.httpClient.get(`${this.baseUrl}/${enterpriseId}/banks/${bankId}`, { withCredentials: true })
  }
  getAllBanks(enterpriseId: string): Observable<Bank[]>{
    return this.httpClient.get<Bank[]>(`${this.baseUrl}/${enterpriseId}/banks`, { withCredentials: true }).pipe(
      tap((data: Bank[]) => {
        this.banks.next(data)
      })
    )
  }
}
