import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment.prod';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SustainabilityObjectiveService {
  baseUrl: String = environment.apiUrl
  constructor(private httpClient: HttpClient) { }
  addSustainabilityObjective(enterpriseId: String, body: any): Observable<any> {
    return this.httpClient.post<any>(`${this.baseUrl}/${enterpriseId}/sustainability/add-sustainable-objective`, body, { withCredentials: true });
  }
}
