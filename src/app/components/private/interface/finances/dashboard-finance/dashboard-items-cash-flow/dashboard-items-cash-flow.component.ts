import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { TypeViewCashFlowService } from '../../../../../../services/private/finances/cashFlow/type-view-cash-flow/type-view-cash-flow.service';
import { EnterpriseService } from '../../../../../../services/private/enterprise/enterprise.service';
import { CompositionComponent } from '../composition/composition.component';
import { EvolutionComponent } from '../evolution/evolution.component';
import { ProjectionComponent } from '../projection/projection.component';
import { LastRegistersComponent } from "../last-registers/last-registers.component";
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard-items-cash-flow',
  imports: [CommonModule, CompositionComponent, EvolutionComponent, ProjectionComponent, LastRegistersComponent],
  templateUrl: './dashboard-items-cash-flow.component.html',
  styleUrl: '../dashboard-finance.component.css'
})
export class DashboardItemsCashFlowComponent implements OnInit, OnChanges {
  enterpriseId!: any
  loading!: Boolean
  typeView!: 'income' | 'expense'
  @Input() type!: 'netWorth' | 'cashFlow'
  constructor(private typeViewCashFlowService: TypeViewCashFlowService, private enterpriseService: EnterpriseService) { }
  changeViewElement() {
    if (this.typeView == 'income') {
      this.typeViewCashFlowService.setTypeViewCashFlow(this.typeView)
      this.typeView = 'expense'
    } else {
      this.typeViewCashFlowService.setTypeViewCashFlow(this.typeView)
      this.typeView = 'income'
    }
  }
  ngOnInit(): void {
    this.getEnterpriseId()
    this.typeView = this.typeViewCashFlowService.getTypeViewCashFlow()
    if (this.typeView !== undefined) {
      this.typeViewCashFlowService.setTypeViewCashFlow(this.typeView)
    }

  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['loading']) {
      this.loading = changes['loading'].currentValue
      console.log("El loading? ", this.loading)
    }
  }
  getEnterpriseId() {
    this.enterpriseId = this.enterpriseService.getEnterpriseId()
  }
}
