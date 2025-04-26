import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.prod';
import { Enterprise } from '../../../../interfaces/enterprise/enterprise.interface';
import { Observable } from 'rxjs';
import { AuthService } from '../../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class EnterpriseService {
  baseUrl: string = environment.apiUrl
  key: string = 'enterpriseId'
  constructor(private httpClient: HttpClient) { }
  addEnterprise(userId: String, body: any): Observable<Enterprise> {
    return this.httpClient.post<Enterprise>(`${this.baseUrl}/${userId}/add-enterprise`, body, { withCredentials: true })
  }
  addSustainabilityOptionsToEnterprise(userId: String, body: any): Observable<any> {
    return this.httpClient.post(`${this.baseUrl}/${userId}/enterprise/add-sustainability-options`, body, { withCredentials: true })
  }
  addCertificationsAccomplished(userId: String, body: any): Observable<any> {
    return this.httpClient.post(`${this.baseUrl}/${userId}/enterprise/add-certifications-accomplished`, body, { withCredentials: true })
  }
  getEnterprise(enterpriseId: String): Observable<Enterprise> {
    return this.httpClient.get<Enterprise>(`${this.baseUrl}/get-enterprise/${enterpriseId}`, { withCredentials: true })
  }
  getEnterpriseId() {
    console.log(localStorage.getItem(this.key))
    return localStorage.getItem(this.key)
  }
}
