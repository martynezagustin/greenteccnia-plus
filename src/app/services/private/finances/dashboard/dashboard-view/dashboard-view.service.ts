import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DashboardViewService {
  private keyLocalStorage = 'typeDashboard'
  constructor() { }
  setView(view: 'cashFlow' | 'netWorth'){
    localStorage.setItem(this.keyLocalStorage, view)
  }
  getView(): 'cashFlow' | 'netWorth' | null{
    const view = localStorage.getItem(this.keyLocalStorage)
    if(view == 'cashFlow' || view == 'netWorth'){
      return view
    }
    return null
  }
  clearView(){
    localStorage.removeItem(this.keyLocalStorage)
  }
}
