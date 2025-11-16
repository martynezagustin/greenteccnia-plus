import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment.prod';
import { Survey } from '../../../../../interfaces/enterprise/rrhh/surveyGreen/survey/survey.interface';

@Injectable({
  providedIn: 'root'
})
export class SurveyService {
  baseUrl: string = environment.apiUrl
  constructor(private httpClient: HttpClient) { }
  createSurvey(enterpriseId: string, employeeId: string, surveyData: Survey): Observable<Survey>{
    console.log(surveyData);
    
    return this.httpClient.post<Survey>(`${this.baseUrl}/${enterpriseId}/employees/${employeeId}/surveys/create-survey`, surveyData, {withCredentials: true})
  }
  setIdOffEmployeeForSurvey(id: string): void {
    localStorage.setItem('employeeIdForSurvey', id);
  }
  getIdOffEmployeeForSurvey(): string | null {
    return localStorage.getItem('employeeIdForSurvey');
  }
}
