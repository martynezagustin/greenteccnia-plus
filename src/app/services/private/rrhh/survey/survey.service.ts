import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { environment } from '../../../../../environments/environment.prod';
import { Survey } from '../../../../../interfaces/enterprise/rrhh/surveyGreen/survey/survey.interface';
import { EmployeesService } from '../employees/employees.service';

@Injectable({
  providedIn: 'root'
})
export class SurveyService {
  baseUrl: string = environment.apiUrl
  //¿por qué employee service? porque ahí está la lógica para recargar los cambios en vivo con behavior subject, 
  constructor(private httpClient: HttpClient, private employeeService: EmployeesService) { }
  createSurvey(enterpriseId: string, employeeId: string, surveyData: Survey): Observable<Survey> {
    console.log(surveyData);
    return this.httpClient.post<Survey>(`${this.baseUrl}/${enterpriseId}/employees/${employeeId}/surveys/create-survey`, surveyData, { withCredentials: true }).pipe((
      tap(() => {
        //una vez creamos la encuesta, recargamos en vivo al empleado
        this.employeeService.getEmployee(enterpriseId, employeeId).subscribe(
          response => {
            this.employeeService.employeeToView.next(response.employee._id);
          }
        );
      })
    ))
  }
  getIdOffEmployeeForSurvey(): string | null {
    return localStorage.getItem('employeeIdForSurvey');
  }
}
