import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ActiveService } from '../../../../../../services/private/finances/netWorth/active/active.service';
import { PassiveService } from '../../../../../../services/private/finances/netWorth/passive/passive.service';
import { NetWorthService } from '../../../../../../services/private/finances/netWorth/net-worth.service';
import { formatValue } from '../../../../../../services/utilities/format-dates/formatNumbers';
import { IncomeService } from '../../../../../../services/private/finances/cashFlow/income/income.service';
import { ExpenseService } from '../../../../../../services/private/finances/cashFlow/expense/expense.service';
import { CashFlowService } from '../../../../../../services/private/finances/cashFlow/cash-flow.service';

@Component({
  selector: 'app-summary',
  imports: [CommonModule],
  templateUrl: './summary.component.html',
  styleUrl: '../dashboard-finance.component.css'
})
export class SummaryComponent implements OnInit, OnChanges {
  @Input() loading!: Boolean
  @Input() type!: 'netWorth' | 'cashFlow' | null
  @Input() enterpriseId!: String
  @Input() selectedPeriod!: String
  totalPositiveValueRoster: String = ''
  totalNegativeValueRoster: String = ''
  differenceValueRoster: String = ''
  totalPositiveValues: Number = 0
  totalNegativeValues: Number = 0
  totalDifference: Number = 0
  mapMethod: any;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['enterpriseId']) {
      this.enterpriseId = changes['enterpriseId'].currentValue
    }
    if (changes['type']) {
      this.type = changes['type'].currentValue
    }
  }
  ngOnInit(): void {
    switch (this.type) {
      case 'netWorth':
        this.totalPositiveValueRoster = 'activos'
        this.totalNegativeValueRoster = 'pasivos'
        this.differenceValueRoster = 'Patrimonio neto'
        break;
      default:
        this.totalPositiveValueRoster = 'ingresos'
        this.totalNegativeValueRoster = 'egresos'
        this.differenceValueRoster = 'Flujo de caja'
        break;
    }
    this.getTotalPositiveValues()
    this.getTotalNegativeValues()
    this.getDifferenceValue()

  }
  constructor(private activeService: ActiveService, private passiveService: PassiveService, private netWorthService: NetWorthService, private incomeService: IncomeService, private expenseService: ExpenseService, private cashFlowService: CashFlowService) {
    this.mapMethod = {
      getTotalPositiveItemsByNumber: {
        netWorth: this.activeService.getTotalActivesByNumber,
        cashFlow: this.incomeService.getTotalIncomesByNumber
      },
      getTotalNegativeItemsByNumber: {
        netWorth: this.passiveService.getTotalLiabilitiesByNumber,
        cashFlow: this.expenseService.getTotalExpensesByNumber
      },
      getDifferenceValue: {
        netWorth: this.netWorthService.getNetWorth,
        cashFlow: this.cashFlowService.getCashFlow
      }
    }
  }
  getTotalPositiveValues() {
    const serviceMethod = this.type == 'netWorth'
      ? this.mapMethod.getTotalPositiveItemsByNumber.netWorth
      : this.mapMethod.getTotalPositiveItemsByNumber.cashFlow;
    serviceMethod.call(this.type == 'netWorth' ? this.activeService : this.incomeService, this.enterpriseId).subscribe(
      (response: Number) => {
        this.totalPositiveValues = response
        this.loading = false
      },
      (err: any) => {
        console.error(err);
      }
    )
  }
  getTotalNegativeValues() {
    this.loading = true
    const serviceMethod = this.type == 'netWorth' ? this.mapMethod.getTotalNegativeItemsByNumber.netWorth : this.mapMethod.getTotalNegativeItemsByNumber.cashFlow;
    serviceMethod.call(this.type == 'netWorth' ? this.passiveService : this.expenseService, this.enterpriseId).subscribe(
      (response: Number) => {
        this.totalNegativeValues = response
        this.loading = false
      },
      (err: any) => {
        console.error(err);
      }
    )
  }
  getDifferenceValue() {
    this.loading = true
    const serviceMethod = this.type == 'netWorth' ? this.mapMethod.getDifferenceValue.netWorth : this.mapMethod.getDifferenceValue.cashFlow;
    serviceMethod.call(this.type == 'netWorth' ? this.netWorthService : this.cashFlowService, this.enterpriseId).subscribe(
      (response: Number) => {
        this.totalDifference = response
        console.log("Diferencia?", this.totalDifference);
        this.loading = false

      },
      (err: any) => {
        console.error(err);
      }
    )
  }
  formatValue(num: Number) {
    return formatValue(num)
  }
}
