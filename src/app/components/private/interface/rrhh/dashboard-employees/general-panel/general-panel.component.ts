import { Component, OnInit } from '@angular/core';
import { SummaryEmployees } from '../../../../../../../interfaces/enterprise/rrhh/employees/dashboard/summary-employeees.interface';
import { EmployeesService } from '../../../../../../services/private/rrhh/employees/employees.service';
import { TotalEmployeesComponent } from "./total-employees/total-employees.component";
import { TurnoversComponent } from "./turnovers/turnovers.component";
import { AntiquityComponent } from "./antiquity/antiquity.component";
import { TopSatisfactionEmployeesComponent } from "./top-satisfaction-employees/top-satisfaction-employees.component";
import { GenderParityComponent } from "./gender-parity/gender-parity.component";
import { DepartmentsCompositionComponent } from "./departments-composition/departments-composition.component";
import { AverageSatisfactionComponent } from './average-satisfaction/average-satisfaction.component';
import { AssistsTodayComponent } from "./assists-today/assists-today.component";
import { WorkEnvironmentComponent } from './work-environment/work-environment.component';
import { WorkEnvironmentEvolutionComponent } from "./work-environment-evolution/work-environment-evolution.component";
import { ListEmployeesComponent } from "./list-employees/list-employees.component";

@Component({
  selector: 'app-general-panel',
  imports: [TotalEmployeesComponent, TurnoversComponent, AntiquityComponent, GenderParityComponent, DepartmentsCompositionComponent, TopSatisfactionEmployeesComponent, AverageSatisfactionComponent, AssistsTodayComponent, WorkEnvironmentComponent, WorkEnvironmentEvolutionComponent, ListEmployeesComponent],
  templateUrl: './general-panel.component.html',
  styleUrls: ['../dashboard-employees.component.css', './general-panel.component.css']
})
export class GeneralPanelComponent implements OnInit {
  summaryEmployees: SummaryEmployees | null = null
  errorMessage: string = ''
  //misc
  loading: Boolean = true
  constructor(private employeesService: EmployeesService) { }
  ngOnInit(): void {
    this.errorMessage = ''
    this.employeesService.summaryEmployees$.subscribe(
      response => {
        if(!response) return
        this.summaryEmployees = response
        this.loading = false
      },
      err => {
        this.errorMessage = err.error?.message || 'Ha ocurrido un error inesperado. Inténtelo más tarde.'
        this.loading = false
      }
    )
  }
  setNullEmployeeToEdit(){
    this.employeesService.setEmployeeToEdit(null)
  }
}
