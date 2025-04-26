import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { environment } from '../../../environments/environment.prod';
import { Router } from '@angular/router';
import { User } from '../../../interfaces/user/user.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private authState = new BehaviorSubject<boolean>(false)
  public isAuthenticated$ = this.authState.asObservable()
  baseUrl: string = environment.apiUrl

  constructor(private httpClient: HttpClient, private router: Router) { }
  registerUser(data: any): Observable<User> {
    return this.httpClient.post<User>(`${this.baseUrl}/register`, data, {withCredentials: true})
  }
  logIn(username: String, password: String): Observable<any> {
    const body = { username, password }
    return this.httpClient.post(`${this.baseUrl}/login`, body, { withCredentials: true }).pipe(
      tap(()=> {
        this.authState.next(true)
      })
    )
  }
  logInWithRecoveryKey(username: String, recoveryKey: String): Observable<any> {
    const body = { username, recoveryKey }
    return this.httpClient.post<User>(`${this.baseUrl}/login-with-recovery-key`, body, { withCredentials: true })
  }
  logOut(): Observable<any> {
    return this.httpClient.post<any>(`${this.baseUrl}/logout`, {}, { withCredentials: true }).pipe(
      tap(()=> {
        this.authState.next(false)
      })
    )
  }
  verify2FALogIn(userId: string, code: String): Observable<any> {
    const body = { userId, code }
    return this.httpClient.post<User>(`${this.baseUrl}/verify-2fa`, body, { withCredentials: true }).pipe(
      tap(()=> {
        this.authState.next(true)
      })
    )
  }
  isAuthenticated(): boolean {
    this.authState.next(true)
    return document.cookie.includes("token")
  }
  getCookie() {
    return this.httpClient.get(`${this.baseUrl}/get-cookie`, { withCredentials: true })
  }
}
