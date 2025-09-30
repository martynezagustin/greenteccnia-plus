import { Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { Syndicate } from '../../../../../interfaces/enterprise/rrhh/syndicates/syndicate.interface';
import { BehaviorSubject, Observable, switchMap, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SyndicatesService {
  private baseUrl: string = environment.apiUrl
  private syndicates = new BehaviorSubject<Syndicate[] | null>(null)
  syndicates$ = this.syndicates.asObservable()
  constructor(private httpClient: HttpClient) { }
  createSyndicate(enterpriseId: string, data: Syndicate): Observable<Syndicate[]> {
    return this.httpClient.post<Syndicate>(`${this.baseUrl}/${enterpriseId}/syndicates/create-syndicate`, data, { withCredentials: true }).pipe(
      switchMap(() => this.getAllSyndicates(enterpriseId))
    )
  }
  getAllSyndicates(enterpriseId: string): Observable<Syndicate[]> {
    return this.httpClient.get<Syndicate[]>(`${this.baseUrl}/${enterpriseId}/syndicates`, { withCredentials: true }).pipe(
      tap((data) => this.syndicates.next(data))
    );
  }
}
