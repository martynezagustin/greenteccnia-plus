import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ActiveService } from '../../../../../../services/private/finances/netWorth/active/active.service';
import { CommonModule } from '@angular/common';
import { formatValue } from '../../../../../../services/utilities/format-dates/formatNumbers';
import { ItemService } from '../../../../../../services/private/finances/items/item/item.service';
import { DashboardViewService } from '../../../../../../services/private/finances/dashboard/dashboard-view/dashboard-view.service';

@Component({
  selector: 'app-projection',
  imports: [CommonModule, CommonModule],
  templateUrl: './projection.component.html',
  styleUrl: '../dashboard-finance.component.css'
})
export class ProjectionComponent implements OnInit, OnChanges {
  @Input() loading!: Boolean
  enterpriseId: any = localStorage.getItem("enterpriseId")
  //que tipo de item ver de todos
  @Input() typeView!: 'active' | 'passive' | 'income' | 'expense'
  //qué panel ver, si flujo de caja o patrimonio neto
  @Input() type!: 'cashFlow' | 'netWorth' | null
  //positivos
  projectedPositiveItemsByNextDate: number = 0
  projectedPositiveItemsByNextMonth: number = 0
  projectedPositiveItemsByNextTrimester: number = 0
  projectedPositiveItemsByNextYear: number = 0
  //negativos
  projectedNegativeItemsByNextDate: number = 0
  projectedNegativeItemsByNextMonth: number = 0
  projectedNegativeItemsByNextTrimester: number = 0
  projectedNegativeItemsByNextYear: number = 0
  errorMessage: String = ''
  periods: any[] = []
  constructor(private itemService: ItemService, private dashboardService: DashboardViewService) { }
  ngOnInit(): void {
    this.dashboardService.selectedView$.subscribe(
      response => {
        this.type = response
        this.periods = this.getPeriods()
        console.warn("Hola! Tu vista es", this.type)
        this.getProjectedItems()
      })
    console.log(this.periods)
    console.log(this.projectedPositiveItemsByNextMonth, "estos son los activos")
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['loading']) {
      this.loading = changes['loading'].currentValue
      this.getProjectedItems()
    }
    if (changes['typeView']) {
      this.typeView = changes['typeView'].currentValue
      this.getProjectedItems()
    }
  }
  getProjectedItems() {
    this.loading = true
    this.periods.forEach((p) => {
      this.itemService.getProjectedItemsByNextPeriod(this.enterpriseId, this.typeView, p.value as 'date' | 'month' | 'year' | 'trimester').subscribe(
        response => {
          switch (p.value) {
            case 'date':
              if (this.typeView == 'income' || this.typeView == 'active') {
                this.projectedPositiveItemsByNextDate = response
              } else {
                this.projectedNegativeItemsByNextDate = response
              }
              break;
            case 'month':
              if (this.typeView == 'income' || this.typeView == 'active') {
                this.projectedPositiveItemsByNextMonth = response
              } else {
                this.projectedNegativeItemsByNextMonth = response
              }
              break;
            case 'year':
              if (this.typeView == 'income' || this.typeView == 'active') {
                this.projectedPositiveItemsByNextYear = response
              } else {
                this.projectedNegativeItemsByNextYear = response
              }
              break;
            case 'trimester':
              if (this.typeView == 'income' || this.typeView == 'active') {
                this.projectedPositiveItemsByNextTrimester = response
              }
              else {
                this.projectedNegativeItemsByNextTrimester = response
              }
              break;
            default:
              if (this.typeView == 'income' || this.typeView == 'active') {
                this.projectedPositiveItemsByNextMonth = response
              }
              else {
                this.projectedNegativeItemsByNextMonth = response
              }
              break;
          }
          this.loading = false
        }
      )
    })
  }

  formatValue(num: Number) {
    return formatValue(num)
  }
  getPeriods() {
    const base = [{ value: 'month', labelSpanish: 'mes' }, { value: 'year', labelSpanish: 'año' }]
    const extra = this.type == 'cashFlow' ? [{ value: 'date', labelSpanish: 'día' }] : [{ value: 'trimester', labelSpanish: 'trimestre' }]
    return [...base, ...extra].sort((a, b) => a.value.localeCompare(b.value));
  }
  getProjectedAmount(period: string) {
    const isPositive = this.typeView == 'income' || this.typeView == 'active'
    switch (period) {
      case 'date':
        return isPositive ? this.projectedPositiveItemsByNextDate : this.projectedNegativeItemsByNextDate
      case 'month':
        return isPositive ? this.projectedPositiveItemsByNextMonth : this.projectedNegativeItemsByNextMonth
      case 'year':
        return isPositive ? this.projectedPositiveItemsByNextYear : this.projectedNegativeItemsByNextYear
      case 'trimester':
        return isPositive ? this.projectedPositiveItemsByNextTrimester : this.projectedNegativeItemsByNextTrimester
      default:
        return 0
    }
  }
  getProjectedColor(period: string) {
    const value = this.getProjectedAmount(period)
    const isPositive = this.typeView == 'income' || this.typeView == 'active'
    return isPositive ? (value >= 0 ? 'green' : 'red') : (value >= 0 ? 'red' : 'green')
  }
  getArrowIcon(period: string) {
    const value = this.getProjectedAmount(period)
    return value >= 0 ? 'fa-caret-up' : 'fa-caret-down'
  }
}
