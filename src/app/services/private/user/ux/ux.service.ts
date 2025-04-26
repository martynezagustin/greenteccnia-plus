import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment.prod';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UxService {

  baseUrl: string = environment.apiUrl
  constructor(private httpClient: HttpClient) { }
  changeTheme(userId: String, darkMode: Boolean) {
    const body = { darkMode }
    return this.httpClient.post(`${this.baseUrl}/${userId}/change-theme`, body, { withCredentials: true })
  }
  changeFont(userId: String, montserratFont: Boolean) {
    const body = { montserratFont }
    return this.httpClient.post(`${this.baseUrl}/${userId}/change-font`, body, { withCredentials: true })
  }
  changeButtonsStyle(userId: String, roundedButtons: Boolean) {
    const body = { roundedButtons }
    return this.httpClient.post(`${this.baseUrl}/${userId}/change-buttons-style`, body, { withCredentials: true })
  }
  setMonochrome(userId: String, monochromeStatus: Boolean) {
    const body = { monochromeStatus }
    return this.httpClient.post(`${this.baseUrl}/${userId}/set-monochrome`, body, { withCredentials: true })
  }
  getUxOptions(userId: String): Observable<any> {
    return this.httpClient.get(`${this.baseUrl}/${userId}/ux-options`, { withCredentials: true })
  }
}
