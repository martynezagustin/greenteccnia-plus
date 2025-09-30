import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment.prod';
import { Observable } from 'rxjs';
import { SustainableObjective } from '../../../../../interfaces/enterprise/sustainability/sustainable-objective.interface';

@Injectable({
  providedIn: 'root'
})
export class SustainabilityObjectiveService {
  baseUrl: String = environment.apiUrl
  constructor(private httpClient: HttpClient) { }
  addSustainabilityObjective(enterpriseId: any, body: any): Observable<SustainableObjective> {
    return this.httpClient.post<any>(`${this.baseUrl}/${enterpriseId}/sustainability/add-sustainable-objective`, body, { withCredentials: true });
  }
}
