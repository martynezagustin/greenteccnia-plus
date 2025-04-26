import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Enterprise } from '../../../../../../../interfaces/enterprise/enterprise.interface';
import { CashFlowService } from '../../../../../../services/private/finances/cashFlow/cash-flow.service';
import { CommonModule } from '@angular/common';
import { EnterpriseService } from '../../../../../../services/private/enterprise/enterprise.service';
import { MenuCashFlowComponent } from './menu/menu-cash-flow/menu-cash-flow.component';
import { RouterLink } from '@angular/router';
import { DashboardViewService } from '../../../../../../services/private/finances/dashboard/dashboard-view/dashboard-view.service';
import { formatValue } from '../../../../../../services/utilities/format-dates/formatNumbers';

@Component({
  selector: 'app-cash-flow',
  standalone: true,
  imports: [CommonModule, MenuCashFlowComponent, RouterLink],
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
  constructor(private cashFlowService: CashFlowService, private enterpriseService: EnterpriseService, private dashboardViewService: DashboardViewService) { }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes["enterprise"]) {
      this.enterprise = changes['enterprise'].currentValue
    }
  }
  ngOnInit(): void {
    this.getEnterpriseId()
    this.groupCashFunctions()
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
    this.cashFlowService.getCashFlowByCurrentYear(this.enterpriseId).subscribe(
      response => {
        this.cashFlowByCurrentYear = response
      },
      err => {
        console.error(err);
      }
    )
  }
  getCashFlowByCurrentMonth(){
    this.cashFlowService.getCashFlowByCurrentMonth(this.enterpriseId).subscribe(
      response => {
        this.cashFlowByCurrentMonth = response
      },
      err=> {
        console.error(err);
      }
    )
  }
  getCashFlowByCurrentDate(){
    this.cashFlowService.getCashFlowByCurrentDate(this.enterpriseId).subscribe(
      response => {
        this.cashFlowByCurrentDate = response
      },
      err => {
        console.error(err);
      }
    )
  }
  groupCashFunctions(){
    this.getCashFlow()
    this.getCashFlowByCurrentYear()
    this.getCashFlowByCurrentMonth()
    this.getCashFlowByCurrentDate()
  }
  getEnterpriseId() {
    this.enterpriseId = this.enterpriseService.getEnterpriseId()
  }
  showOptions(){
    this.showOption = !this.showOption
  }
  setSelectedForm(type: "income" | "expense"){
    this.selectedFormInput = type
  }
  setDataDashboardFinance(){
    this.dashboardViewService.setView('cashFlow')
  }
  formatValue(num: Number){
    return formatValue(num)
  }
}
