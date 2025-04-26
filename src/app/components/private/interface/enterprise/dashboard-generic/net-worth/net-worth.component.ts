import { Component, Input, SimpleChanges } from '@angular/core';
import { Enterprise } from '../../../../../../../interfaces/enterprise/enterprise.interface';
import { NetWorthService } from '../../../../../../services/private/finances/netWorth/net-worth.service';
import { MenuComponent } from "./menu/menu-net-worth.component";
import { CommonModule } from '@angular/common';
import { EnterpriseService } from '../../../../../../services/private/enterprise/enterprise.service';
import { RouterLink } from '@angular/router';
import { DashboardViewService } from '../../../../../../services/private/finances/dashboard/dashboard-view/dashboard-view.service';
import { formatValue } from '../../../../../../services/utilities/format-dates/formatNumbers';

@Component({
  selector: 'app-net-worth',
  standalone: true,
  imports: [MenuComponent, CommonModule, RouterLink],
  templateUrl: './net-worth.component.html',
  styleUrl: '../dashboard-generic.component.css'
})
export class NetWorthComponent {
  enterpriseId!: any
  @Input() enterprise!: Enterprise
  @Input() userId!: any
  @Input() loading!: boolean
  netWorth!: any
  netWorthByCurrentYear!: any
  netWorthByCurrentMonth!: any
  netWorthByCurrentDate!: any
  errorMessage: string = ''
  showOption: Boolean = false
  selectedFormInput!: any
  constructor(private netWorthService: NetWorthService, private enterpriseService: EnterpriseService, private dashboardViewService: DashboardViewService) {
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes["enterprise"]) {
      this.enterprise = changes['enterprise'].currentValue
    }
  }
  ngOnInit(): void {
    this.getEnterpriseId()
    this.getNetWorth()
    this.getNetWorthByCurrentYear()
    this.getNetWorthByCurrentMonth()
    this.getNetWorthByCurrentDate()
  }
  getNetWorth() {
    this.loading = true
    this.netWorthService.getNetWorth(this.enterpriseId).subscribe(
      response => {
        this.netWorth = response
        this.loading = false
      },
      err => {
        console.error(err);
        this.errorMessage = err.error.message
        this.loading = false
      }
    )
  }
  getNetWorthByCurrentYear() {
    this.netWorthService.getNetWorthByCurrentYear(this.enterpriseId).subscribe(
      response => {
        this.netWorthByCurrentYear = response
      },
      err => {
        console.error(err);
      }
    )
  }
  getNetWorthByCurrentMonth() {
    this.netWorthService.getNetWorthByCurrentMonth(this.enterpriseId).subscribe(
      response => {
        this.netWorthByCurrentMonth = response
      },
      err => {
        console.error(err);
      }
    )
  }
  getNetWorthByCurrentDate() {
    this.netWorthService.getNetWorthByCurrentDate(this.enterpriseId).subscribe(
      response => {
        this.netWorthByCurrentDate = response
      },
      err => {
        console.error(err);
      }
    )
  }
  getEnterpriseId() {
    this.enterpriseId = this.enterpriseService.getEnterpriseId()
  }
  showOptions() {
    this.showOption = !this.showOption
  }
  setSelectedForm(type: "active" | "passive") {
    this.selectedFormInput = type
  }
  setDataDashboardFinance() {
    this.dashboardViewService.setView('netWorth')
  }
  formatValue(num: Number){
    return formatValue(num)
  }
}
