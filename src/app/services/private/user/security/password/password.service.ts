import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../../../environments/environment.prod';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PasswordService {
  baseUrl: string = environment.apiUrl
  constructor(private httpClient: HttpClient) { }
  //aun queda completarlo este 
  updatePassword(userId: String, data: any): Observable<any> {
    return this.httpClient.post(`${this.baseUrl}/${userId}/update-password`, data, { withCredentials: true })
  }
  confirmUpdatePassword(userId: String, code: String): Observable<any> {
    const body = { userId, code }
    return this.httpClient.put(`${this.baseUrl}/${userId}/confirm-update-password`, body, { withCredentials: true })
  }
  validatePassword(userId: String, password: String, repeatYourPassword: String): Observable<any> {
    const body = { password, repeatYourPassword }
    return this.httpClient.post(`${this.baseUrl}/${userId}/validate-password`, body, { withCredentials: true })
  }
  forgotPassword(email: String): Observable<any> {
    const body = { email }
    return this.httpClient.post(`${this.baseUrl}/forgot-password`, body, { withCredentials: true })
  }
  //este es por la recuperación en caso de haberla olvidado
  setNewPassword(userId: String, newPassword: String, repeatNewPassword: String): Observable<any> {
    const body = { newPassword, repeatNewPassword }
    return this.httpClient.post(`${this.baseUrl}/${userId}/set-new-password`, body, { withCredentials: true })
  }
}
