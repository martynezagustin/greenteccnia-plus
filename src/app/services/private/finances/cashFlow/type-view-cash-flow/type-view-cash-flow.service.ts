import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TypeViewCashFlowService {
  constructor(private httpClient: HttpClient) { }
  typeView!: 'income' | 'expense' | null
  private localStorageKey: string = 'typeViewCashFlow'
  setTypeViewCashFlow(typeView: 'income' | 'expense') {
    localStorage.setItem(this.localStorageKey, typeView)
    this.typeView = typeView
  }
  getTypeViewCashFlow(): 'income' | 'expense' {
    return localStorage.getItem(this.localStorageKey) as 'income' | 'expense';
  }
}
