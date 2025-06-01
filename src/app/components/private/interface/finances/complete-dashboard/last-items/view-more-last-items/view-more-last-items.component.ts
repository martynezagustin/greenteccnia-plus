import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { ItemService } from '../../../../../../../services/private/finances/items/item/item.service';
import { Active } from '../../../../../../../../interfaces/enterprise/finances/netWorth/active/active.interface';
import { Income } from '../../../../../../../../interfaces/enterprise/finances/cashFlow/income/income.interface';
import { Passive } from '../../../../../../../../interfaces/enterprise/finances/netWorth/passive/passive.interface';
import { Expense } from '../../../../../../../../interfaces/enterprise/finances/cashFlow/expense/expense.interface';
import { formatValue } from '../../../../../../../services/utilities/format-dates/formatNumbers';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from '../../../../user/user-data/security/dashboard/dashboard.component';
import { DashboardViewService } from '../../../../../../../services/private/finances/dashboard/dashboard-view/dashboard-view.service';

@Component({
  selector: 'app-view-more-last-items',
  imports: [CommonModule],
  templateUrl: './view-more-last-items.component.html',
  styleUrl: '../../complete-dashboard.component.css'
})
export class ViewMoreLastItemsComponent implements OnInit {
  loading = true
  type!: 'cashFlow' | 'netWorth' | null
  enterpriseId: any = localStorage.getItem('enterpriseId')
  errorMessage!: string
  public allItems: (Income | Expense | Active | Passive)[] = []
  constructor(private itemService: ItemService, private dashboardService: DashboardViewService, private router: Router) { }
  back() {
    this.router.navigate(['/dashboard/finances/dashboard-elements'])
  }
  ngOnInit(): void {
    this.dashboardService.selectedView$.subscribe(
      response => {
        this.type = response
      },
      err => {
        console.error(err);

      }
    )
    this.getEnterpriseId();
    this.getAllItemsPerOrder()
    this.getItemsByOrder()
    console.log(this.allItems)
  }

  getItemsByOrder() {
    this.allItems.sort((a, b) => {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();
      return dateB - dateA; // Ordena de más reciente a más antiguo
    });
    this.allItems = this.allItems //limitar a 7 elementos
    console.log(this.allItems);

  }
  getAllItemsPerOrder() {
    this.loading = true
    const type1 = this.type === 'cashFlow' ? 'income' : 'active'
    const type2 = this.type === 'cashFlow' ? 'expense' : 'passive'
    forkJoin([
      this.itemService.getAllItems(this.enterpriseId, type1),
      this.itemService.getAllItems(this.enterpriseId, type2),
    ]).subscribe(
      ([items1 = [], items2 = []]: [Active[] | Income[], Passive[] | Expense[]]) => {
        this.allItems = [...items1, ...items2];
        console.log(items1, items2)
        this.getItemsByOrder()
        this.loading = false
        this.errorMessage = this.allItems.length > 0 ? '' : 'No hay items para mostrar';
      },
      err => {
        console.warn("No llegaron los datos", err);
        this.loading = false
      }
    )
  }
  getEnterpriseId() {
    this.enterpriseId = localStorage.getItem('enterpriseId');
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
    return dateObj.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    });
  }
}
