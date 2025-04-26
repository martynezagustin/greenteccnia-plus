import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ActiveService } from '../../../../../../services/private/finances/netWorth/active/active.service';
import { PassiveService } from '../../../../../../services/private/finances/netWorth/passive/passive.service';
import { NetWorthService } from '../../../../../../services/private/finances/netWorth/net-worth.service';
import { formatValue } from '../../../../../../services/utilities/format-dates/formatNumbers';

@Component({
  selector: 'app-summary',
  imports: [CommonModule],
  templateUrl: './summary.component.html',
  styleUrl: '../dashboard-finance.component.css'
})
export class SummaryComponent implements OnInit, OnChanges {
  @Input() loading!: Boolean
  @Input() type!: 'netWorth' | 'cashFlow' | null
  @Input() enterpriseId!: String
  totalPositiveValueRoster: String = ''
  totalNegativeValueRoster: String = ''
  differenceValueRoster: String = ''
  totalPositiveValues: Number = 0
  totalNegativeValues: Number = 0
  totalDifference: Number = 0
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['enterpriseId']) {
      this.enterpriseId = changes['enterpriseId'].currentValue
    }
    if (changes['type']) {
      this.type = changes['type'].currentValue
    }
  }
  ngOnInit(): void {
    switch (this.type) {
      case 'netWorth':
        this.totalPositiveValueRoster = 'activos'
        this.totalNegativeValueRoster = 'pasivos'
        this.differenceValueRoster = 'Patrimonio neto'
        break;
      default:
        this.totalPositiveValueRoster = 'ingresos'
        this.totalNegativeValueRoster = 'egresos'
        this.differenceValueRoster = 'Flujo de caja'
        break;
    }
    this.totalPositiveValues = this.getTotalPositiveValues()
    this.totalNegativeValues = this.getTotalNegativeValues()
    this.totalDifference = this.getDifferenceValue()
  }
  constructor(private activeService: ActiveService, private passiveService: PassiveService, private netWorthService: NetWorthService) { }
  getTotalPositiveValues(): Number {
    this.loading = true
    if (this.type == 'netWorth') {
      this.activeService.getTotalActivesByNumber(this.enterpriseId).subscribe(
        response => {
          this.totalPositiveValues = response;
          this.loading = false
        },
        err => {
          console.error(err);
        }
      );
      return 0
    }
    return parseFloat(this.totalPositiveValues.toString());
  }
  getTotalNegativeValues(): Number {
    this.loading = true
    if (this.type == 'netWorth') {
      this.passiveService.getTotalLiabilitiesByNumber(this.enterpriseId).subscribe(
        response => {
          this.totalNegativeValues = response
          this.loading = false
        },
        err => {
          console.error(err);
        }
      )
      return 0
    }
    return parseFloat(this.totalNegativeValues.toString())
  }
  getDifferenceValue(): Number {
    this.loading = true
    if (this.type == 'netWorth') {
      this.netWorthService.getNetWorth(this.enterpriseId).subscribe(
        response => {
          this.totalDifference = response
          this.loading = false
        }
        , err => {
          console.error(err);
        }
      )
      return 0
    }
    return parseFloat(this.totalDifference.toString())
  }
  formatValue(num: Number) {
    return formatValue(num)
  }
}
