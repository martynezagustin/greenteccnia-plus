import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { EmployeesService } from '../../../../../../../services/private/rrhh/employees/employees.service';
import { ChartComponent } from 'ng-apexcharts';
import { ApexChart } from 'ng-apexcharts'
import { DepartmentGenderParity } from '../../../../../../../../interfaces/enterprise/rrhh/employees/dashboard/bases-summary-employees.interface';
import { Subject, takeUntil } from 'rxjs';

export type ChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  labels: string[],
  legend: ApexLegend,
  colors: string[]
}

@Component({
  selector: 'app-gender-parity',
  imports: [ChartComponent],
  standalone: true,
  templateUrl: './gender-parity.component.html',
  styleUrl: '../general-panel.component.css',
})
export class GenderParityComponent implements OnInit, OnDestroy {
  public destroy$ = new Subject<void>
  genderParity!: { [key: string]: number }
  genderParityPerDepartments!: {[department: string]: DepartmentGenderParity}
  currentIndex: number = 0
  @ViewChild("chart") chart!: ChartComponent;
  public chartOptions!: Partial<ChartOptions>
  errorMessage!: String
  constructor(private employeeService: EmployeesService) { }
  ngOnInit(): void {
    this.errorMessage = ''
    this.employeeService.summaryEmployees$.pipe(takeUntil(this.destroy$)).subscribe(
      response => {
        this.genderParity = response?.totalGender
        this.genderParityPerDepartments = response?.totalGenderPerDepartments ?? {}
        this.currentIndex = 0
        this.renderStep()
      }
    )
  }
  ngOnDestroy(): void {
    this.destroy$.next()
    this.destroy$.complete()
  }
  renderStep() {
    this.errorMessage = ''
    if (this.currentIndex === 0) {
      const series = Object.values(this.genderParity)
      const labels = Object.keys(this.genderParity)
      this.printChart(series, labels)
      return
    }
    //STEPS }
    const departments = Object.entries(this.genderParityPerDepartments)
    const dept = departments[this.currentIndex - 1]
    if (!dept) return

    const [deptName, deptData] = dept

    const series = Object.values(deptData.parity)
    const labels = Object.keys(deptData.parity)
    this.printChart(series, labels)
  }
  printChart(series: any, labels: string[]) {
    if (!series || series.length === 0) {
      this.errorMessage = 'No pueden graficarse datos si no hay empleados.';
      return;
    }
    this.chartOptions = {
      series,
      chart: {
        type: 'donut'
      },
      labels,
      legend: { position: 'bottom', labels: {colors: '#FFF', useSeriesColors: false} },
      colors: ['springreen']
    };
  }
  next() {
    if(this.currentIndex < Object.keys(this.genderParityPerDepartments).length){
      this.currentIndex++
      this.renderStep()
    }
  }
  prev() {
    this.currentIndex--
    this.renderStep()
  }
  getTotalSteps(){
    return Object.keys(this.genderParityPerDepartments).length
  }
  getNameDepartment(){
    const nameDepartments = Object.keys(this.genderParityPerDepartments)
    return nameDepartments[this.currentIndex - 1]
  }
}
