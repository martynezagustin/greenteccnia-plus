import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../../../environments/environment.prod';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InactivityPeriodService {
  baseUrl: String = environment.apiUrl
  constructor(private httpClient: HttpClient) { }
  updateRetentionData(userId: String, inactivityPeriod: Date): Observable<any> {
    const body = { inactivityPeriod };
    return this.httpClient.post<Observable<any>>(`${this.baseUrl}/${userId}/update-retention-data`, body, { withCredentials: true });
  }
}
