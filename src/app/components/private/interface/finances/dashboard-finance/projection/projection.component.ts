import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ActiveService } from '../../../../../../services/private/finances/netWorth/active/active.service';
import { CommonModule } from '@angular/common';
import { formatValue } from '../../../../../../services/utilities/format-dates/formatNumbers';
import { PassiveService } from '../../../../../../services/private/finances/netWorth/passive/passive.service';
import { IncomeService } from '../../../../../../services/private/finances/cashFlow/income/income.service';
import { ExpenseService } from '../../../../../../services/private/finances/cashFlow/expense/expense.service';

@Component({
  selector: 'app-projection',
  imports: [CommonModule],
  templateUrl: './projection.component.html',
  styleUrl: '../dashboard-finance.component.css'
})
export class ProjectionComponent implements OnInit, OnChanges {
  @Input() loading!: Boolean
  @Input() enterpriseId: any
  @Input() typeView!: 'active' | 'passive' | 'income' | 'expense'
  projectedPositiveItemsByNextDate!: Number
  projectedPositiveItemsByNextMonth!: Number
  projectedPositiveItemsByNextYear!: Number
  errorMessage: String = ''
  constructor(private activeService: ActiveService, private passiveService: PassiveService, private incomeService: IncomeService, private expenseService: ExpenseService) { }
  ngOnInit(): void {
    this.projectionItemsByNextPeriod()
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['typeView']) {
      this.typeView = changes['typeView'].currentValue
      console.log(this.typeView);
    }
    if(changes['enterpriseId']){
      this.enterpriseId = changes['enterpriseId'].currentValue
    }
    if (this.typeView && this.enterpriseId)
      this.projectionItemsByNextPeriod();
    
  }
  projectionItemsByNextPeriod(): any {
    this.errorMessage = ''
    const periods: ('day' | 'month' | 'year')[] = ['day', 'month', 'year']
    const mapMethod = {
      day: {
        service: this.typeView == 'active' ? this.activeService.projectedActivesForNextDate.bind(this.activeService) : this.typeView =='income' ? this.incomeService.projectedIncomesForNextDate.bind(this.incomeService) : this.typeView == 'passive' ?  this.passiveService.projectedLiabilitiesForNextDate.bind(this.passiveService): this.expenseService.projectedExpensesForNextDate.bind(this.expenseService),
        target: (response: Number) => this.projectedPositiveItemsByNextDate = response,
        label: 'day'
      },
      month: {
        service: this.typeView == 'active' ? this.activeService.projectedActivesForNextMonth.bind(this.activeService) : this.typeView =='income' ? this.incomeService.projectedIncomesForNextMonth.bind(this.incomeService) : this.typeView == 'passive' ?  this.passiveService.projectedLiabilitiesForNextMonth.bind(this.passiveService) : this.expenseService.projectedExpensesForNextMonth.bind(this.expenseService),
        target: (response: Number) => this.projectedPositiveItemsByNextMonth = response,
        label: 'month'
      },
      year: {
        service: this.typeView == 'active' ? this.activeService.projectedActivesForNextYear.bind(this.activeService) : this.typeView =='income' ? this.incomeService.projectedIncomesForNextYear.bind(this.incomeService):  this.typeView == 'passive' ?  this.passiveService.projectedLiabilitiesForNextYear.bind(this.passiveService) : this.expenseService.projectedExpensesForNextYear.bind(this.expenseService),
        target: (response: Number) => this.projectedPositiveItemsByNextYear = response,
        label: 'year'
      },
    }

    this.loading = true
    periods.forEach((period: 'day' | 'month' | 'year') => {
      mapMethod[period].service(this.enterpriseId).subscribe(
        (response: Number) => {
          mapMethod[period].target(response)
          console.log(response)
          this.loading = false
        },
        err => {
          console.error(err);
          this.errorMessage = err.error.message
          this.loading = false
        }
      )
    })

  }

  formatValue(num: Number) {
    return formatValue(num)
  }
}
