import { Component, OnInit } from '@angular/core';
import { DashboardViewService } from '../../../../../services/private/finances/dashboard/dashboard-view/dashboard-view.service';
import { Router } from '@angular/router';
import { EnterpriseService } from '../../../../../services/private/enterprise/enterprise.service';
import { CommonModule } from '@angular/common';
import { NgChartsModule } from 'ng2-charts';
import { TracedItemsComponent } from './traced-items/traced-items.component';
import { CompositionItemsComponent } from "./composition-items/composition-items.component";
import { PeriodService } from '../../../../../services/private/finances/dashboard/dashboard-view/filters/period/period.service';
import { SummaryCompleteComponent } from "./summary-complete/summary-complete.component";
import { LastItemsComponent } from "./last-items/last-items.component";

@Component({
  selector: 'app-complete-dashboard',
  imports: [CommonModule, NgChartsModule, TracedItemsComponent, CompositionItemsComponent, SummaryCompleteComponent, LastItemsComponent],
  templateUrl: './complete-dashboard.component.html',
  styleUrl: './complete-dashboard.component.css'
})
export class CompleteDashboardComponent implements OnInit {
  constructor(private dashboardService: DashboardViewService, private router: Router, private enterpriseService: EnterpriseService, private periodService: PeriodService) {
  }
  enterpriseId!: any
  type!: "cashFlow" | "netWorth" | null
  loading!: Boolean
  selectedPeriod!: 'month' | 'year' | 'trimester'
  titlePositiveItemsElements!: 'Ingresos' | 'Activos'
  titleNegativeItemsElements!: 'Egresos' | 'Pasivos'
  titleChart!: 'Patrimonio neto' | 'Flujo de caja'

  positiveNumber!: Number
  negativeNumber!: Number

  ngOnInit(): void {
    this.getEnterpriseId()
    this.dashboardService.selectedView$.subscribe(
      response => {
        this.type = response
        if (this.type == 'cashFlow' && this.selectedPeriod == 'trimester') {
          this.selectedPeriod = 'month'
          this.periodService.setSelectedPeriod('month')
        }
      }
    )
    this.periodService.selectedPeriod$.subscribe(
      response => {
        this.selectedPeriod = response
      }
    )
  }
  back() {
    this.router.navigate(['/dashboard/finances'])
  }
  setPeriod() {
    const isCashFlow = this.type === 'cashFlow'
    const cashFlowOrder: Array<'month' | 'year'> = ['month', 'year']
    const netWorthOrder: Array<'trimester' | 'month' | 'year'> = ['trimester', 'month', 'year']

    const order = isCashFlow ? cashFlowOrder : netWorthOrder


    const currentIndex = order.indexOf(this.selectedPeriod as any)
    const nextIndex = (currentIndex + 1) % order.length
    this.periodService.setSelectedPeriod(order[nextIndex])
    localStorage.setItem('selectedPeriod', order[nextIndex])
    this.selectedPeriod = order[nextIndex]
  }
  getEnterpriseId() { this.enterpriseId = this.enterpriseService.getEnterpriseId() }
}
