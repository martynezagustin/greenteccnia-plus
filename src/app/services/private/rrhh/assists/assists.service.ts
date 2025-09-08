import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class AssistsService {

  constructor(private httpClient: HttpClient) { }
  baseUrl: string = environment.apiUrl
  getAllAssists(enterpriseId: string) {
    return this.httpClient.get<any>(`${this.baseUrl}/${enterpriseId}/assists`, { withCredentials: true })
  }
}
