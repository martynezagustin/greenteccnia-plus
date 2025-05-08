import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Active } from '../../../../../../../interfaces/enterprise/finances/netWorth/active/active.interface';
import { ActiveService } from '../../../../../../services/private/finances/netWorth/active/active.service';
import { Router } from '@angular/router';
import { ViewItemService } from '../../../../../../services/private/finances/view-item/view-item.service';
import { Income } from '../../../../../../../interfaces/enterprise/finances/cashFlow/income/income.interface';
import { EnterpriseService } from '../../../../../../services/private/enterprise/enterprise.service';
import { formatValue } from '../../../../../../services/utilities/format-dates/formatNumbers';
import { PassiveService } from '../../../../../../services/private/finances/netWorth/passive/passive.service';
import { Passive } from '../../../../../../../interfaces/enterprise/finances/netWorth/passive/passive.interface';
import { CommonModule } from '@angular/common';
import { Expense } from '../../../../../../../interfaces/enterprise/finances/cashFlow/expense/expense.interface';
import { IncomeService } from '../../../../../../services/private/finances/cashFlow/income/income.service';
import { ExpenseService } from '../../../../../../services/private/finances/cashFlow/expense/expense.service';
import { ItemService } from '../../../../../../services/private/finances/items/item/item.service';

@Component({
  selector: 'app-last-registers',
  imports: [CommonModule],
  templateUrl: './last-registers.component.html',
  styleUrl: '../dashboard-finance.component.css'
})
export class LastRegistersComponent implements OnChanges {
  totalItems: any[] = []
  label: 'active' | 'passive' | null = null
  @Input() loading!: Boolean
  @Input() enterpriseId!: any
  @Input() typeView!: 'active' | 'passive' | 'income' | 'expense'
  errorMessage: String = ''
  constructor(private itemService: ItemService, private viewItemService: ViewItemService, private router: Router, private enterpriseService: EnterpriseService) { }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['enterpriseId']) {
      this.enterpriseId = changes['enterpriseId'].currentValue
      console.log("Llega el id a ultimos registros?", this.enterpriseId);

    }
    if (changes['loading']) {
      this.loading = changes['loading'].currentValue
      console.log("Llega el loading a ultimos registros?", this.loading);
    }
    if (changes['typeView']) {
      this.typeView = changes['typeView'].currentValue
      console.log("Llega el type view a ultimos registros?", this.typeView);
      this.getValues()
    }
    if (changes['typeView'] && changes['enterpriseId']) {
      this.getValues()
    }
  }
  getValues() {
    this.errorMessage = ''
    this.loading = true
    this.itemService.getAllItems(this.enterpriseId, this.typeView).subscribe(
      response => {
        this.fetchData(response)
        this.loading = false
      },
      err => {
        console.error(err);
        this.errorMessage = err.error.message
        this.loading = false
      }
    )
  }
  deleteItem(itemId: String) {
    console.log(itemId)
    this.itemService.deleteItem(this.enterpriseId, this.typeView, itemId).subscribe(
      response => {
        console.log(response);
        this.totalItems.filter((item) => itemId !== item._id)
      },
      err => {
        console.error(err);
      }
    )
  }
  formatValue(num: Number) {
    return formatValue(num)
  }
  fetchData(response: any) {
    this.totalItems = response.sort((a: any, b: any) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, 3).map((i: any) => ({
      ...(i as Active | Passive | Income | Expense),
      ...i, formattedDate: new Date(new Date(i.date).getTime() + (3 * 60 * 60 * 1000)).toLocaleDateString('es-AR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
      })
    })
    )
    console.log("Tus total items", this.totalItems);

  }
}
