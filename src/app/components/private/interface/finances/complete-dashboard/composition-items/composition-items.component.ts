import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ChartData, ChartOptions, ChartType } from 'chart.js';
import { NgChartsModule } from 'ng2-charts';
import { ItemService } from '../../../../../../services/private/finances/items/item/item.service';
import { PeriodService } from '../../../../../../services/private/finances/dashboard/dashboard-view/filters/period/period.service';

@Component({
  selector: 'app-composition-items',
  imports: [NgChartsModule],
  templateUrl: './composition-items.component.html',
  styleUrl: '../complete-dashboard.component.css'
})
export class CompositionItemsComponent implements OnChanges, OnInit{
  constructor(private itemService: ItemService, private periodService: PeriodService) { }
  positiveValueItems: number = 0
  negativeValueItems: number = 0
  errorMessage: String = ''
  //para graficos
  @Input() enterpriseId!: String
  loading!: Boolean
  @Input() typeView!: 'active' | 'passive' | 'income' | 'expense'
  @Input() type!: 'cashFlow' | 'netWorth' | null
  @Input() selectedPeriod!: 'month' | 'date' | 'year' | 'trimester'
  public pieChartLabels: string[] = []
  public pieChartData!: ChartData<'pie'>
  public pieChartType: ChartType = 'pie'
  public pieChartOptions: ChartOptions = {
    responsive: true
  }
  ngOnInit(): void {
    this.periodService.selectedPeriod$.subscribe(
      response => {
        this.selectedPeriod = response
        this.getData()
      }
    )
  }
  ngOnChanges(changes: SimpleChanges): void {
    if(changes['enterpriseId']){
      this.enterpriseId = changes['enterpriseId'].currentValue
    }
    if(changes['selectedPeriod']){
      this.selectedPeriod = changes['selectedPeriod'].currentValue
      console.log(this.selectedPeriod)
      this.getData()
    }
  }
  getData() {
    this.errorMessage = ''
    this.loading = true
    if (this.type == 'cashFlow') {
      this.itemService.getValueItemsByCurrentPeriod(this.enterpriseId, 'income', this.selectedPeriod).subscribe(
        response => {
          this.positiveValueItems = response.getItemsByCurrentPeriod;
          console.log(this.positiveValueItems)
          this.updatePieChartData()
          this.loading = false
        },
        err => {
          console.log(err)
        }
      );
      this.itemService.getValueItemsByCurrentPeriod(this.enterpriseId, 'expense', this.selectedPeriod).subscribe(
        response => {
          this.negativeValueItems = response.getItemsByCurrentPeriod;
          console.log(this.negativeValueItems)
          this.updatePieChartData()
          this.loading = false
        },
        err => {
          console.log(err)
        }
      );
    } else {
      this.itemService.getValueItemsByCurrentPeriod(this.enterpriseId, 'active', this.selectedPeriod).subscribe(
        response => {
          this.positiveValueItems = response.getItemsByCurrentPeriod;
          console.log(this.positiveValueItems)
          this.loading = false
        },
        err => {
          console.log(err)
        }
      );
      this.itemService.getValueItemsByCurrentPeriod(this.enterpriseId, 'passive', this.selectedPeriod).subscribe(
        response => {
          this.negativeValueItems = response.getItemsByCurrentPeriod;
          console.log(this.negativeValueItems)
          this.updatePieChartData()
          this.loading = false
        },
        err => {
          console.log(err)
        }
      );
    }
    console.log(this.errorMessage)
  }
  updatePieChartData(){
    this.pieChartLabels = this.type == 'cashFlow' ? ['Ingresos', 'Egresos'] : ['Activos', 'Pasivos']
    this.pieChartData = {
      labels: this.pieChartLabels,
      datasets: [
        {
          data: [this.positiveValueItems, this.negativeValueItems],
          label: 'Mensual',
          backgroundColor: ['green', 'red']
        }
      ]
    }
  }
}
