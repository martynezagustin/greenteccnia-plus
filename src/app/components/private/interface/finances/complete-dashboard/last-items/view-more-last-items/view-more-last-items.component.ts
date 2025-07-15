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
import { TableLastItemsComponent } from '../table-last-items/table-last-items.component';

@Component({
  selector: 'app-view-more-last-items',
  imports: [CommonModule, TableLastItemsComponent],
  templateUrl: './view-more-last-items.component.html',
  styleUrl: '../../complete-dashboard.component.css'
})
export class ViewMoreLastItemsComponent {
  type!: 'cashFlow' | 'netWorth' | null
  constructor(private router: Router) { }
  back() {
    this.router.navigate(['/dashboard/finances/dashboard-elements'])
  }


}
