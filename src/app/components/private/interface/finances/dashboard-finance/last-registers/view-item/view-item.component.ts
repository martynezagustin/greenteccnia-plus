import { Component, Input, OnInit } from '@angular/core';
import { ActiveService } from '../../../../../../../services/private/finances/netWorth/active/active.service';
import { Router } from '@angular/router';
import { ViewItemService } from '../../../../../../../services/private/finances/view-item/view-item.service';
import { formatValue } from '../../../../../../../services/utilities/format-dates/formatNumbers';
import { CommonModule } from '@angular/common';
import { Income } from '../../../../../../../../interfaces/enterprise/finances/cashFlow/income/income.interface';
import { Expense } from '../../../../../../../../interfaces/enterprise/finances/cashFlow/expense/expense.interface';
import { Active } from '../../../../../../../../interfaces/enterprise/finances/netWorth/active/active.interface';
import { Passive } from '../../../../../../../../interfaces/enterprise/finances/netWorth/passive/passive.interface';

@Component({
  selector: 'app-view-item',
  imports: [CommonModule],
  templateUrl: './view-item.component.html',
  styleUrl: './view-item.component.css'
})
export class ViewItemComponent implements OnInit {
  @Input() item!: any
  itemType: string | null = ''
  constructor(private viewItemService: ViewItemService, private router: Router) { }
  ngOnInit(): void {
    this.item = this.viewItemService.getItem()
    this.itemType = this.viewItemService.getItemViewer()
    console.log(this.itemType);
    
  }
  back() {
    this.router.navigate(['/dashboard/finances'])
  }
  formatDate(date: Date) {
    return new Date(date).toLocaleDateString('es-AR', {
      year: '2-digit',
      month: '2-digit',
      day: 'numeric'
    })
  }
  formatValue(num: Number) {
    return formatValue(num)
  }
}
