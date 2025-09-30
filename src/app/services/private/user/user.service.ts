import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.prod';
import { User } from '../../../../interfaces/user/user.interface';
import { Observable } from 'rxjs';
import { Device } from '../../../../interfaces/security/devices/device.interface';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  userId: any = ''
  baseUrl: string = environment.apiUrl
  constructor(private httpClient: HttpClient) { }
  getUserId() {
    return localStorage.getItem("userId")
  }
  getUserInfo(userId: String): Observable<User> {
    return this.httpClient.get<User>(`${this.baseUrl}/${userId}`, { withCredentials: true })
  }
  getUserByEmail(email: String): Observable<User> {
    return this.httpClient.get<User>(`${this.baseUrl}/get-user/by-email/?email=${email}`, { withCredentials: true })
  }
  updateUser(userId: String, userData: User): Observable<any> {
    return this.httpClient.put<User>(`${this.baseUrl}/${userId}/update`, userData, { withCredentials: true })
  }
  deleteUser(userId: String, password: String, repeatYourPassword: String) {
    const body = { password, repeatYourPassword }
    return this.httpClient.post<any>(`${this.baseUrl}/${userId}/delete`, body, { withCredentials: true })
  }
  confirmDeleteUser(userId: String, code: String): Observable<any> {
    const body = { userId, code }
    return this.httpClient.post(`${this.baseUrl}/${userId}/confirm-delete-account`, body, { withCredentials: true })
  }
  verifyRegister(code: String): Observable<any> {
    const body = { code }
    return this.httpClient.post(`${this.baseUrl}/verify-register`, body, { withCredentials: true })
  }
}
