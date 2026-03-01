import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../../../environments/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class WeightService {
  baseUrl: string = environment.apiUrl
  constructor(private httpClient: HttpClient) { }
  saveWeight(enterpriseId: any, data: any) {
    return this.httpClient.put(`${this.baseUrl}/${enterpriseId}/weights-satisfaction/put`, data, { withCredentials: true })
  }
  getWeights(enterpriseId: any) {
    return this.httpClient.get(`${this.baseUrl}/${enterpriseId}/weights-satisfaction`, { withCredentials: true })
  }
}
