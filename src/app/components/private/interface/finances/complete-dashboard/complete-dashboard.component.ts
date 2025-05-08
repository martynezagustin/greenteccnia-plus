import { Component, Input, OnInit } from '@angular/core';
import { DashboardViewService } from '../../../../../services/private/finances/dashboard/dashboard-view/dashboard-view.service';
import { Router } from '@angular/router';
import { CashFlowService } from '../../../../../services/private/finances/cashFlow/cash-flow.service';
import { EnterpriseService } from '../../../../../services/private/enterprise/enterprise.service';
import { formatValue } from '../../../../../services/utilities/format-dates/formatNumbers';
import { CommonModule } from '@angular/common';
import { NetWorthService } from '../../../../../services/private/finances/netWorth/net-worth.service';
import { ItemService } from '../../../../../services/private/finances/items/item/item.service';
import { NgChartsModule } from 'ng2-charts';
import { TracedItemsComponent } from './traced-items/traced-items.component';
import { CompositionComponent } from "../dashboard-finance/composition/composition.component";
import { CompositionItemsComponent } from "./composition-items/composition-items.component";
import { PeriodService } from '../../../../../services/private/finances/dashboard/dashboard-view/filters/period/period.service';
import { SummaryCompleteComponent } from "./summary-complete/summary-complete.component";

@Component({
  selector: 'app-complete-dashboard',
  imports: [CommonModule, NgChartsModule, TracedItemsComponent, CompositionItemsComponent, SummaryCompleteComponent],
  templateUrl: './complete-dashboard.component.html',
  styleUrl: './complete-dashboard.component.css'
})
export class CompleteDashboardComponent implements OnInit {
  constructor(private dashboardService: DashboardViewService, private router: Router, private enterpriseService: EnterpriseService, private periodService: PeriodService ) {
    this.selectedPeriod = 'month'
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
    this.type = this.dashboardService.getView()
    this.enterpriseId = this.enterpriseService.getEnterpriseId()
    this.periodService.selectedPeriod$.subscribe(
      response => {
        console.log("Que es el behavior subject?" , response)
      }
    )
  }
  back() {
    this.router.navigate(['/dashboard/finances'])
  }
  setPeriod() {
    const isCashFlow = this.type === 'cashFlow'
    const cashFlowOrder: Array< 'month' | 'year'> = ['month', 'year']
    const netWorthOrder: Array<'trimester' | 'year'> = ['trimester', 'year']

    const order = isCashFlow ? cashFlowOrder : netWorthOrder

    const currentIndex = order.indexOf(this.selectedPeriod as any)
    const nextIndex = (currentIndex + 1) % order.length
    this.periodService.setSelectedPeriod(order[nextIndex])
    this.selectedPeriod = order[nextIndex]
  }

}
