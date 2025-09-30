import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocationService {
  private apiUrlCountries: string = 'https://restcountries.com/v3.1/all?fields=name,cca2,flags'
  private apiUrlProvincesOrStates: string = 'https://countriesnow.space/api/v0.1/countries/states'
  constructor(private httpClient: HttpClient) { }
  getCountries(): Observable<any[]> {
    return this.httpClient.get<any[]>(this.apiUrlCountries)
  }
  getProvincesOrStates(country: string): Observable<any> {
    return this.httpClient.post<any>(this.apiUrlProvincesOrStates, { country })
  }

}
