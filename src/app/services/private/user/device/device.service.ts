import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment.prod';
import { Device } from '../../../../../interfaces/security/devices/device.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DeviceService {
  baseUrl: String = environment.apiUrl
  constructor(private httpClient: HttpClient) { }
  getDevices(userId: String): Observable<Device[]> {
    return this.httpClient.get<Device[]>(`${this.baseUrl}/${userId}/devices`, { withCredentials: true })
  }
  deleteDevice(userId: String, deviceId: String) {
    return this.httpClient.delete(`${this.baseUrl}/${userId}/devices/delete-device/${deviceId}`, { withCredentials: true })
  }
  getConfirmDevice(userId: String): Observable<Device> {
    return this.httpClient.get<Device>(`${this.baseUrl}/${userId}/get-device-confirm`, { withCredentials: true })
  }
  setTrustedDevice(userId: String, deviceId: String, isTrusted: Boolean): Observable<any> {
    return this.httpClient.post(`${this.baseUrl}/${userId}/confirm-device/${deviceId}`, { isTrusted }, { withCredentials: true })
  }
}
