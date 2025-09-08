import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Enterprise } from '../../../../../../../interfaces/enterprise/enterprise.interface';
import { CashFlowService } from '../../../../../../services/private/finances/cashFlow/cash-flow.service';
import { CommonModule } from '@angular/common';
import { EnterpriseService } from '../../../../../../services/private/enterprise/enterprise.service';
import { RouterLink } from '@angular/router';
import { DashboardViewService } from '../../../../../../services/private/finances/dashboard/dashboard-view/dashboard-view.service';
import { formatValue } from '../../../../../../services/utilities/format-dates/formatNumbers';
import { ItemService } from '../../../../../../services/private/finances/items/item/item.service';
import { MenuOffCanvasComponent } from "../menu-off-canvas/menu-off-canvas.component";

@Component({
  selector: 'app-cash-flow',
  standalone: true,
  imports: [CommonModule, RouterLink, MenuOffCanvasComponent],
  templateUrl: './cash-flow.component.html',
  styleUrl: '../dashboard-generic.component.css'
})
export class CashFlowComponent implements OnInit {
  enterpriseId: any = ''
  @Input() userId!: any
  @Input() loading!: boolean
  cashFlow: any = 0
  cashFlowByCurrentYear!: any
  cashFlowByCurrentMonth!: any
  cashFlowByCurrentDate!: any
  //porcentajes
  percentageByCurrentYear!: any
  percentageByCurrentMonth!: any
  percentageByCurrentDate!: any
  errorMessage: String = ''
  showOption: Boolean = false
  selectedFormInput!: any
  constructor(private itemService: ItemService, private cashFlowService: CashFlowService, private enterpriseService: EnterpriseService, private dashboardViewService: DashboardViewService) { }
  ngOnInit(): void {
    this.loading = true
    this.getEnterpriseId()
    this.groupCashFunctions()
    this.cashFlowService.fullCashFlow$.subscribe(
      response => {
        if (response) {
          this.cashFlow = response.total
          this.cashFlowByCurrentDate = response.currentDate
          this.cashFlowByCurrentMonth = response.currentMonth
          this.cashFlowByCurrentYear = response.currentYear
          this.percentageByCurrentMonth = response.percentages.currentMonth
          this.percentageByCurrentYear = response.percentages.currentYear
          this.percentageByCurrentDate = response.percentages.currentDate
          this.loading = false
          console.log(response)
        }
      },
      err => {
        console.error(err);
        this.loading = false
      }
    )
  }
  getCashFlow() {
    this.loading = true
    this.cashFlowService.getCashFlow(this.enterpriseId).subscribe(
      response => {
        this.cashFlow = response
        this.loading = false
      },
      err => {
        console.error(err);
        this.errorMessage = err.error.message
        this.loading = false
      }
    )
  }
  getCashFlowByCurrentYear() {
    this.cashFlowService.getCashFlowByCurrentPeriod(this.enterpriseId, 'year').subscribe(
      response => {
        this.cashFlowByCurrentYear = response.cashFlowByCurrentPeriod
        this.percentageByCurrentYear = response.percentage
      },
      err => {
        console.error(err);
      }
    )
  }
  getCashFlowByCurrentMonth() {
    this.cashFlowService.getCashFlowByCurrentPeriod(this.enterpriseId, 'month').subscribe(
      response => {
        this.cashFlowByCurrentMonth = response.cashFlowByCurrentPeriod
        this.percentageByCurrentMonth = response.percentage
      },
      err => {
        console.error(err);
      }
    )
  }
  getCashFlowByCurrentDate() {
    this.cashFlowService.getCashFlowByCurrentPeriod(this.enterpriseId, 'date').subscribe(
      response => {
        this.cashFlowByCurrentDate = response.cashFlowByCurrentPeriod
      },
      err => {
        console.error(err);
      }
    )
  }
  groupCashFunctions() {
    this.getCashFlow()
    this.getCashFlowByCurrentYear()
    this.getCashFlowByCurrentMonth()
    this.getCashFlowByCurrentDate()
  }
  getEnterpriseId() {
    this.enterpriseId = this.enterpriseService.getEnterpriseId()
  }
  showOptions() {
    this.showOption = !this.showOption
  }
  setSelectedForm(view: "income" | "expense") {
    this.itemService.setItemToUpdate(null)
    this.itemService.setViewTypeItemSubject(view)
  }
  setDataDashboardFinance() {
    this.dashboardViewService.setView('cashFlow')
  }
  formatValue(num: number) {
    return formatValue(num)
  }
}
