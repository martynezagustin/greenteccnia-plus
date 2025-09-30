import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment.prod';
import { BehaviorSubject, Observable, switchMap, tap } from 'rxjs';
import { CCT } from '../../../../../interfaces/enterprise/rrhh/ccts/cct.interface';

@Injectable({
  providedIn: 'root'
})
export class CctService {
  private baseUrl: string = environment.apiUrl
  constructor(private httpClient: HttpClient) { }

  //obtener arrays
  private CCTs = new BehaviorSubject<CCT[] | null>(null)
  CCTs$ = this.CCTs.asObservable()

  //obtener unico
  private CCT = new BehaviorSubject<CCT | null>(null)
  CCT$ = this.CCT.asObservable()
  addCCT(enterpriseId: string, data: CCT): Observable<CCT[]> {
    return this.httpClient.post<CCT>(`${this.baseUrl}/${enterpriseId}/ccts/add-cct`, data, { withCredentials: true }).pipe(
      switchMap(() => this.getAllCCTs(enterpriseId))
    )
  }
  getCCTByName(enterpriseId: string, name: string): Observable<CCT> {
    return this.httpClient.get<CCT>(`${this.baseUrl}/${enterpriseId}/ccts/by-name/${name}`, { withCredentials: true }).pipe(
      tap((data: CCT) => {
        this.CCT.next(data)
      })
    )
  }
  getAllCCTs(enterpriseId: string) {
    return this.httpClient.get<CCT[]>(`${this.baseUrl}/${enterpriseId}/ccts`, { withCredentials: true }).pipe(
      tap((data: CCT[]) => {
        this.CCTs.next(data)
      })
    )
  }
}
