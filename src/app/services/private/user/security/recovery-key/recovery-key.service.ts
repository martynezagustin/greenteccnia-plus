import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../../../environments/environment.prod';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecoveryKeyService {
  baseUrl: string = environment.apiUrl
  constructor(private httpClient: HttpClient) { }
  addRecoveryKey(userId: String, recoveryKey: String):Observable<any> {
    const body = { recoveryKey }
    return this.httpClient.post(`${this.baseUrl}/${userId}/recovery-key/add-recovery-key`, body, { withCredentials: true })
  }
  getRecoveryKey(userId: String):Observable<any> {
    return this.httpClient.get(`${this.baseUrl}/${userId}/recovery-key/get-recovery-key`, { withCredentials: true })
  }
}
