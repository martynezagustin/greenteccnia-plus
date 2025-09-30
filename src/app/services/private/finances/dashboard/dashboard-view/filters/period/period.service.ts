import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PeriodService {
  private selectedPeriodSubject = new BehaviorSubject<'month' | 'year' | 'trimester'>('month')
  selectedPeriod$ = this.selectedPeriodSubject.asObservable()
  constructor() { }
  // Método para actualizar el selectedPeriod
  setSelectedPeriod(period: 'month' | 'year' | 'trimester') {
    this.selectedPeriodSubject.next(period);
  }
}
