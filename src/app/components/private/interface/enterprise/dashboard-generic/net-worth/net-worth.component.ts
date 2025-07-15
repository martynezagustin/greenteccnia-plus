import { Component, Input, SimpleChanges } from '@angular/core';
import { Enterprise } from '../../../../../../../interfaces/enterprise/enterprise.interface';
import { NetWorthService } from '../../../../../../services/private/finances/netWorth/net-worth.service';
import { CommonModule } from '@angular/common';
import { EnterpriseService } from '../../../../../../services/private/enterprise/enterprise.service';
import { RouterLink } from '@angular/router';
import { DashboardViewService } from '../../../../../../services/private/finances/dashboard/dashboard-view/dashboard-view.service';
import { formatValue } from '../../../../../../services/utilities/format-dates/formatNumbers';
import { ItemService } from '../../../../../../services/private/finances/items/item/item.service';
import { MenuOffCanvasComponent } from "../menu-off-canvas/menu-off-canvas.component";

@Component({
  selector: 'app-net-worth',
  standalone: true,
  imports: [CommonModule, RouterLink, MenuOffCanvasComponent],
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
  errorMessage: string = ''
  showOption: Boolean = false
  selectedFormInput!: any
  constructor(private netWorthService: NetWorthService, private enterpriseService: EnterpriseService, private dashboardViewService: DashboardViewService, private itemService: ItemService) {
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
    this.netWorthService.getNetWorthByCurrentPeriod(this.enterpriseId, 'year').subscribe(
      response => {
        this.netWorthByCurrentYear = response.netWorthByCurrentPeriod
        console.log(this.netWorthByCurrentYear)
      },
      err => {
        console.error(err);
      }
    )
  }
  getNetWorthByCurrentMonth() {
    this.netWorthService.getNetWorthByCurrentPeriod(this.enterpriseId, 'month').subscribe(
      response => {
        this.netWorthByCurrentMonth = response.netWorthByCurrentPeriod
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
  setSelectedForm(view: "active" | "passive") {
    this.itemService.setItemToUpdate(null)
    this.itemService.setViewTypeItemSubject(view)
  }
  setDataDashboardFinance() {
    this.dashboardViewService.setView('netWorth')

  }
  formatValue(num: Number) {
    return formatValue(num)
  }
}
