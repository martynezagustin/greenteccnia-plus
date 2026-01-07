import { Component, OnDestroy, OnInit } from '@angular/core';
import { EmployeesService } from '../../../../../../../services/private/rrhh/employees/employees.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-antiquity',
  imports: [],
  templateUrl: './antiquity.component.html',
  styleUrls: ['../general-panel.component.css'],
})
export class AntiquityComponent implements OnInit, OnDestroy{
  textAntiquity: string = ''
  public destroy$ = new Subject<void>
  constructor(private employeesService: EmployeesService){}
  ngOnInit(): void {
    this.employeesService.summaryEmployees$.pipe(takeUntil(this.destroy$)).subscribe(
      response =>{
        this.textAntiquity = response?.averageAntiquity || ''
      }
    )
  }
  ngOnDestroy(): void {
    this.destroy$.next()
    this.destroy$.complete()
  }
}
