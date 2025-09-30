import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { EnterpriseService } from '../../../../../../services/private/enterprise/enterprise.service';
import { CompositionComponent } from '../composition/composition.component';
import { EvolutionComponent } from '../evolution/evolution.component';
import { ProjectionComponent } from '../projection/projection.component';
import { LastRegistersComponent } from "../last-registers/last-registers.component";
import { ItemService } from '../../../../../../services/private/finances/items/item/item.service';
import { Subscription } from 'rxjs';

type CashFlowMode = 'income' | 'expense'
type NetWorthMode = 'active' | 'passive'
type ViewType = CashFlowMode | NetWorthMode;

@Component({
  selector: 'app-dashboard-items',
  imports: [CommonModule, CompositionComponent, EvolutionComponent, ProjectionComponent, LastRegistersComponent],
  templateUrl: './dashboard-items.component.html',
  styleUrl: '../dashboard-finance.component.css'
})

export class DashboardItemsComponent implements OnInit, OnChanges {
  private subscription: Subscription = new Subscription()
  enterpriseId!: any
  loading!: Boolean
  @Input() type!: 'netWorth' | 'cashFlow' | null
  typeView!: 'active' | 'passive' | 'income' | 'expense'
  constructor(private enterpriseService: EnterpriseService, private itemService: ItemService) { }

  ngOnInit(): void {
    this.getEnterpriseId()
    this.setInitialTypeView()

    this.itemService.viewItem$.subscribe(
      (view: ViewType) => {
        this.typeView = view;
        console.log("El tipo de vista es: ", this.typeView);
      }
    )
  }
  setInitialTypeView(): void {
    this.typeView = this.type === 'netWorth' ? 'active' : 'income';
    this.itemService.setViewItem(this.typeView);
  }
  changeViewElement(): void {
    const newView =
      this.typeView === 'income' ? 'expense' :
        this.typeView === 'expense' ? 'income' :
          this.typeView === 'active' ? 'passive' :
            'active';
    this.itemService.setViewItem(newView);
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
