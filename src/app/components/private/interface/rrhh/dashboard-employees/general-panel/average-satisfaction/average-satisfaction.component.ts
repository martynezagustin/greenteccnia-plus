import { Component, OnDestroy, OnInit } from '@angular/core';
import { EmployeesService } from '../../../../../../../services/private/rrhh/employees/employees.service';
import { NgClass } from '@angular/common';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-average-satisfaction',
  imports: [NgClass],
  templateUrl: './average-satisfaction.component.html',
  styleUrl: '../general-panel.component.css',
})
export class AverageSatisfactionComponent implements OnInit, OnDestroy {
  averageSatisfaction: number | undefined = 0
  public destroy$= new Subject<void>
  errorMessage!: String
  constructor(private employeeServices: EmployeesService) { }
  ngOnInit(): void {
    this.employeeServices.summaryEmployees$.pipe(takeUntil(this.destroy$)).subscribe(
      response => {
        this.averageSatisfaction = response?.averageSatisfaction
        if(this.averageSatisfaction === null || !this.averageSatisfaction){
          this.errorMessage = 'No hay datos'
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
