import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.prod';
import { Enterprise } from '../../../../interfaces/enterprise/enterprise.interface';
import { BehaviorSubject, Observable, switchMap, tap, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EnterpriseService {
  baseUrl: string = environment.apiUrl
  key: string = 'enterpriseId'

  enterpriseId = new BehaviorSubject<string>('')
  enterpriseId$ = this.enterpriseId.asObservable()
  
  enterprise = new BehaviorSubject<Enterprise | null>(null)
  enterprise$ = this.enterprise.asObservable()

  constructor(private httpClient: HttpClient) { }
  addEnterprise(userId: String, body: any): Observable<{Enterprise: Enterprise, _id: string}> {
    return this.httpClient.post<{Enterprise: Enterprise, _id: string}>(`${this.baseUrl}/${userId}/add-enterprise`, body, { withCredentials: true }).pipe(
      tap((response) =>{
        this.enterpriseId.next(response._id)
        console.log("Mirá papá", response)
      }),
      switchMap((response) => this.getEnterprise(response._id).pipe(
        tap((enterprise) => this.enterprise.next(enterprise)),
        map((enterprise) => ({ Enterprise: enterprise, _id: response._id }))
      ))
    )
  }
  addSustainabilityOptionsToEnterprise(userId: String, body: any): Observable<any> {
    return this.httpClient.post(`${this.baseUrl}/${userId}/enterprise/add-sustainability-options`, body, { withCredentials: true })
  }
  addCertificationsAccomplished(userId: String, body: any): Observable<any> {
    return this.httpClient.post(`${this.baseUrl}/${userId}/enterprise/add-certifications-accomplished`, body, { withCredentials: true })
  }
  addInitialsSustainableObjectives(userId: String, body: any): Observable<any>{
    return this.httpClient.post(`${this.baseUrl}/${userId}/enterprise/add-initials-sustainable-objectives`, body, {withCredentials: true})
  }
  getEnterprise(enterpriseId: String): Observable<Enterprise> {
    return this.httpClient.get<Enterprise>(`${this.baseUrl}/get-enterprise/${enterpriseId}`, { withCredentials: true })
  }
  getEnterpriseId() {
    return localStorage.getItem(this.key)
  }
}
