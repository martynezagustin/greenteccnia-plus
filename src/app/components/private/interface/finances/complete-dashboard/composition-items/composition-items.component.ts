import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ChartData, ChartOptions, ChartType } from 'chart.js';
import { NgChartsModule } from 'ng2-charts';
import { ItemService } from '../../../../../../services/private/finances/items/item/item.service';
import { PeriodService } from '../../../../../../services/private/finances/dashboard/dashboard-view/filters/period/period.service';
import { forkJoin } from 'rxjs';
import { EnterpriseService } from '../../../../../../services/private/enterprise/enterprise.service';
import { DashboardViewService } from '../../../../../../services/private/finances/dashboard/dashboard-view/dashboard-view.service';

@Component({
  selector: 'app-composition-items',
  imports: [NgChartsModule],
  templateUrl: './composition-items.component.html',
  styleUrl: '../complete-dashboard.component.css'
})
export class CompositionItemsComponent implements OnInit {
  constructor(private itemService: ItemService, private periodService: PeriodService, private enterpriseService: EnterpriseService, private dashboardService: DashboardViewService) { }
  positiveValueItems: number = 0
  negativeValueItems: number = 0
  errorMessage: String = ''
  //para graficos
  enterpriseId!: string | null
  loading!: Boolean
  @Input() typeView!: 'active' | 'passive' | 'income' | 'expense'
  type!: 'cashFlow' | 'netWorth' | null
  //change con un behavior subject
  selectedPeriod!: 'month' | 'date' | 'year' | 'trimester'
  public pieChartLabels: string[] = []
  public pieChartData!: ChartData<'pie'>
  public pieChartType: ChartType = 'pie'
  public pieChartOptions: ChartOptions = {
    responsive: true
  }
  ngOnInit(): void {
    this.getEnterpriseId();

    // Combine both observables and only call getData when either changes
    this.periodService.selectedPeriod$.subscribe(period => {
      this.selectedPeriod = period;
      if (this.type) {
        this.getData();
      }
    });

    this.dashboardService.selectedView$.subscribe(view => {
      this.type = view;
      if (this.selectedPeriod) {
        this.getData();
      }
    });
  }
  getData() {
    this.loading = true
    this.errorMessage = ''
    if (this.type == 'cashFlow') {
      forkJoin({
        income: this.itemService.getValueItemsByCurrentPeriod(this.enterpriseId, 'income', this.selectedPeriod),
        expense: this.itemService.getValueItemsByCurrentPeriod(this.enterpriseId, 'expense', this.selectedPeriod),
      }).subscribe({
        next: ({ income, expense }) => {
          this.positiveValueItems = income.getItemsByCurrentPeriod || 0
          this.negativeValueItems = expense.getItemsByCurrentPeriod || 0
          this.loading = false
          this.errorMessage = this.positiveValueItems === 0 && this.negativeValueItems === 0 ? 'No se puede realizar un gráfico si no se han ingresado datos de ingresos y egresos del mes actual.' : ''
          if (!this.errorMessage) {
            this.updatePieChartData()
          }
        },
        error: (err) => {
          this.errorMessage = err.error.message
          console.error(err);
          this.loading = false
        }
      })
    } else {
      forkJoin({
        active: this.itemService.getValueItemsByCurrentPeriod(this.enterpriseId, 'active', this.selectedPeriod),
        passive: this.itemService.getValueItemsByCurrentPeriod(this.enterpriseId, 'passive', this.selectedPeriod),
      }).subscribe({
        next: ({ active, passive }) => {
          this.positiveValueItems = active.getItemsByCurrentPeriod
          this.negativeValueItems = passive.getItemsByCurrentPeriod
          console.log("Valores de items patrimonio neto", this.positiveValueItems, this.negativeValueItems)
          this.errorMessage = this.positiveValueItems === 0 && this.negativeValueItems === 0 ? 'No se puede realizar un gráfico si no se han ingresado datos de activos y pasivos del mes actual.' : ''
          this.loading = false
          if (!this.errorMessage) {
            this.updatePieChartData()
          }
        },
        error: (err) => {
          this.errorMessage = err.error.message
          console.error(err);
          this.loading = false
        }
      })
    }
  }
  updatePieChartData() {
    this.pieChartLabels = this.type == 'cashFlow' ? ['Ingresos', 'Egresos'] : ['Activos', 'Pasivos']
    this.pieChartData = {
      labels: this.pieChartLabels,
      datasets: [
        {
          data: [this.positiveValueItems ? this.positiveValueItems : 0, this.negativeValueItems ? this.negativeValueItems : 0],
          label: 'Mensual',
          backgroundColor: ['green', 'red']
        }
      ]
    }
  }
  getEnterpriseId() {
    this.enterpriseId = this.enterpriseService.getEnterpriseId()
  }
}
