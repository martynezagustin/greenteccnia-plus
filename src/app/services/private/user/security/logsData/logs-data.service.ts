import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LogUser } from '../../../../../../interfaces/security/logsUser/logUser.interface';
import { environment } from '../../../../../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class LogsDataService {
  baseUrl: String = environment.apiUrl
  constructor(private httpClient: HttpClient) { }
  getLogs(userId: String){
    return this.httpClient.get<LogUser[]>(`${this.baseUrl}/${userId}/logs`, {withCredentials: true})
  }
}
