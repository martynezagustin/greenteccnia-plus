import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardViewService {
  private key: string | null = 'selectedView'
  private selectedView = new BehaviorSubject<'cashFlow' | 'netWorth' | null>(
    (() => {
      const value = localStorage.getItem('selectedView');
      if (value === 'cashFlow' || value === 'netWorth') {
        return value;
      }
      return null;
    })()
  )
  selectedView$ = this.selectedView.asObservable()
  constructor() { }
  setView(view: 'cashFlow' | 'netWorth' | null) {
    this.selectedView.next(view)
    localStorage.setItem('selectedView', view as string)
  }
}
