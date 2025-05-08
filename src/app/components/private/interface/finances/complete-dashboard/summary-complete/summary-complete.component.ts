import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ItemService } from '../../../../../../services/private/finances/items/item/item.service';
import { formatValue } from '../../../../../../services/utilities/format-dates/formatNumbers';

@Component({
  selector: 'app-summary-complete',
  imports: [],
  templateUrl: './summary-complete.component.html',
  styleUrl: './summary-complete.component.css'
})
export class SummaryCompleteComponent implements OnInit, OnChanges {
  @Input() enterpriseId!: any
  positiveNumberDate: Number = 0
  positiveNumberMonth: Number = 0
  positiveNumberAnual: Number = 0
  negativeNumberDate: Number = 0
  negativeNumberMonth: Number = 0
  negativeNumberAnual: Number = 0
  constructor(private itemService: ItemService) { }
  ngOnInit(): void {
    this.itemService.getValueItemsByCurrentPeriod(this.enterpriseId, 'income', 'month').subscribe(
      response => {
        this.positiveNumberMonth = response.getItemsByCurrentPeriod
      }
    )
    this.itemService.getValueItemsByCurrentPeriod(this.enterpriseId, 'income', 'year').subscribe(
      response => {
        this.positiveNumberAnual = response.getItemsByCurrentPeriod
      }
    )
    this.itemService.getValueItemsByCurrentPeriod(this.enterpriseId, 'income', 'date').subscribe(
      response => {
        this.positiveNumberDate = response.getItemsByCurrentPeriod
      }
    )
    //egresos
    this.itemService.getValueItemsByCurrentPeriod(this.enterpriseId, 'expense', 'month').subscribe(
      response => {
        this.negativeNumberMonth = response.getItemsByCurrentPeriod
      }
    )
    this.itemService.getValueItemsByCurrentPeriod(this.enterpriseId, 'expense', 'year').subscribe(
      response => {
        this.negativeNumberAnual = response.getItemsByCurrentPeriod
      }
    )
    this.itemService.getValueItemsByCurrentPeriod(this.enterpriseId, 'expense', 'date').subscribe(
      response => {
        this.negativeNumberDate = response.getItemsByCurrentPeriod
      }
    )
  
  }
  
  ngOnChanges(changes: SimpleChanges): void {
    this.enterpriseId = changes['enterpriseId'].currentValue
  }
  formatValue(num: Number){
    return formatValue(num)
  }
}
