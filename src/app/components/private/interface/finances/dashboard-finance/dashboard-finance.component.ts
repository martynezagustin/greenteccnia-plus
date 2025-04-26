import { Component, OnInit } from '@angular/core';
import { ActiveService } from '../../../../../services/private/finances/netWorth/active/active.service';
import { EnterpriseService } from '../../../../../services/private/enterprise/enterprise.service';
import { CommonModule } from '@angular/common';
import { BaseChartDirective, NgChartsModule } from 'ng2-charts';
import { PassiveService } from '../../../../../services/private/finances/netWorth/passive/passive.service';
import { NetWorthService } from '../../../../../services/private/finances/netWorth/net-worth.service';
import { from, Observable } from 'rxjs';
import { ChartConfiguration, ChartData, ChartOptions, ChartType } from 'chart.js';
import { SummaryComponent } from "./summary/summary.component";
import { CompositionComponent } from "./dashboard-items-net-worth/composition/composition.component";
import { Router, RouterOutlet } from '@angular/router';
import { Active } from '../../../../../../interfaces/enterprise/finances/netWorth/active/active.interface';
import { DateDevicePipe } from '../../../../../pipes/date-device.pipe';
import { EvolutionComponent } from './dashboard-items-net-worth/evolution/evolution.component';
import { LastRegistersComponent } from "./dashboard-items-net-worth/last-registers/last-registers.component";
import { formatValue } from '../../../../../services/utilities/format-dates/formatNumbers';
import { DashboardViewService } from '../../../../../services/private/finances/dashboard/dashboard-view/dashboard-view.service';
import { ProjectionComponent } from "./dashboard-items-net-worth/projection/projection.component";
import { DashboardItemsNetWorthComponent } from "./dashboard-items-net-worth/dashboard-items-net-worth.component";
@Component({
  selector: 'app-dashboard-finance',
  imports: [CommonModule, NgChartsModule, SummaryComponent, DashboardItemsNetWorthComponent],
  templateUrl: './dashboard-finance.component.html',
  styleUrl: './dashboard-finance.component.css'
})
export class DashboardFinanceComponent implements OnInit {
  constructor(private enterpriseService: EnterpriseService, private dashboardViewService: DashboardViewService, private router: Router) {
  }
  type: 'cashFlow' | 'netWorth' | null = null
  enterpriseId: any = ''
  title: string = ''
  //opciones adicionales
  loading: Boolean = false
  ngOnInit(): void {
    this.enterpriseId = this.enterpriseService.getEnterpriseId()
    this.type = this.dashboardViewService.getView()
    if(this.type === 'netWorth'){
      this.title = 'Elementos del patrimonio neto'
    } else{
      this.title = 'Elementos del flujo de caja'
    }
  }
  getEnterpriseId() {
    this.enterpriseService.getEnterpriseId()
  }
  back() {
    this.dashboardViewService.clearView()
    this.title = ''
    this.router.navigate(['/dashboard'])
  }
}
