import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class ExportDataService {
  baseUrl: String = environment.apiUrl
  constructor(private httpClient: HttpClient) { }
  exportDataCSV(userId: String) {
    window.location.href = `${this.baseUrl}/${userId}/export-data/csv`
  }
  exportDataJSON(userId: String){
    window.location.href = `${this.baseUrl}/${userId}/export-data/json`
  }
  exportLogsCSV(userId: String){
    window.location.href = `${this.baseUrl}/${userId}/export-logs/csv`
  }
}
