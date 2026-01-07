import { NgClass } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { EmployeesService } from '../../../../../../../services/private/rrhh/employees/employees.service';
import { error } from 'console';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-work-environment',
  imports: [NgClass],
  templateUrl: './work-environment.component.html',
  styleUrl: '../general-panel.component.css',
})
export class WorkEnvironmentComponent implements OnInit, OnDestroy{
  public destroy$ = new Subject<void>
  workEnvironmentCurrent!: number | undefined
  message!: string | undefined
  errorMessage!: String
  constructor(private employeesService: EmployeesService){}
  ngOnInit(): void {
    this.employeesService.summaryEmployees$.pipe(takeUntil(this.destroy$)).subscribe(
      response => {
        this.workEnvironmentCurrent = response?.workEnvironment.workEnvironmentCurrent
        this.message = response?.workEnvironment.message
        if(!this.workEnvironmentCurrent || this.workEnvironmentCurrent === null){
          this.errorMessage = 'No hay datos'
        } 
      },
      err => {
        this.errorMessage = err.error.message || 'No hay datos.'
      }
    )
  }
  ngOnDestroy(): void {
    this.destroy$.next()
    this.destroy$.complete()
  }
}
