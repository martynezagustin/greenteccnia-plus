import { Component, Input, OnInit } from '@angular/core';
import { ActiveService } from '../../../../../../../services/private/finances/netWorth/active/active.service';
import { CommonModule } from '@angular/common';
import { formatValue } from '../../../../../../../services/utilities/format-dates/formatNumbers';

@Component({
  selector: 'app-projection',
  imports: [CommonModule],
  templateUrl: './projection.component.html',
  styleUrl: '../../dashboard-finance.component.css'
})
export class ProjectionComponent implements OnInit {
  @Input() loading!: Boolean
  @Input() enterpriseId: any
  @Input() typeView!: 'active' | 'passive'
  projectedPositiveItemsByNextDate: Number = 0
  projectedPositiveItemsByNextMonth: Number = 0
  projectedPositiveItemsByNextYear: Number = 0
  constructor(private activeService: ActiveService) { }
  ngOnInit(): void {
    this.projectionItemsByNextDate()
    this.projectionItemsByNextMonth()
    this.projectionItemsByNextYear()
  }
  projectionItemsByNextDate(): Number {
    this.loading = true
    this.activeService.projectedActivesForNextDate(this.enterpriseId).subscribe(
      (response: Number) => {
        this.projectedPositiveItemsByNextDate = response
        this.loading = false
      }
      , err => {
        console.error(err);
      }
    )
    return this.projectedPositiveItemsByNextMonth
  }
  projectionItemsByNextMonth(): Number {
    this.loading = true
    this.activeService.projectedActivesForNextMonth(this.enterpriseId).subscribe(
      (response: Number) => {
        this.projectedPositiveItemsByNextMonth = response
        this.loading = false
      }
      , err => {
        console.error(err);
      }
    )
    return this.projectedPositiveItemsByNextMonth
  }
  projectionItemsByNextYear(): Number {
    this.loading = true
    this.activeService.projectedActivesForNextYear(this.enterpriseId).subscribe(
      (response: Number) => {
        this.projectedPositiveItemsByNextYear = response
        this.loading = false
      },
      err => {
        console.error(err);
      }
    )
    return this.projectedPositiveItemsByNextYear
  }
  formatValue(num: Number) {
    return formatValue(num)
  }
}
