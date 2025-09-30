import { Component, Input, OnInit } from '@angular/core';
import { ItemService } from '../../../../../../../services/private/finances/items/item/item.service';
import { Active } from '../../../../../../../../interfaces/enterprise/finances/netWorth/active/active.interface';
import { Passive } from '../../../../../../../../interfaces/enterprise/finances/netWorth/passive/passive.interface';
import { Income } from '../../../../../../../../interfaces/enterprise/finances/cashFlow/income/income.interface';
import { Expense } from '../../../../../../../../interfaces/enterprise/finances/cashFlow/expense/expense.interface';
import { DashboardViewService } from '../../../../../../../services/private/finances/dashboard/dashboard-view/dashboard-view.service';
import { formatValue } from '../../../../../../../services/utilities/format-dates/formatNumbers';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-more-last-registers',
  imports: [CommonModule],
  templateUrl: './view-more-last-registers.component.html',
  styleUrl: './view-more-last-registers.component.css'
})
export class ViewMoreLastRegistersComponent implements OnInit {
  //podria configurarse aqui un behaviorsubject para peticionar mejor la carga de componentes
  type!: 'cashFlow' | 'netWorth' | null
  typeView!: 'income' | 'expense' | 'active' | 'passive'
  enterpriseId: any = localStorage.getItem('enterpriseId')
  loading!: Boolean
  items: Active[] | Passive[] | Income[] | Expense[] = []
  label: 'active' | 'passive' | 'income' | 'expense' | null = null
  errorMessage!: string | null
  constructor(private itemService: ItemService, private dashboardService: DashboardViewService, private router: Router) { }
  ngOnInit(): void {
    this.dashboardService.selectedView$.subscribe(
      response => {
        this.type = response
        this.itemService.viewItem$.subscribe(
          (response: 'income' | 'expense' | 'active' | 'passive') => {
            this.typeView = response
            this.label = response
            this.getAllItemsPerOrder()
            this.loading = false
          }
        )
        console.log(this.label)
      }
    )
  }
  getAllItemsPerOrder() {
    this.loading = true
    this.itemService.getAllItems(this.enterpriseId, this.typeView).subscribe(
      response => {
        this.items = response
        console.log(this.items)
        this.loading = false
      }, err => {
        console.error(err);
        this.errorMessage = err.error.message || 'Error al cargar los items';
        this.loading = false
      }
    )
  }
  //algunos valids
  getItemMainField(item: Active | Passive | Income | Expense): string {
    return 'concept' in item ? item.concept : 'typeAccount' in item ? item.typeAccount : ''
  }
  getCategory(item: Active | Passive | Income | Expense): string {
    return 'category' in item ? item.category : ''
  }
  getPaymentMethod(item: Active | Passive | Income | Expense): string {
    return 'paymentMethod' in item ? item.paymentMethod : ''
  }
  formatValue(num: Number) {
    return formatValue(num)
  }
  formatDate(date: Date) {
    const dateObj = new Date(date);
    dateObj.setUTCHours(dateObj.getHours() + 3)
    return dateObj.toLocaleDateString('es-AR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    });
  }
  back() {
    this.loading = true
    this.router.navigate(['/dashboard/finances'])
  }
}
