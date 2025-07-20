import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ChartConfiguration, ChartData, ChartOptions, ChartType } from 'chart.js';
import { NgChartsModule } from 'ng2-charts';
import { ItemService } from '../../../../../../services/private/finances/items/item/item.service';

@Component({
  selector: 'app-evolution',
  imports: [NgChartsModule],
  templateUrl: './evolution.component.html',
  styleUrl: '../dashboard-finance.component.css'
})
export class EvolutionComponent implements OnChanges {
  @Input() loading!: Boolean
  @Input() enterpriseId!: any
  @Input() typeView!: 'active' | 'passive' | 'income' | 'expense'
  errorMessage: String = ''
  public colorsPositive: string[] = [
    'rgba(89, 187, 97, 0.6)',
    'rgba(0, 120, 6, 0.6)',
    'rgba(72, 114, 71, 0.6)',
    'rgba(0, 0, 0, 0.6)'
  ]
  public colorsNegative: string[] = [
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
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['loading']) { this.loading = changes['loading'].currentValue }
    if (changes['typeView']) {
      this.typeView = changes['typeView'].currentValue
      this.fetchData()
    }
  }
  constructor(private itemService: ItemService) { }
  fetchData() {
    this.errorMessage = ''
    this.loading = true
    this.itemService.getAllItems(this.enterpriseId, this.typeView).subscribe(
      response => {
        this.loading = false
        this.processChartData(response)
      },
      err => {
        console.log("El error", err.error.message)
        this.errorMessage = err.error.message
        this.loading = false
      }
    )
  }
  processChartData(response: any) {
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
    console.log("Que meses hay?", orderedMonths)
    this.pieChartLabelsEvolution = orderedMonths
    if(orderedMonths.length < 3){
      this.errorMessage = 'Para visualizar la evolución en los gráficos, necesitás al menos 3 meses de datos cargados. Una vez alcanzado ese periodo, la información comenzará a reflejarse automáticamente.'
    }
    this.pieChartDataEvolution = {
      labels: this.pieChartLabelsEvolution,
      datasets: [
        {
          data: Object.values(totalByMonth).reverse(),
          backgroundColor: this.typeView == 'active' || this.typeView == 'income' ? this.colorsPositive.map((color) => { return color }) : this.colorsNegative.map((color) => { return color }),
          label: this.typeView == 'active' ? 'Activos por mes' : this.typeView == 'income' ? 'Ingresos por mes' : this.typeView == 'passive' ? 'Pasivos por mes' : "Egresos por mes",
          borderWidth: 1,
          pointStyle: 'circle',
          borderColor: this.typeView == 'active' || this.typeView == 'income' ? 'rgba(0, 120, 6, 0.6)' : this.typeView == 'passive' || this.typeView == 'expense' ? 'rgba(157, 25, 25, 0.6)' : 'rgb(100,100,100)',
        }
      ],
    }
    console.log(totalByMonth)
    this.totalPositiveItemsToCompare = response
  }
}
