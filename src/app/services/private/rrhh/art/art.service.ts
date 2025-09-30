import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment.prod';
import { BehaviorSubject, Observable, switchMap, tap } from 'rxjs';
import { ART } from '../../../../../interfaces/enterprise/rrhh/arts/art.interface';

@Injectable({
  providedIn: 'root'
})
export class ArtService {
  baseUrl: string = environment.apiUrl
  private ARTs = new BehaviorSubject<ART[] | null>(null)
  ARTs$ = this.ARTs.asObservable()
  constructor(private httpClient: HttpClient) { }
  createART(enterpriseId: string, data: ART): Observable<ART[]> {
    return this.httpClient.post<ART>(`${this.baseUrl}/${enterpriseId}/arts/add-art`, data, { withCredentials: true }).pipe(
      switchMap(() => this.getAllARTs(enterpriseId))
    )
  }
  getAllARTs(enterpriseId: string): Observable<ART[]> {
    return this.httpClient.get<ART[]>(`${this.baseUrl}/${enterpriseId}/arts`, { withCredentials: true }).pipe(
      tap((data: ART[]) => {
        this.ARTs.next(data)
      })
    )
  }
}
