import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class TwoFaService {
  baseUrl: string = environment.apiUrl
  constructor(private httpClient: HttpClient) { }
  verify2FA(userId: any, code: string): Observable<any> {
    const body = { userId, code }
    return this.httpClient.post(`${this.baseUrl}/verify-2fa`, body, { withCredentials: true })
  }
  isSend2FA(): boolean {
    return localStorage.getItem("userId") !== null
  }
}
