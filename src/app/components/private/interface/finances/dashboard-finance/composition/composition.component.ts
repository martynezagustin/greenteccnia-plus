import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { NgChartsModule } from 'ng2-charts';
import { ChartConfiguration, ChartOptions, ChartType } from 'chart.js';
import { ActiveService } from '../../../../../../services/private/finances/netWorth/active/active.service';
import { PassiveService } from '../../../../../../services/private/finances/netWorth/passive/passive.service';
import { CommonModule } from '@angular/common';
import { IncomeService } from '../../../../../../services/private/finances/cashFlow/income/income.service';
import { ExpenseService } from '../../../../../../services/private/finances/cashFlow/expense/expense.service';
import { mappingMethod } from '../../../../../../services/utilities/finances/methods/mapMetod';
import { ItemService } from '../../../../../../services/private/finances/items/item/item.service';
import { FormsModule } from '@angular/forms';
import { response } from 'express';
import { DashboardViewService } from '../../../../../../services/private/finances/dashboard/dashboard-view/dashboard-view.service';

@Component({
  selector: 'app-composition',
  imports: [NgChartsModule, CommonModule, FormsModule],
  templateUrl: './composition.component.html',
  styleUrl: '../dashboard-finance.component.css'
})
export class CompositionComponent implements OnInit {
  //para graficos
  @Input() enterpriseId!: String
  @Input() loading!: Boolean
  typeView!: 'active' | 'passive' | 'income' | 'expense'
  type!: 'cashFlow' | 'netWorth' | null
  selectedPeriod: 'annual' | 'monthly' | 'diary' | 'total' = 'total'
  selectedFilter: 'paymentMethod' | 'category' = 'category'
  errorMessage: String = ''
  optionsPeriodCashFlow: any[] = [
    { period: 'monthly', label: 'Mensual' },
    { period: 'annual', label: 'Anual' },
    { period: 'diary', label: 'Diario' },
    { period: 'total', label: "Histórico" }
  ]
  optionsPeriodNetWorth: any[] = [
    { period: 'monthly', label: 'Mensual' },
    { period: 'annual', label: 'Anual' },
    { period: 'trimester', label: 'Trimestre actual' },
    { period: 'total', label: "Histórico" }
  ]
  public pieChartLabels: string[] = []
  public pieChartData: number[] = []
  public pieChartType: ChartType = 'doughnut'
  public colorsPositive: string[] = ['rgb(0, 255, 21)', 'rgb(0, 120, 6)', 'rgb(72, 114, 71)', 'rgba(0, 0, 0, 0.6)', 'rgb(0,186,65)', 'rgb(0,225,100)', 'rgba(20,160,20,0.4)', 'rgba(10,255,10,0.7)']
  public colors: string[] = ['rgb(255,0,0)', 'rgb(200,20,20)', 'rgb(255, 116, 116)', 'rgb(143, 22, 16)', 'rgb(120,30,30)', 'rgb(179, 83, 72)']
  public pieChartColors = [
    {
      backgroundColor: [] as string[]
    }
  ]
  ngOnInit(): void {
    this.dashboardViewService.selectedView$.subscribe(
      response => {
        this.type = response
      }
    )
    this.itemService.viewItem$.subscribe(
      view => {
        this.typeView = view;
        this.fetchData(this.selectedPeriod)
      }
    )
  }
  setSelectedFilter() {
    if (this.selectedFilter == 'category') {
      this.selectedFilter = 'paymentMethod'
    } else {
      this.selectedFilter = 'category'
    }
    this.fetchData(this.selectedPeriod)
  }
  constructor(private activeService: ActiveService, private passiveService: PassiveService, private incomeService: IncomeService, private expenseService: ExpenseService, private itemService: ItemService, private dashboardViewService: DashboardViewService) { }
  selectPeriod(period: 'annual' | 'monthly' | 'diary' | 'total') {
    this.selectedPeriod = period
    console.log(this.selectedPeriod)
    this.fetchData(this.selectedPeriod)
  }
  private createServiceMap(activeService: any, passiveService: any, incomeService: any, expenseService: any) {
    return mappingMethod(activeService, passiveService, incomeService, expenseService)
  }
  fetchData(periodType: 'total' | 'diary' | 'monthly' | 'annual') {
    this.loading = true
    this.errorMessage = ''
    console.log(this.selectedPeriod)
    if (this.selectedFilter == 'paymentMethod' && this.type == 'cashFlow') {
      if (this.selectedPeriod == 'total') {
        this.itemService.getItemsByCompositionPaymentMethod(this.enterpriseId, this.typeView).subscribe(
          response => {
            this.processChartData(response, this.typeView)
            this.loading = false
            console.warn("Aca llego, y se ejecuta")
            this.errorMessage = response.length > 0 ? '' : 'No hay items para mostrar';
          },
          err => {
            console.error(err)
            this.loading = false
            this.errorMessage = err.error.message || this.errorMessage
          }
        )
      } else {
        const labels = {
          diary: 'day',
          monthly: 'month',
          annual: 'year'
        }
        this.itemService.getItemsByCompositionPaymentMethodPerPeriod(this.enterpriseId, labels[this.selectedPeriod] as 'day' | 'month' | 'year' | undefined, this.typeView).subscribe(
          response => {
            this.loading = false
            this.processChartData(response, this.typeView)
            this.errorMessage = response.length > 0 ? '' : 'No hay items para mostrar';
          },
          err => {
            console.error(err);
            this.loading = false
            this.errorMessage = err.error.message
          }
        )
      }
    } else {
      const mapMethod = this.createServiceMap(this.activeService, this.passiveService, this.incomeService, this.expenseService)
      const service = mapMethod[periodType][this.typeView]
      const label: 'day' | 'month' | 'year' | 'trimester' | undefined = periodType === 'total' ? undefined : mapMethod[periodType].label as 'day' | 'month' | 'year' | 'trimester' | undefined
      service(this.enterpriseId, label).subscribe(
        (response: any) => {
          this.processChartData(response, this.typeView)
          this.loading = false
          this.errorMessage = response.length > 0 ? '' : 'No hay items para mostrar';
        },
        (err: any) => {
          this.errorMessage = err.error.message
          this.loading = false
        }
      )
    }
  }
  processChartData(response: any, typeView: 'active' | 'passive' | 'income' | 'expense') {

    this.pieChartColors[0].backgroundColor = response.map((item: { category: string; paymentMethod: string }) => {
      if (typeView === 'active') {
        switch (item.category) {
          case 'Activo no corriente':
            return this.colorsPositive[0];
          case 'Activo corriente':
            return this.colorsPositive[1];
          case 'Activo intangible':
            return this.colorsPositive[2];
          case 'Otros activos no corrientes':
            return this.colorsPositive[3];
          default:
            return this.colorsPositive[3]; // Default color for unmatched categories
        }
      } else if (typeView === 'passive') {
        switch (item.category) {
          case 'Pasivo no corriente':
            return this.colors[0];
          case 'Pasivo corriente':
            return this.colors[1];
          case 'Pasivo contingente':
            return this.colors[2];
          default:
            return this.colors[3]; // Default color for unmatched categories
        }
      } else if (typeView === 'income') {
        if (this.selectedFilter == 'category') {
          switch (item.category) {
            case 'Ingreso fijo':
              return this.colorsPositive[0];
            case 'Ingreso variable':
              return this.colorsPositive[1];
            case 'Ingreso extraordinario':
              return this.colorsPositive[2];
            default:
              return this.colorsPositive[3]; // Default color for unmatched categories
          }
        } else {
          switch (item.paymentMethod) {
            case 'Transferencia bancaria':
              return this.colorsPositive[0]
            case 'Efectivo':
              return this.colorsPositive[1]
            case 'Tarjeta de crédito':
              return this.colorsPositive[2]
            case 'Tarjeta de débito':
              return this.colorsPositive[3]
            case 'Criptomonedas':
              return this.colorsPositive[4]
            default:
              return this.colorsPositive[5]
          }
        }
      } else {
        if (this.selectedFilter == 'category') {
          switch (item.category) {
            case 'Egreso fijo':
              return this.colors[0];
            case 'Egreso variable':
              return this.colors[1];
            case 'Egreso discrecional':
              return this.colors[2];
            case 'Egreso de capital':
              return this.colors[3];
            case 'Egreso operativo':
              return this.colors[4];
            default:
              return this.colors[5]; // Default color for unmatched categories
          }
        } else {
          switch (item.paymentMethod) {
            case 'Transferencia bancaria':
              return this.colors[0]
            case 'Efectivo':
              return this.colors[1]
            case 'Tarjeta de crédito':
              return this.colors[2]
            case 'Tarjeta de débito':
              return this.colors[3]
            case 'Criptomonedas':
              return this.colors[4]
            default:
              return this.colors[5]
          }
        }
      }
    })
    this.pieChartLabels = response.map((item: { category: string; paymentMethod: string }) =>
      this.selectedFilter === 'category' ? item.category : item.paymentMethod
    )

    this.pieChartData = response.map((item: { percentage: String }) => item.percentage)
  }
}
