import { Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment.prod';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SyndicatesService {
  private baseUrl: string = environment.apiUrl
  constructor(private httpClient: HttpClient) { }
  getAllSyndicates(enterpriseId: string) {
    return this.httpClient.get<any>(`${this.baseUrl}/${enterpriseId}/syndicates`, { withCredentials: true })
  }
}
