import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TypeViewNetWorthService {
  typeView!: 'active' | 'passive' | null
  private localStorageKey: string = 'typeViewNetWorth'
  constructor() { }
  setTypeViewNetWorth(typeView: 'active' | 'passive') {
    localStorage.setItem(this.localStorageKey, typeView)
    this.typeView = typeView
  }
  getTypeViewNetWorth(): 'active' | 'passive' {
    return localStorage.getItem(this.localStorageKey) as 'active' | 'passive';
  }
}
