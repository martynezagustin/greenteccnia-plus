import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SuspiciousLogin } from '../../../../../../interfaces/security/suspiciousLogin/suspiciousLogin.interface';
import { environment } from '../../../../../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class SuspiciousLoginService {
  private baseUrl: String = environment.apiUrl
  constructor(private httpClient: HttpClient) { }
  getSuspiciousLogins(userId: String): Observable<SuspiciousLogin[]> {
    return this.httpClient.get<SuspiciousLogin[]>(`${this.baseUrl}/${userId}/suspicious-logins`, { withCredentials: true });
  }
  setSuspiciousLogin(userId: String, suspiciousLoginId: String, pendingActionByUser: String): Observable<SuspiciousLogin> {
    const body = {pendingActionByUser}
    return this.httpClient.put<SuspiciousLogin>(`${this.baseUrl}/${userId}/suspicious-logins/${suspiciousLoginId}/update-suspicious-login`, body, { withCredentials: true });
  }
  confirmStatusSuspiciousLogin(userId: String, code: String): Observable<any> {
    const body = {userId, code}
    return this.httpClient.post<any>(`${this.baseUrl}/${userId}/suspicious-logins/status`, body, { withCredentials: true })
  }
}
