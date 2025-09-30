import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ItemService } from '../../../../../../services/private/finances/items/item/item.service';
import { formatValue } from '../../../../../../services/utilities/format-dates/formatNumbers';
import { CashFlowService } from '../../../../../../services/private/finances/cashFlow/cash-flow.service';
import { NetWorthService } from '../../../../../../services/private/finances/netWorth/net-worth.service';
import { CommonModule } from '@angular/common';
import { DashboardViewService } from '../../../../../../services/private/finances/dashboard/dashboard-view/dashboard-view.service';

@Component({
  selector: 'app-summary-complete',
  imports: [CommonModule],
  templateUrl: './summary-complete.component.html',
  styleUrl: './summary-complete.component.css'
})
export class SummaryCompleteComponent implements OnInit {
  type!: 'cashFlow' | 'netWorth' | null
  enterpriseId: string | null = localStorage.getItem('enterpriseId')
  //positivos
  positiveNumberDate: number = 0
  positiveNumberMonth: number = 0
  positiveNumberAnnual: number = 0
  positiveNumberTrimester: number = 0
  positiveNumberHistoric: number = 0
  //porcentajes positivos
  positivePercentageDate: number = 0
  positivePercentageMonth: number = 0
  positivePercentageAnnual: number = 0
  positivePercentageTrimester: number = 0
  //negativos
  negativeNumberDate: number = 0
  negativeNumberMonth: number = 0
  negativeNumberAnnual: number = 0
  negativeNumberTrimester: number = 0
  negativePercentageMonth: number = 0
  negativePercentageYear: number = 0
  negativePercentageDate: number = 0
  negativePercentageTrimester: number = 0
  //projeccion
  balanceNumberDate: number = 0
  balanceNumberMonth: number = 0
  balanceNumberAnnual: number = 0
  balanceNumberTrimester: number = 0
  balancePercentageDate: number = 0
  balancePercentageMonth: number = 0
  balancePercentageAnnual: number = 0
  balancePercentageTrimester: number = 0
  //miscelaneos
  loadingItems!: Boolean
  errorMessage!: String
  public labels!: string[]
  public periods: ('month' | 'year' | 'date' | 'trimester')[] = ['month', 'year', 'date', 'trimester']
  constructor(private itemService: ItemService, private cashFlowService: CashFlowService, private netWorthService: NetWorthService, private dashboardService: DashboardViewService) { }
  ngOnInit(): void {
    this.dashboardService.selectedView$.subscribe((type) => {
      this.type = type
    })
    this.labels = this.type == 'cashFlow' ? ['income', 'expense'] : ['active', 'passive']
    this.getData()
    this.getCashFlowOrNetWorth()
  }
  getData() {
    this.loadingItems = true;
    this.errorMessage = '';
    this.labels.forEach((label) => {
      this.periods.forEach((period) => {
        console.log("Label", label, "period", period)
        this.itemService.getValueItemsByCurrentPeriod(this.enterpriseId, label, period).subscribe(
          response => {
            switch (label) {
              case 'active':
                this.setPositive(response.getItemsByCurrentPeriod, period, response.percentage)
                console.log("Valores de activos", response.getItemsByCurrentPeriod)
                this.loadingItems = false
                break;
              case 'income':
                this.setPositive(response.getItemsByCurrentPeriod, period, response.percentage)
                this.loadingItems = false
                break;
              case 'passive':
                this.setNegative(response.getItemsByCurrentPeriod, period, response.percentage ? response.percentage : 0)
                this.loadingItems = false
                break;
              case 'expense':
                this.setNegative(response.getItemsByCurrentPeriod, period, response.percentage ? response.percentage : 0)
                this.loadingItems = false
                break;
            }
          }
        )
      })
    })
  }

  setPositive(amount: number, period: string, percentage: number) {
    switch (period) {
      case 'date':
        this.positiveNumberDate += amount
        this.positivePercentageDate = percentage
        break;
      case 'month':
        this.positiveNumberMonth += amount
        this.positivePercentageMonth = percentage
        break;
      case 'year':
        this.positiveNumberAnnual += amount
        this.positivePercentageAnnual = percentage
        break;
      case 'trimester':
        this.positiveNumberTrimester += amount
        this.positivePercentageTrimester = percentage
        break;
      default:
        throw new Error('invalid period');
    }
  }
  setNegative(amount: number, period: string, percentage: number) {
    switch (period) {
      case 'date':
        this.negativeNumberDate += amount
        this.negativePercentageDate = percentage
        break;
      case 'month':
        this.negativeNumberMonth += amount
        this.negativePercentageMonth = percentage
        break;
      case 'trimester':
        this.negativeNumberTrimester += amount
        this.negativePercentageTrimester = percentage
        break;
      default:
        this.negativeNumberAnnual += amount
        this.negativePercentageYear = percentage
        console.log("Valor del anio negativo", this.negativeNumberAnnual)
        break;
    }
  }
  setBalanceValues(amount: number, period: string, percentage: number) {
    switch (period) {
      case 'date':
        this.balanceNumberDate += amount
        this.balancePercentageDate = percentage
        break;
      case 'month':
        this.balanceNumberMonth += amount
        this.balancePercentageMonth = percentage
        break;
      case 'trimester':
        this.balanceNumberTrimester += amount
        console.log("Balance trimestral", this.balanceNumberTrimester)
        console.log("Porcentaje trimestral", percentage)
        this.balancePercentageTrimester = percentage
        break;
      case 'year':
        this.balanceNumberAnnual += amount
        console.log(this.balanceNumberAnnual)
        this.balancePercentageAnnual = percentage
        break;
      default:
        throw new Error('Invalid period')
    }
  }
  getCashFlowOrNetWorth() {
    const isCashFlow = this.type == 'cashFlow'
    this.periods.forEach((period) => {
      isCashFlow ? this.cashFlowService.getCashFlowByCurrentPeriod(this.enterpriseId, period).subscribe(
        response => {
          this.setBalanceValues(response.cashFlowByCurrentPeriod, period, response.percentage)
        }
      ) : this.netWorthService.getNetWorthByCurrentPeriod(this.enterpriseId, period as 'year' | 'month' | 'trimester').subscribe(
        response => {
          this.setBalanceValues(response.netWorthByCurrentPeriod, period, response.percentage)
        },
        err => {
          console.error(err);
          
        }
      )
    })
  }
  formatValue(num: Number) {
    return formatValue(num)
  }
}
