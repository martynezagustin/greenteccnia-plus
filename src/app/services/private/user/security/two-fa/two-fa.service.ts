import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class TwoFaService {
  baseUrl: String = environment.apiUrl
  constructor(private httpClient: HttpClient) { }
  update2FAStatus(userId: String, status2FA: Boolean): Observable<any> {
    return this.httpClient.put(`${this.baseUrl}/${userId}/activate-or-desactivate-2fa`, { status2FA }, { withCredentials: true })
  }
  confirm2FAStatus(userId: String, code: String): Observable<any> {
    const body = { userId, code }
    return this.httpClient.put(`${this.baseUrl}/${userId}/confirm-2fa-status`, body, { withCredentials: true })
  }
}
