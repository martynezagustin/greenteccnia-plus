import { Component, OnDestroy, OnInit } from '@angular/core';
import { EmployeesService } from '../../../../../../../services/private/rrhh/employees/employees.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-turnovers',
  imports: [],
  templateUrl: './turnovers.component.html',
  styleUrl: '../general-panel.component.css',
})
export class TurnoversComponent implements OnInit, OnDestroy {
  public destroy$ = new Subject<void>
  turnoverMonth: number = 0
  turnoverYear: number = 0
  step: number = 0
  //misc
  errorMessage: string = ''
  constructor(private employeesService: EmployeesService) { }
  ngOnInit(): void {
    this.employeesService.summaryEmployees$.pipe(takeUntil(this.destroy$)).subscribe(
      response => {
        //lógica para obtener datos de turnovers
        this.turnoverMonth = response?.turnoverMonth || 0
        this.turnoverYear = response?.turnoverYear || 0
      },
      err => {
        this.errorMessage = err.error?.message || 'Error al obtener datos de rotación';
      }

    )
  }
  ngOnDestroy(): void {
    this.destroy$.next()
    this.destroy$.complete()
  }
  nextStep() {
    this.step++
  }
  previousStep() {
    this.step--
  }
}
