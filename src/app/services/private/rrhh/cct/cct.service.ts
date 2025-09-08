import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class CctService {
  private baseUrl: string = environment.apiUrl
  constructor(private httpClient: HttpClient) { }
  getAllCCTs(enterpriseId: string){
    return this.httpClient.get<any>(`${this.baseUrl}/${enterpriseId}/ccts`, {withCredentials: true})
  }
}
