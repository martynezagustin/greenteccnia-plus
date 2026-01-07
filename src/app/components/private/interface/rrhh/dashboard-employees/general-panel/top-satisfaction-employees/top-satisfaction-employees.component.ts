import { Component, OnDestroy, OnInit } from '@angular/core';
import { EmployeesService } from '../../../../../../../services/private/rrhh/employees/employees.service';
import { NgClass } from '@angular/common';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-top-satisfaction-employees',
  imports: [NgClass],
  templateUrl: './top-satisfaction-employees.component.html',
  styleUrl: '../general-panel.component.css',
})
export class TopSatisfactionEmployeesComponent implements OnInit, OnDestroy{
  public destroy$ = new Subject<void>
  topEmployees: {name: string, lastname: string, index: number}[] = []
  errorMessage!: String
  constructor(private employeesService: EmployeesService){}
  ngOnInit(): void {
    this.errorMessage = ''
    this.employeesService.summaryEmployees$.pipe(takeUntil(this.destroy$)).subscribe(
      response => {
        this.errorMessage = ''
        this.topEmployees = response?.topEmployeesOfSatisfaction || []
        if(!this.topEmployees || this.topEmployees.length === 0) {
          this.errorMessage = 'No pueden mostrarse datos de satisfacción laboral.'
        }
      },
      err => {
        this.errorMessage = err.error.message
      }
    )
  }
  ngOnDestroy(): void {
    this.destroy$.next()
    this.destroy$.complete()
  }
}
