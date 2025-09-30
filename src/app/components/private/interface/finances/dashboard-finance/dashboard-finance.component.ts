import { Component, OnInit } from '@angular/core';
import { EnterpriseService } from '../../../../../services/private/enterprise/enterprise.service';
import { CommonModule } from '@angular/common';
import { NgChartsModule } from 'ng2-charts';
import { SummaryComponent } from "./summary/summary.component";
import { Router} from '@angular/router';
import { DashboardViewService } from '../../../../../services/private/finances/dashboard/dashboard-view/dashboard-view.service';
import { DashboardItemsComponent } from './dashboard-items/dashboard-items.component';
@Component({
  selector: 'app-dashboard-finance',
  imports: [CommonModule, NgChartsModule, SummaryComponent, DashboardItemsComponent],
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
    this.dashboardViewService.selectedView$.subscribe(
      response => {
        this.type = response
      }
    )
    if (this.type === 'netWorth') {
      this.title = 'Elementos del patrimonio neto'
    } else {
      this.title = 'Elementos del flujo de caja'
    }
  }
  getEnterpriseId() {
    this.enterpriseService.getEnterpriseId()
  }
  back() {
    this.title = ''
    this.router.navigate(['/dashboard'])
  }
  goToDashboard(type: 'cashFlow' | 'netWorth') {
    this.dashboardViewService.setView(type)
    this.router.navigate(['/dashboard/finances/dashboard-elements'])
  }
}
