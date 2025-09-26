import { Component, Input, OnInit } from '@angular/core';
import { Income } from '../../../../../../../interfaces/enterprise/finances/cashFlow/income/income.interface';
import { Expense } from '../../../../../../../interfaces/enterprise/finances/cashFlow/expense/expense.interface';
import { Passive } from '../../../../../../../interfaces/enterprise/finances/netWorth/passive/passive.interface';
import { Active } from '../../../../../../../interfaces/enterprise/finances/netWorth/active/active.interface';
import { ChartConfiguration } from 'chart.js';
import { ItemService } from '../../../../../../services/private/finances/items/item/item.service';
import { NgChartsModule } from 'ng2-charts';
import { PeriodService } from '../../../../../../services/private/finances/dashboard/dashboard-view/filters/period/period.service';
import { DashboardViewService } from '../../../../../../services/private/finances/dashboard/dashboard-view/dashboard-view.service';
import { forkJoin } from 'rxjs';
import { EnterpriseService } from '../../../../../../services/private/enterprise/enterprise.service';

@Component({
  selector: 'app-traced-items',
  imports: [NgChartsModule],
  templateUrl: './traced-items.component.html',
  styleUrl: '../complete-dashboard.component.css'
})
export class TracedItemsComponent implements OnInit {
  constructor(private itemService: ItemService, private periodService: PeriodService, private dashboardService: DashboardViewService, private enterpriseService: EnterpriseService) { }
  loading!: Boolean
  enterpriseId!: any
  type!: 'cashFlow' | 'netWorth' | null
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
    this.getEnterpriseId()
    this.periodService.selectedPeriod$.subscribe(
      response => {
        this.selectedPeriod = response
        if(this.type){
          this.getItemsByCurrentPeriod(this.selectedPeriod)
        }
      }
    )
    this.dashboardService.selectedView$.subscribe(
      response => {
        this.type = response
        if(this.selectedPeriod){
          this.getItemsByCurrentPeriod(this.selectedPeriod)
        }
      }
    )
  }
  getItemsByCurrentPeriod(period: String) {
    this.loading = true
    const isCashFlow = this.type == 'cashFlow'
    this.errorMessage = ''
    forkJoin([
      this.itemService.getItemsByCurrentPeriod(this.enterpriseId, this.type && isCashFlow ? 'income' : 'active', period),
      this.itemService.getItemsByCurrentPeriod(this.enterpriseId, this.type && isCashFlow ? 'expense' : 'passive', period),
    ]).subscribe(
      (result: [Active[] | Passive[] | Income[] | Expense[], Active[] | Passive[] | Income[] | Expense[]]) => {
        const [positiveResponse, negativeResponse] = result;
        this.positiveItems = positiveResponse as Active[] | Income[];
        this.negativeItems = negativeResponse as Passive[] | Expense[];
        console.log(this.positiveItems, this.negativeItems)
        this.loading = false;
        this.errorMessage = this.positiveItems.length === 0 && this.negativeItems.length === 0 ? 'No se puede realizar un gráfico si no se han ingresado datos de ingresos y egresos del mes actual.' : '';
        if (!this.errorMessage) {
          this.buildLineChartData();
        }
      },
      (err) => {
        this.loading = false;
        this.errorMessage = err.error?.message || 'Error al obtener los datos';
      }
    );
  }

  buildLineChartData() {
    const groupPositive: { [key: string]: number } = {}
    const groupNegative: { [key: string]: number } = {}

    // Agrupamos positivos
    this.positiveItems.forEach((item: Income | Active) => {
      const date = new Date(item.date)
      const formatDate = this.selectedPeriod === 'year' || this.selectedPeriod == 'trimester'
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
      const formatDate = this.selectedPeriod === 'year' || this.selectedPeriod == 'trimester' ? new Date(date.getTime() + (3 * 60 * 60 * 1000)).toLocaleString('es-AR', { month: 'long' }).toLowerCase()
        : new Date(date.getTime() + (3 * 60 * 60 * 1000)).toLocaleDateString('es-AR', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric'
        })

      if (!groupNegative[formatDate]) groupNegative[formatDate] = 0
      groupNegative[formatDate] += item.amount
    })

    // Armamos los labels y los normalizamos para evitar duplicados por diferencias de mayúsculas/minúsculas o espacios
    const normalize = (label: string) => label.trim().toLowerCase();
    const allLabelsSet = new Set<string>();
    [...Object.keys(groupPositive), ...Object.keys(groupNegative)].forEach(label => {
      allLabelsSet.add(normalize(label));
    });

    let allLabels = Array.from(allLabelsSet);

    if (this.selectedPeriod == 'year' || this.selectedPeriod == 'trimester') {
      const months = [
        'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
        'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'
      ];
      allLabels = allLabels.sort((a, b) => months.indexOf(a) - months.indexOf(b));
      console.log(allLabels, "Labels ordenados por meses");
    } else {
      allLabels = allLabels.sort((a, b) => a.localeCompare(b));
    }

    const positiveValues = allLabels.map(label => groupPositive[label] || 0);

    const negativeValues = allLabels.map(label => groupNegative[label] || 0);

    this.errorMessage = allLabels.length < 2 ? 'Para visualizar el flujo de caja anual, necesitás reportes correspondientes de al menos dos periodos distintos del año seleccionado.' : '';
    this.errorMessage = '';
    this.lineChartData = {
      labels: allLabels,
      datasets: [
        {
          data: positiveValues,
          label: this.type === 'cashFlow' ? 'Ingresos' : 'Activos',
          borderColor: 'green',
          backgroundColor: 'rgba(20,255,10,0.3)',
        },
        {
          data: negativeValues,
          label: this.type === 'cashFlow' ? 'Egresos' : 'Pasivos',
          borderColor: 'red',
          backgroundColor: 'rgba(250,25,10,0.5)',
        }
      ]
    };
    console.log("Datos positivos", positiveValues, "Datos negativos", negativeValues);

  }
  getEnterpriseId() {
    this.enterpriseId = this.enterpriseService.getEnterpriseId()
  }
}
