import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Income } from '../../../../../../../interfaces/enterprise/finances/cashFlow/income/income.interface';
import { Expense } from '../../../../../../../interfaces/enterprise/finances/cashFlow/expense/expense.interface';
import { Passive } from '../../../../../../../interfaces/enterprise/finances/netWorth/passive/passive.interface';
import { Active } from '../../../../../../../interfaces/enterprise/finances/netWorth/active/active.interface';
import { ChartConfiguration } from 'chart.js';
import { ItemService } from '../../../../../../services/private/finances/items/item/item.service';
import { NgChartsModule } from 'ng2-charts';
import { log } from 'node:console';
import { PeriodService } from '../../../../../../services/private/finances/dashboard/dashboard-view/filters/period/period.service';

@Component({
  selector: 'app-traced-items',
  imports: [NgChartsModule],
  templateUrl: './traced-items.component.html',
  styleUrl: '../complete-dashboard.component.css'
})
export class TracedItemsComponent implements OnChanges, OnInit{
  constructor(private itemService: ItemService, private periodService: PeriodService) { }
  loading!: Boolean
  @Input() enterpriseId!: any
  @Input() type!: 'cashFlow' | 'netWorth' | null
  @Input() selectedPeriod!: 'month' | 'year' | 'trimester'
  //arrays
  positiveItems!: Active[] | Income[]
  negativeItems!: Passive[] | Expense[]
  //algun misc
  errorMessage!: String
  //charts
  public lineChartData!: ChartConfiguration<'line'>['data']
  public lineChartType: ChartConfiguration<'line'>['type'] = 'line'
  public lineChartOptions: ChartConfiguration<'line'>['options'] = {
    responsive: true,
    plugins: {
      legend: {
        display: true
      },
    }
  }
  ngOnInit(): void {
    this.periodService.selectedPeriod$.subscribe(
      response => {
        this.selectedPeriod = response
        this.getItemsByCurrentPeriod(this.selectedPeriod)
      }
    )
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['type']) {
      this.type = changes['type'].currentValue
    }
    if (changes['enterpriseId']) {
      this.enterpriseId = changes['enterpriseId'].currentValue
    }
  }
  getItemsByCurrentPeriod(period: String) {
    this.errorMessage = ''
    this.loading = true
    console.log(period)
    this.itemService.getItemsByCurrentPeriod(this.enterpriseId, 'income', period).subscribe(
      response => {
        this.positiveItems = response
        console.log(this.positiveItems)
        this.buildLineChartData()
        this.loading = false
      },
      err => {
        console.error(err);
      }
    )
    this.itemService.getItemsByCurrentPeriod(this.enterpriseId, 'expense', period).subscribe(
      response => {
        this.negativeItems = response
        this.buildLineChartData()
        this.loading = false
      }
    )
  }
  buildLineChartData() {
    const groupPositive: { [key: string]: number } = {}
    const groupNegative: { [key: string]: number } = {}

    // Agrupamos positivos
    this.positiveItems.forEach((item: Income | Active) => {
      const date = new Date(item.date)
      const formatDate = this.selectedPeriod === 'year'
        ? new Date(date.getTime() + (3 * 60 * 60 * 1000)).toLocaleString('es-AR', { month: 'long' })
        : new Date(date.getTime() + (3 * 60 * 60 * 1000)).toLocaleDateString('es-AR', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric'
        })
      if (!groupPositive[formatDate]) groupPositive[formatDate] = 0
      groupPositive[formatDate] += item.amount
    })

    // Agrupamos negativos
    this.negativeItems.forEach((item: Expense | Passive) => {
      const date = new Date(item.date)
      const formatDate = this.selectedPeriod === 'year'
        ? new Date(date.getTime() + (3 * 60 * 60 * 1000)).toLocaleString('es-AR', { month: 'long' }).toLowerCase()
        : new Date(date.getTime() + (3 * 60 * 60 * 1000)).toLocaleDateString('es-AR', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric'
        })

      if (!groupNegative[formatDate]) groupNegative[formatDate] = 0
      groupNegative[formatDate] += item.amount
    })

    //armamos los labels
    const allLabels = Array.from(new Set([...Object.keys(groupPositive), ...Object.keys(groupNegative)])).sort((a, b) => {
      if (this.selectedPeriod == 'year') {
        const months = [
          'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
          'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'
        ]
        return months.indexOf(a.toLowerCase()) - months.indexOf(b.toLowerCase())
      }
      return a.localeCompare(b)
    })
    if(allLabels.length === 1){
      this.errorMessage = 'Para visualizar el flujo de caja anual, necesitás reportes correspondientes a al menos dos meses distintos del año seleccionado.';

    }

    const positiveValues = allLabels.map(label => groupPositive[label] || 0)

    console.log(positiveValues)
    const negativeValues = allLabels.map(label => groupNegative[label] || 0)

    this.lineChartData = {
      labels: allLabels,
      datasets: [
        {
          data: positiveValues,
          label: this.type === 'cashFlow' ? 'Ingresos' : 'Activos',
          borderColor: 'green',
          pointBackgroundColor: 'rgb(147, 243, 103)',
          backgroundColor: 'rgb(20,255,10)'
        },
        {
          data: negativeValues,
          label: this.type === 'cashFlow' ? 'Egresos' : 'Pasivos',
          borderColor: 'red',
          pointBackgroundColor: 'rgba(230,2,20,0.5)',
          backgroundColor: 'tomato'
        }
      ]
    }
    console.log(this.lineChartData);

  }
}
