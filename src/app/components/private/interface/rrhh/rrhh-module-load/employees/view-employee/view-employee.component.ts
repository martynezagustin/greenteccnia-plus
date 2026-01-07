import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { EmployeesService } from '../../../../../../../services/private/rrhh/employees/employees.service';
import { Employee } from '../../../../../../../../interfaces/enterprise/rrhh/employees/employee.interface';
import { CommonModule } from '@angular/common';
import { Assist } from '../../../../../../../../interfaces/enterprise/rrhh/assists/assist.interface';
import { CreateSurveyComponent } from './create-survey/create-survey.component';
import { SurveyGreen } from '../../../../../../../../interfaces/enterprise/rrhh/surveyGreen/surveyGreen.interface';
import { AddAssistFastComponent } from "./add-assist-fast/add-assist-fast.component";
import { ChartComponent, ApexAxisChartSeries, ApexChart, ApexXAxis, ApexDataLabels, ApexTitleSubtitle, ApexStroke, ApexGrid, NgApexchartsModule } from 'ng-apexcharts'
import { Survey } from '../../../../../../../../interfaces/enterprise/rrhh/surveyGreen/survey/survey.interface';
import Swal from 'sweetalert2';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  dataLabels: ApexDataLabels;
  grid: ApexGrid;
  stroke: ApexStroke;
  title: ApexTitleSubtitle
}

@Component({
  selector: 'app-view-employee',
  imports: [CommonModule, CreateSurveyComponent, AddAssistFastComponent, NgApexchartsModule],
  templateUrl: './view-employee.component.html',
  styleUrl: './view-employee.component.css'
})



export class ViewEmployeeComponent implements OnInit, AfterViewInit {
  @ViewChild('employeeContent', { static: false }) employeeContent!: ElementRef
  enterpriseId: any = localStorage.getItem('enterpriseId')
  employee: Employee | null = null;
  surveyGreen: SurveyGreen | null = null
  alertAssist: Boolean | null = null
  assists: Assist[] = []
  punctualityIndex!: number | null
  commonMoods: { _id: string, count: number }[] = []
  loading: boolean = false

  //charts
  @ViewChild("chart") chart!: ChartComponent;
  public chartOptionsWeek!: Partial<ChartOptions>
  public chartOptionsMonth!: Partial<ChartOptions>
  public chartOptionsYear!: Partial<ChartOptions>
  //misc de charts, en este caso, ver la visualizacion
  viewPeriodSurveyHistory: 'week' | 'month' | 'year' = 'week'
  //-- el errorcito
  errorMessageInaccessiblePeriod!: string
  endContractMessageError!: String
  constructor(private employeeService: EmployeesService) {
  }
  ngOnInit(): void {
    this.employeeService.employeeToView$.subscribe(
      response => {
        if (response) {
          this.loading = true
          this.employeeService.getEmployee(this.enterpriseId, response).subscribe(
            response => {
              console.log("La response", response)
              this.employee = response.employee ?? null
              this.surveyGreen = response.surveyGreen ?? null
              this.commonMoods = this.surveyGreen?.commonMoods ?? []
              this.alertAssist = response.alertAssist
              this.punctualityIndex = response.punctualityIndex
              console.log(this.punctualityIndex);
              

              this.assists = response.employee.assists.slice(0, 3) ?? []
              this.employeeService.setIdToLocalStorage(response.employee._id ?? '')
              //print charts
              this.printChartWeek(this.surveyGreen.surveysCurrentWeek)
              this.printChartMonth(this.surveyGreen.surveysCurrentMonth)
              this.printChartYear(this.surveyGreen.surveysCurrentYear)
              this.loading = false
            },
            err => {
              console.error(err);
            }
          )
        }
      }
    )
  }
  ngAfterViewInit(): void {
    const carousel = document.getElementById('carouselExampleIndicators')
    carousel?.addEventListener('slid.bs.carousel', () => {
      setTimeout(() => {
        this.chart.updateOptions({})
        ApexCharts.exec('chart-week', 'resize');
        ApexCharts.exec('chart-month', 'resize');
      }, 2000);
    })
  }
  printChartWeek(response: any) {
    const dataset = response.map((s: Survey) => s.totalScore).sort()
    const dates = response.map((s: Survey) => this.formatDate(s.dateSurvey)).sort()
    console.log(dataset);
    if (!dataset) {
      this.errorMessageInaccessiblePeriod = 'No se puede graficar el periodo escogido. No hay datos.'
      return
    }
    this.chartOptionsWeek = {
      series: [
        {
          name: "Puntaje",
          data: dataset
        }
      ],
      chart: {
        id: 'chart-week',
        height: 350,
        type: "line",
        zoom: {
          enabled: false
        }
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: "straight"
      },
      title: {
        text: "Evolución en la semana",
        align: "left"
      },
      grid: {
        row: {
          colors: ["#f3f3f3", "transparent"],
          opacity: 0.5
        }
      },
      xaxis: {
        categories: dates
      }
    }
  }
  printChartMonth(response: any) {
    const dataset = response.map((s: Survey) => s.totalScore).sort()
    const dates = response.map((s: Survey) => this.formatDate(s.dateSurvey)).sort()
    if (!dataset) {
      this.errorMessageInaccessiblePeriod = 'No se puede graficar el periodo escogido. No hay datos.'
      return
    }
    console.log("Qué meses se cubren?", dates);
    this.chartOptionsMonth = {
      series: [
        {
          name: "Puntaje",
          data: dataset
        }
      ],
      chart: {
        id: 'chart-month',
        height: 350,
        type: "line",
        zoom: {
          enabled: false
        }
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: "straight"
      },
      title: {
        text: "Evolución en el mes",
        align: "left"
      },
      grid: {
        row: {
          colors: ["#f3f3f3", "transparent"],
          opacity: 0.5
        }
      },
      xaxis: {
        categories: dates.sort((a: Date, b: Date) => new Date(a).getTime() - new Date(b).getTime())
      }
    }
  }
  printChartYear(response: any) {
    console.log(response);
    const grouped: { [month: string]: number[] } = {}

    const monthsName = [
      'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
      'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'
    ];

    response.forEach((element: Survey) => {
      const d = new Date(element.dateSurvey)
      const monthIndex = d.getMonth()
      const monthLabel = monthsName[monthIndex]
      console.log("El month label", monthLabel);

      if (!grouped[monthLabel]) grouped[monthLabel] = []
      grouped[monthLabel].push(element.totalScore)
    });

    const monthsWithData = monthsName.filter(m => grouped[m])
    //Datasets: sumas por mes
    const dataset = monthsWithData.map(m => {
      const scores = grouped[m]
      return (scores.reduce((acc, curr) => acc + curr, 0) / scores.length)
    })

    const datasetFormatted = dataset.map((n: number) => Number(n.toFixed(2)))

    console.log(grouped)
    this.chartOptionsYear = {
      series: [
        {
          name: "Puntaje",
          data: datasetFormatted
        }
      ],
      chart: {
        id: 'chart-year',
        height: 350,
        type: "line",
        zoom: {
          enabled: false
        }
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: "straight"
      },
      title: {
        text: "Evolución en la semana",
        align: "left"
      },
      grid: {
        row: {
          colors: ["#f3f3f3", "transparent"],
          opacity: 0.5
        }
      },
      xaxis: {
        categories: monthsWithData
      }
    }
  }
  formatDate(date: Date | undefined) {
    if (!date) return '----'
    const dateOfBirthday = new Date(date);
    dateOfBirthday.setHours(dateOfBirthday.getHours() + 3)
    return dateOfBirthday.toLocaleDateString('es-AR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    });
  }
  changeEventView(e: any) {
    this.viewPeriodSurveyHistory = e.target.value
    setTimeout(() => {
      const id = this.viewPeriodSurveyHistory === 'week' ? 'chart-week' : this.viewPeriodSurveyHistory === 'month' ? 'chart-month' : 'year'
      ApexCharts.exec(id, 'resize')
    }, 150);
  }
  async endContract(id: string | undefined) {
    await Swal.fire({
      title: '<h2 style="font-family:Montserrat; letter-spacing:-1.2px">¿Estás seguro que deseas finalizar el contrato?</h2>',
      text: "Esta acción no se puede deshacer. Se archivará la información del empleado y se marcará el contrato como finalizado.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, finalizar el contrato',
      cancelButtonText: "Cancelar"
    }).then((result) => {
      if (result) {
        if (!result.isConfirmed) return
        if (id) this.employeeService.endContract(this.enterpriseId, id, 'Se rompió la relación laboral.').subscribe({
          next: async () => {
            await Swal.fire({
              title: '<h2 style="font-family:Montserrat; letter-spacing:-1.2px">Ha finalizado el contrato con el empleado.</h2>',
              text: 'Se cesó con la relación laboral correctamente.',
              showCloseButton: true,
            })
          },
          error: err => {
            this.endContractMessageError = err.error?.message || 'Error al eliminar empleado';
          }
        }
        )
      }
    }).catch((err) => {
      console.error(err);
    })
  }
}
