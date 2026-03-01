import { Injectable } from '@angular/core';
import { environment } from '../../../../../../environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, switchMap, tap } from 'rxjs';
import { Clasification } from '../../../../../../interfaces/enterprise/rrhh/objective/clasification/clasification.interface';

@Injectable({
  providedIn: 'root',
})
export class ClasificationService {
  private baseUrl: string = environment.apiUrl
  constructor(private httpClient: HttpClient){}
  private clasifications = new BehaviorSubject<Clasification[] | null>(null)
  clasifications$ = this.clasifications.asObservable()
  createClasification(enterpriseId: string, data: Clasification): Observable<Clasification[]>{
    return this.httpClient.post<Clasification[]>(`${this.baseUrl}/${enterpriseId}/rrhh/clasifications/create`, data, {withCredentials: true}).pipe(
      switchMap(() => this.getAllClasifications(enterpriseId))
    )
  }
  getAllClasifications(enterpriseId: string): Observable<Clasification[]>{
    return this.httpClient.get<Clasification[]>(`${this.baseUrl}/${enterpriseId}/rrhh/clasifications`, {withCredentials: true}).pipe(
      tap((data: Clasification[]) => {
        this.clasifications.next(data)
      })
    )
  }
}
