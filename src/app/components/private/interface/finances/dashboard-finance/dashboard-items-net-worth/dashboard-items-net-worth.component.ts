import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { ChartData, ChartType } from 'chart.js';
import { ActiveService } from '../../../../../../services/private/finances/netWorth/active/active.service';
import { IncomeService } from '../../../../../../services/private/finances/cashFlow/income/income.service';
import { NgChartsModule } from 'ng2-charts';
import { ViewItemService } from '../../../../../../services/private/finances/view-item/view-item.service';
import { Router } from '@angular/router';
import { formatValue } from '../../../../../../services/utilities/format-dates/formatNumbers';
import { CommonModule } from '@angular/common';
import { EnterpriseService } from '../../../../../../services/private/enterprise/enterprise.service';
import { Active } from '../../../../../../../interfaces/enterprise/finances/netWorth/active/active.interface';
import { PassiveService } from '../../../../../../services/private/finances/netWorth/passive/passive.service';
import { CompositionComponent } from "./composition/composition.component";
import { TypeViewNetWorthService } from '../../../../../../services/private/finances/netWorth/typeViewNetWorth/type-view-net-worth.service';
import { EvolutionComponent } from "./evolution/evolution.component";
import { LastRegistersComponent } from "./last-registers/last-registers.component";
import { ProjectionComponent } from "./projection/projection.component";

@Component({
  selector: 'app-dashboard-items-net-worth',
  imports: [NgChartsModule, CommonModule, CompositionComponent, EvolutionComponent, LastRegistersComponent, ProjectionComponent],
  templateUrl: './dashboard-items-net-worth.component.html',
  styleUrl: '../dashboard-finance.component.css'
})
export class DashboardItemsNetWorthComponent implements OnInit {
  enterpriseId!: any
  loading: Boolean = false
  typeView!: 'active' | 'passive'
  //lastregisters
  totalPositiveItems: Active[] = []
  //projection
  projectedPositiveItemsByNextDate: Number = 0
  projectedPositiveItemsByNextMonth: Number = 0
  projectedPositiveItemsByNextYear: Number = 0
  //evolution
  public pieChartLabelsEvolution: string[] = []
  public pieChartTypeEvolution: any = 'bar'
  public pieChartDataEvolution?: ChartData<'bar', number[], string> = {
    labels: [],
    datasets: [
      {
        data: [],
        backgroundColor: [
          'rgba(0, 255, 21, 0.6)',
          'rgba(0, 120, 6, 0.6)',
          'rgba(72, 114, 71, 0.6)',
          'rgba(0, 0, 0, 0.6)'
        ]
      }
    ]
  }
  totalPositiveItemsToCompare: any = {}
  public pieChartLabels: string[] = []
  public pieChartData: number[] = []
  public pieChartType: ChartType = 'doughnut'
  public colors: string[] = ['rgb(0, 255, 21)', 'rgb(0, 120, 6)', 'rgb(72, 114, 71)', 'rgba(0, 0, 0, 0.6)'
  ]
  public pieChartColors = [
    {
      backgroundColor: [] as string[]
    }
  ]
  constructor(private enterpriseService: EnterpriseService, private activeService: ActiveService, private passiveService: PassiveService, private viewItemService: ViewItemService, private router: Router, private typeViewNetWorthService: TypeViewNetWorthService) { }
  getEnterpriseId() {
    this.enterpriseId = this.enterpriseService.getEnterpriseId();
  }
  ngOnInit(): void {
    this.typeView = this.typeViewNetWorthService.getTypeViewNetWorth()
    if(this.typeView !== undefined){
      this.typeViewNetWorthService.setTypeViewNetWorth(this.typeView)
    }
    this.getEnterpriseId()
    this.projectionItemsByNextDate()
    this.projectionItemsByNextMonth()
    this.projectionItemsByNextYear()
    this.getPositiveValues()
    this.getPositiveValuesToCompare()
  }
  projectionItemsByNextDate(): Number {
    this.loading = true
    this.activeService.projectedActivesForNextDate(this.enterpriseId).subscribe(
      (response: Number) => {
        this.projectedPositiveItemsByNextDate = response
        this.loading = false
      }
      , err => {
        console.error(err);
      }
    )
    return this.projectedPositiveItemsByNextMonth
  }
  projectionItemsByNextMonth(): Number {
    this.loading = true
    this.activeService.projectedActivesForNextMonth(this.enterpriseId).subscribe(
      (response: Number) => {
        this.projectedPositiveItemsByNextMonth = response
        this.loading = false
      }
      , err => {
        console.error(err);
      }
    )
    return this.projectedPositiveItemsByNextMonth
  }
  projectionItemsByNextYear(): Number {
    this.loading = true
    this.activeService.projectedActivesForNextYear(this.enterpriseId).subscribe(
      (response: Number) => {
        this.projectedPositiveItemsByNextYear = response
        this.loading = false
      },
      err => {
        console.error(err);
      }
    )
    return this.projectedPositiveItemsByNextYear
  }
  getPositiveValues() {
    this.activeService.getAllActives(this.enterpriseId).subscribe(
      response => {
        this.totalPositiveItems = response.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, 3).map((i) => ({
          ...i, formattedDate: new Date(i.date).toLocaleDateString('es-AR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
          })
        }))
        this.loading = false
      },
      err => {
        console.error(err);
      }
    )
  }
  viewItem(item: any, itemType: 'active' | 'passive' | 'income' | 'expense') {
    this.viewItemService.setItemViewer(item, itemType)
    this.router.navigate(['/dashboard/finances/view-item'])
  }
  formatValue(num: Number) {
    return formatValue(num)
  }
  //evolution
  getPositiveValuesToCompare() {
    this.loading = true
    this.activeService.getAllActives(this.enterpriseId).subscribe(
      response => {
        const monthNames = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
        console.log(response);
        const totalByMonth: { [key: string]: number } = {}
        const currentYear = new Date().getFullYear()
        response.forEach((item) => {
          const date = new Date(item.date)
          const itemYear = date.getFullYear()
          if (itemYear == currentYear) {
            const currentMonth = monthNames[date.getMonth()]
            const value = item.amount || 0
            totalByMonth[currentMonth] = (totalByMonth[currentMonth] || 0) + value
          }
        })
        const orderedMonths = monthNames.filter((month) => totalByMonth.hasOwnProperty(month))
        this.pieChartLabelsEvolution = orderedMonths

        this.pieChartDataEvolution = {
          labels: this.pieChartLabelsEvolution,
          datasets: [
            {
              data: Object.values(totalByMonth),
              backgroundColor: [
                'rgba(0, 255, 21, 0.6)',
                'rgba(0, 120, 6, 0.6)',
                'rgba(72, 114, 71, 0.6)',
                'rgba(0, 0, 0, 0.6)'
              ],
              label: 'Activos por mes',
              borderWidth: 1,
              pointStyle: 'circle',
              borderColor: 'rgba(56, 157, 25, 0.6)',
            }
          ],
        }
        console.log(totalByMonth)
        this.totalPositiveItemsToCompare = response
        this.loading = false
      },
      err => {
        console.error(err);
      }
    )
  }
  changeViewElement() {
    if (this.typeView == 'active') {
      this.typeViewNetWorthService.setTypeViewNetWorth(this.typeView)
      this.typeView = 'passive'
    } else {
      this.typeViewNetWorthService.setTypeViewNetWorth(this.typeView)
      this.typeView = 'active'
    }
  }
}
