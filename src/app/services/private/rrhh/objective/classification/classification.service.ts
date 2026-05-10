import { Injectable } from '@angular/core';
import { environment } from '../../../../../../environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, switchMap, tap } from 'rxjs';
import { Classification } from '../../../../../../interfaces/enterprise/rrhh/objective/clasification/classification.interface';

@Injectable({
  providedIn: 'root',
})
export class ClassificationService {
  private baseUrl: string = environment.apiUrl
  constructor(private httpClient: HttpClient){}
  private classifications = new BehaviorSubject<Classification[] | null>(null)
  classifications$ = this.classifications.asObservable()
  createClassification(enterpriseId: string, data: Classification): Observable<Classification[]>{
    return this.httpClient.post<Classification[]>(`${this.baseUrl}/${enterpriseId}/rrhh/classifications/create`, data, {withCredentials: true}).pipe(
      switchMap(() => this.getAllClassifications(enterpriseId))
    )
  }
  getAllClassifications(enterpriseId: string): Observable<Classification[]>{
    return this.httpClient.get<Classification[]>(`${this.baseUrl}/${enterpriseId}/rrhh/classifications`, {withCredentials: true}).pipe(
      tap((data: Classification[]) => {
        this.classifications.next(data)
      })
    )
  }
}
