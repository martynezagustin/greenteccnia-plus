import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Enterprise } from '../../../../../../../interfaces/enterprise/enterprise.interface';
import { CashFlowService } from '../../../../../../services/private/finances/cashFlow/cash-flow.service';
import { CommonModule } from '@angular/common';
import { EnterpriseService } from '../../../../../../services/private/enterprise/enterprise.service';
import { RouterLink } from '@angular/router';
import { DashboardViewService } from '../../../../../../services/private/finances/dashboard/dashboard-view/dashboard-view.service';
import { formatValue } from '../../../../../../services/utilities/format-dates/formatNumbers';
import { ItemService } from '../../../../../../services/private/finances/items/item/item.service';
import { AddItemComponent } from "../add-item/add-item.component";
import { MenuOffCanvasComponent } from "../menu-off-canvas/menu-off-canvas.component";

@Component({
  selector: 'app-cash-flow',
  standalone: true,
  imports: [CommonModule, RouterLink, MenuOffCanvasComponent],
  templateUrl: './cash-flow.component.html',
  styleUrl: '../dashboard-generic.component.css'
})
export class CashFlowComponent implements OnChanges, OnInit {
  enterpriseId: any = ''
  @Input() enterprise!: Enterprise
  @Input() userId!: any
  @Input() loading!: boolean
  cashFlow: any = 0
  cashFlowByCurrentYear!: any
  cashFlowByCurrentMonth!: any
  cashFlowByCurrentDate!: any
  errorMessage: String = ''
  showOption: Boolean = false
  selectedFormInput!: any
  constructor(private itemService: ItemService, private cashFlowService: CashFlowService, private enterpriseService: EnterpriseService, private dashboardViewService: DashboardViewService) { }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes["enterprise"]) {
      this.enterprise = changes['enterprise'].currentValue
    }
  }
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
        console.log("Que pasa con el cash flow month?", this.cashFlowByCurrentMonth)
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
  formatValue(num: Number) {
    return formatValue(num)
  }
}
