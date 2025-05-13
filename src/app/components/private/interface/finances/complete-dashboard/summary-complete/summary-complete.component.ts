import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ItemService } from '../../../../../../services/private/finances/items/item/item.service';
import { formatValue } from '../../../../../../services/utilities/format-dates/formatNumbers';
import { CashFlowService } from '../../../../../../services/private/finances/cashFlow/cash-flow.service';
import { NetWorthService } from '../../../../../../services/private/finances/netWorth/net-worth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-summary-complete',
  imports: [CommonModule],
  templateUrl: './summary-complete.component.html',
  styleUrl: './summary-complete.component.css'
})
export class SummaryCompleteComponent implements OnInit, OnChanges {
  @Input() enterpriseId!: any
  @Input() type!: 'cashFlow' | 'netWorth' | null
  //positivos
  positiveNumberDate: number = 0
  positiveNumberMonth: number = 0
  positiveNumberAnnual: number = 0
  positiveNumberHistoric: number = 0
  //porcentajes positivos
  positivePercentageDate: number = 0
  positivePercentageMonth: number = 0
  positivePercentageAnnual: number = 0
  //negativos
  negativeNumberDate: number = 0
  negativeNumberMonth: number = 0
  negativeNumberAnnual: number = 0
  negativePercentageMonth: number = 0
  negativePercentageYear: number = 0
  negativePercentageDate: number = 0
  //projeccion
  balanceNumberDate: number = 0
  balanceNumberMonth: number = 0
  balanceNumberAnnual: number = 0
  balancePercentageDate: number = 0
  balancePercentageMonth: number = 0
  balancePercentageAnnual: number = 0
  //miscelaneos
  loadingItems!: Boolean
  public labels!: string[]
  public periods: ('month' | 'year' | 'date')[] = ['month', 'year', 'date']
  constructor(private itemService: ItemService, private cashFlowService: CashFlowService, private netWorthService: NetWorthService) { }
  ngOnInit(): void {
    this.labels = this.type == 'cashFlow' ? ['income', 'expense'] : ['active', 'passive']
    console.warn("EJECUTO EL GET DAATA EEEE")
    this.getData()
    this.getCashFlowOrNetWorth()
  }
  getData() {
    this.loadingItems = true
    this.labels.forEach((label) => {
      this.periods.forEach((period) => {
        this.itemService.getValueItemsByCurrentPeriod(this.enterpriseId, label, period).subscribe(
          response => {
            if (label == 'income' || label == 'active') {
              this.setPositive(response.getItemsByCurrentPeriod, period, response.percentage)
              this.loadingItems = false
            } else {
              this.setNegative(response.getItemsByCurrentPeriod, period, response.percentage)
              this.loadingItems = false
            }
          }, err => {
            console.error(err);
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
      default:
        this.positiveNumberAnnual += amount
        this.positivePercentageAnnual = percentage
        break;
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
      default:
        this.negativeNumberAnnual += amount
        this.negativePercentageYear = percentage
        break;
    }
  }
  getCashFlowOrNetWorth() {
    const isCashFlow = this.type == 'cashFlow'
    this.periods.forEach((period) => {
      isCashFlow ? this.cashFlowService.getCashFlowByCurrentPeriod(this.enterpriseId, period).subscribe(
        response => {
          switch (period) {
            case 'date':
              this.balanceNumberDate = response.cashFlowByCurrentPeriod
              this.balancePercentageDate = response.percentage
              break;
            case 'month':
              this.balanceNumberMonth = response.cashFlowByCurrentPeriod
              this.balancePercentageMonth = response.percentage
              break;
            default:
              this.balanceNumberAnnual = response.cashFlowByCurrentPeriod
              this.balancePercentageAnnual = response.percentage
              break;
          }
        }
      ) : this.netWorthService.getNetWorthByCurrentMonth(this.enterpriseId).subscribe(
        response => {
          this.balanceNumberMonth = response.netWorthByCurrentMonth
        }
      )
    })
  }
  ngOnChanges(changes: SimpleChanges): void {
    this.enterpriseId = changes['enterpriseId'].currentValue
  }
  formatValue(num: Number) {
    return formatValue(num)
  }
}
