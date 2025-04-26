import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Active } from '../../../../../../../../interfaces/enterprise/finances/netWorth/active/active.interface';
import { ActiveService } from '../../../../../../../services/private/finances/netWorth/active/active.service';
import { Router } from '@angular/router';
import { ViewItemService } from '../../../../../../../services/private/finances/view-item/view-item.service';
import { IncomeService } from '../../../../../../../services/private/finances/cashFlow/income/income.service';
import { Income } from '../../../../../../../../interfaces/enterprise/finances/cashFlow/income/income.interface';
import { EnterpriseService } from '../../../../../../../services/private/enterprise/enterprise.service';
import { formatValue } from '../../../../../../../services/utilities/format-dates/formatNumbers';
import { PassiveService } from '../../../../../../../services/private/finances/netWorth/passive/passive.service';
import { Passive } from '../../../../../../../../interfaces/enterprise/finances/netWorth/passive/passive.interface';
import { response } from 'express';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-last-registers',
  imports: [CommonModule],
  templateUrl: './last-registers.component.html',
  styleUrl: '../../dashboard-finance.component.css'
})
export class LastRegistersComponent implements OnInit, OnChanges {
  @Input() enterpriseId!: any
  totalItems: any[] = []
  label: 'active' | 'passive' | null = null
  @Input() loading: Boolean = false
  @Input() type!: 'netWorth' | 'cashFlow' | null
  @Input() typeView!: 'active' | 'passive'
  constructor(private activeService: ActiveService, private passiveService: PassiveService, private viewItemService: ViewItemService, private router: Router, private enterpriseService: EnterpriseService) { }
  ngOnInit(): void {
    this.getValues()
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['enterpriseId']) {
      this.enterpriseId = changes['enterpriseId'].currentValue
    }
    if (changes['loading']) {
      this.loading = changes['loading'].currentValue
    }
    if (changes['typeView']) {
      this.typeView = changes['typeView'].currentValue
      this.getValues()
    }

  }
  getValues() {
    this.loading = true
    const isActive = this.typeView == 'active' ? true : false
    const mapMethod = {
      active: this.activeService.getAllActives,
      passive: this.passiveService.getAllLiabilities
    }
    const serviceMethod = isActive ? mapMethod.active : mapMethod.passive
    serviceMethod.call(isActive ? this.activeService : this.passiveService, this.enterpriseId).subscribe(
      response => {
        this.fetchData(response)
        this.loading =false
      }, err => {
        console.error(err);
        this.loading =false
      }
    )
  }
  viewItem(item: any, itemType: 'active' | 'passive' | 'income' | 'expense') {
    this.viewItemService.setItemViewer(item, itemType)
    this.router.navigate(['/dashboard/finances/view-item'])
  }
  getEnterpriseId() {
    this.enterpriseId = this.enterpriseService.getEnterpriseId()
  }
  formatValue(num: Number) {
    return formatValue(num)
  }
  fetchData(response: (Active | Passive)[]) {
    this.totalItems = (response as (Active | Passive)[]).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, 3).map((i) => ({
      ...i, formattedDate: new Date(i.date).toLocaleDateString('es-AR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
      })
    })
    )
  }
}
