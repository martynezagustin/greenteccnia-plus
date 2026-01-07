import { Component, OnDestroy, OnInit } from '@angular/core';
import { EmployeesService } from '../../../../../../../services/private/rrhh/employees/employees.service';
import { NgClass } from '@angular/common';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-total-employees',
  imports: [NgClass],
  templateUrl: './total-employees.component.html',
  styleUrls: ['../general-panel.component.css'],
})
export class TotalEmployeesComponent implements OnInit, OnDestroy {
  currentTotalEmployees: number = 0
  growth: number = 0
  constructor(private employeeService: EmployeesService) { }
  public destroy$ = new Subject<void>
  ngOnInit(): void {
    this.employeeService.summaryEmployees$.pipe(takeUntil(this.destroy$)).subscribe(
      response => {
        this.currentTotalEmployees = response?.totalEmployees.current || 0
        this.growth = response ?.totalEmployees.growth || 0
      }
    )
  }
  ngOnDestroy(): void {
    this.destroy$.next()
    this.destroy$.complete()
  }
}
