import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ChartConfiguration, ChartData, ChartOptions, ChartType } from 'chart.js';
import { NgChartsModule } from 'ng2-charts';
import { ActiveService } from '../../../../../../../services/private/finances/netWorth/active/active.service';
import { PassiveService } from '../../../../../../../services/private/finances/netWorth/passive/passive.service';

@Component({
  selector: 'app-evolution',
  imports: [NgChartsModule],
  templateUrl: './evolution.component.html',
  styleUrl: '../../dashboard-finance.component.css'
})
export class EvolutionComponent implements OnInit, OnChanges {
  @Input() loading!: Boolean
  @Input() enterpriseId!: any
  @Input() typeView!: 'active' | 'passive'
  public colorsActive: string[] = [
    'rgba(89, 187, 97, 0.6)',
    'rgba(0, 120, 6, 0.6)',
    'rgba(72, 114, 71, 0.6)',
    'rgba(0, 0, 0, 0.6)'
  ]
  public colorsPassive: string[] = [
    'rgba(225, 7, 15, 0.6)',
    'rgba(255, 40, 6, 0.8)',
    'rgba(240, 0, 0, 0.3)',
    'rgba(244, 0, 12, 0.8)'
  ]
  totalPositiveItemsToCompare: any = {}
  public pieChartLabelsEvolution: string[] = []
  public pieChartTypeEvolution: any = 'bar'
  public pieChartDataEvolution?: ChartData<'bar', number[], string> = {
    labels: [],
    datasets: [
      {
        data: [],
      }
    ]
  }
  ngOnInit(): void {
    this.fetchData()
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['loading']) { this.loading = changes['loading'].currentValue }
    if (changes['typeView']) {
      this.typeView = changes['typeView'].currentValue
      this.fetchData()
    }
  }
  constructor(private activeService: ActiveService, private passiveService: PassiveService) { }
  fetchData() {
    this.loading = true
    const isActive = this.typeView == 'active'
    const mapMethod = {
      active: this.activeService.getAllActives,
      passive: this.passiveService.getAllLiabilities
    }
    const serviceMethod = isActive ? mapMethod.active : mapMethod.passive
    serviceMethod.call(isActive ? this.activeService : this.passiveService, this.enterpriseId).subscribe(
      response => {
        this.processChartData(response, isActive)
        this.loading = false
      }, err => {
        console.error(err);
      }
    )
  }
  processChartData(response: any, isActive: boolean) {
    const monthNames = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
    console.log(response);
    const totalByMonth: { [key: string]: number } = {}
    const currentYear = new Date().getFullYear()
    response.forEach((item: any) => {
      const date = new Date(item.date)
      const itemYear = date.getFullYear()
      if (itemYear == currentYear) {
        const currentMonth = monthNames[date.getMonth()]
        const value = item.amount || 0
        totalByMonth[currentMonth] = (totalByMonth[currentMonth] || 0) + value
      }
    })
    const orderedMonths = monthNames.filter((month) => totalByMonth.hasOwnProperty(month))
    this.pieChartLabelsEvolution = orderedMonths

    this.pieChartDataEvolution = {
      labels: this.pieChartLabelsEvolution,
      datasets: [
        {
          data: Object.values(totalByMonth),
          backgroundColor: isActive ? this.colorsActive.map((color) => { return color }) : this.colorsPassive.map((color) => { return color }),
          label: isActive ? 'Activos por mes' : 'Pasivos por mes',
          borderWidth: 1,
          pointStyle: 'circle',
          borderColor: isActive ? 'rgba(0, 120, 6, 0.6)' : 'rgba(157, 25, 25, 0.6)',
        }
      ],
    }
    console.log(totalByMonth)
    this.totalPositiveItemsToCompare = response
    this.loading = false
  }
}
