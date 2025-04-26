import { Component, Input, OnInit } from '@angular/core';
import { ActiveService } from '../../../../../../../../services/private/finances/netWorth/active/active.service';
import { Router } from '@angular/router';
import { ViewItemService } from '../../../../../../../../services/private/finances/view-item/view-item.service';
import { formatValue } from '../../../../../../../../services/utilities/format-dates/formatNumbers';

@Component({
  selector: 'app-view-item',
  imports: [],
  templateUrl: './view-item.component.html',
  styleUrl: './view-item.component.css'
})
export class ViewItemComponent implements OnInit {
  @Input() item: any
  itemType: string | null = ''
  constructor(private viewItemService: ViewItemService, private router: Router) { }
  ngOnInit(): void {
    this.item = this.viewItemService.getItem()
    this.itemType = this.viewItemService.getItemViewer()
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
