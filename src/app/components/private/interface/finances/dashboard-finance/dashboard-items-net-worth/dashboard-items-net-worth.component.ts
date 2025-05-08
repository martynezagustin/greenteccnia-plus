import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { ChartData, ChartType } from 'chart.js';
import { ActiveService } from '../../../../../../services/private/finances/netWorth/active/active.service';
import { IncomeService } from '../../../../../../services/private/finances/cashFlow/income/income.service';
import { NgChartsModule } from 'ng2-charts';
import { ViewItemService } from '../../../../../../services/private/finances/view-item/view-item.service';
import { Router } from '@angular/router';
import { formatValue } from '../../../../../../services/utilities/format-dates/formatNumbers';
import { CommonModule } from '@angular/common';
import { EnterpriseService } from '../../../../../../services/private/enterprise/enterprise.service';
import { Active } from '../../../../../../../interfaces/enterprise/finances/netWorth/active/active.interface';
import { PassiveService } from '../../../../../../services/private/finances/netWorth/passive/passive.service';
import { CompositionComponent } from "../composition/composition.component";
import { TypeViewNetWorthService } from '../../../../../../services/private/finances/netWorth/typeViewNetWorth/type-view-net-worth.service';
import { EvolutionComponent } from "../evolution/evolution.component";
import { LastRegistersComponent } from "../last-registers/last-registers.component";
import { ProjectionComponent } from "../projection/projection.component";

@Component({
  selector: 'app-dashboard-items-net-worth',
  imports: [NgChartsModule, CommonModule, CompositionComponent, EvolutionComponent, LastRegistersComponent, ProjectionComponent],
  templateUrl: './dashboard-items-net-worth.component.html',
  styleUrl: '../dashboard-finance.component.css'
})
export class DashboardItemsNetWorthComponent implements OnInit {
  @Input() type!: 'cashFlow' | 'netWorth'
  enterpriseId!: any
  loading!: Boolean
  typeView!: 'active' | 'passive'
  //lastregisters
  totalPositiveItems: Active[] = []
  constructor(private enterpriseService: EnterpriseService, private typeViewNetWorthService: TypeViewNetWorthService) { }
  getEnterpriseId() {
    this.enterpriseId = this.enterpriseService.getEnterpriseId();
  }
  ngOnInit(): void {
    this.getEnterpriseId()
    this.typeView = this.typeViewNetWorthService.getTypeViewNetWorth()
    if (this.typeView !== undefined) {
      this.typeViewNetWorthService.setTypeViewNetWorth(this.typeView)
    }
  }
  changeViewElement() {
    if (this.typeView == 'active') {
      this.typeViewNetWorthService.setTypeViewNetWorth(this.typeView)
      this.typeView = 'passive'
    } else {
      this.typeViewNetWorthService.setTypeViewNetWorth(this.typeView)
      this.typeView = 'active'
    }
  }
}
