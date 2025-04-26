import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { NgChartsModule } from 'ng2-charts';
import { ChartConfiguration, ChartOptions, ChartType } from 'chart.js';
import { ActiveService } from '../../../../../../../services/private/finances/netWorth/active/active.service';
import { PassiveService } from '../../../../../../../services/private/finances/netWorth/passive/passive.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-composition',
  imports: [NgChartsModule, CommonModule],
  templateUrl: './composition.component.html',
  styleUrl: '../../dashboard-finance.component.css'
})
export class CompositionComponent implements OnInit, OnChanges {
  //para graficos
  @Input() enterpriseId!: String
  @Input() loading!: Boolean
  @Input() typeView!: 'active' | 'passive'
  selectedPeriod: 'annual' | 'monthly' | 'diary' | 'total' = 'total'
  errorMessage: String = ''
  optionsPeriod: any[] = [
    { period: 'monthly', label: 'Mensual' },
    { period: 'annual', label: 'Anual' },
    { period: 'diary', label: 'Diario' },
    { period: 'total', label: "Histórico" }
  ]
  public pieChartLabels: string[] = []
  public pieChartData: number[] = []
  public pieChartType: ChartType = 'doughnut'
  public colors: string[] = ['rgb(0, 255, 21)', 'rgb(0, 120, 6)', 'rgb(72, 114, 71)', 'rgba(0, 0, 0, 0.6)', 'rgb(255,0,0)', 'rgb(200,20,20)', 'rgb(255, 116, 116)']
  public pieChartColors = [
    {
      backgroundColor: [] as string[]
    }
  ]
  ngOnInit(): void {
    this.fetchData(this.selectedPeriod)
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['loading']) { this.loading = changes['loading'].currentValue }
    if (changes['typeView']) {
      this.typeView = changes['typeView'].currentValue
      this.fetchData(this.selectedPeriod)
    }
  }
  constructor(private activeService: ActiveService, private passiveService: PassiveService) { }
  selectPeriod(period: 'annual' | 'monthly' | 'diary' | 'total') {
    this.selectedPeriod = period
    console.log(this.selectedPeriod)
    this.fetchData(this.selectedPeriod)
  }
  fetchData(periodType: 'total' | 'diary' | 'monthly' | 'annual') {
    this.loading = true
    this.errorMessage = ''
    const mapMethod = {
      diary: {
        active: this.activeService.getActivesByCompositionCategoryPerPeriod,
        passive: this.passiveService.getLiabilitiesByCompositionCategoryPerDay,
        label: 'day'
      },
      monthly: {
        active: this.activeService.getActivesByCompositionCategoryPerPeriod,
        passive: this.passiveService.getLiabilitiesByCompositionCategoryPerMonth,
        label: 'month'
      },
      annual: {
        active: this.activeService.getActivesByCompositionCategoryPerPeriod,
        passive: this.passiveService.getLiabilitiesByCompositionCategoryPerYear,
        label: 'year'
      },
      total: {
        active: this.activeService.getActivesByCompositionCategory,
        passive: this.passiveService.getLiabilitiesByCompositionCategory
      }
    }
    const isActive = this.typeView === 'active'
    const mapping = mapMethod[periodType] 
    const serviceMethod = isActive ? mapMethod[periodType].active : mapMethod[periodType].passive
    const label: 'day' | 'month' | 'year' | undefined = mapping && 'label' in mapping && this.selectedPeriod !== 'total' ? mapping.label as 'day' | 'month' | 'year' : undefined;
    console.log("El mapeo" ,label)
    serviceMethod.call(isActive ? this.activeService : this.passiveService, this.enterpriseId, label as 'day' | 'month' | 'year').subscribe(
      response => {
        this.processChartData(response, isActive)
        this.loading = false
      },
      err => {
        console.error(err);
        this.errorMessage = err.error.message
        this.loading = false
      }
    )
  }
  processChartData(response: any, isActive: boolean) {
    this.pieChartColors[0].backgroundColor = response.map((item: { category: string }) => {
      if (isActive) {
        switch (item.category) {
          case 'Activo no corriente':
            return this.colors[0];
          case 'Activo corriente':
            return this.colors[1];
          case 'Activo intangible':
            return this.colors[2];
          case 'Otros activos no corrientes':
            return this.colors[3];
          default:
            return 'rgba(0, 0, 0, 0.6)';
        }
      } else {
        switch (item.category) {
          case 'Pasivo no corriente':
            return this.colors[4];
          case 'Pasivo corriente':
            return this.colors[5];
          case 'Pasivo contingente':
            return this.colors[6];
          default:
            return 'rgba(0, 0, 0, 0.6)';
        }
      }
    });
    this.pieChartLabels = response.map((item: { category: string }) => item.category)
    this.pieChartData = response.map((item: { percentage: number }) => item.percentage)
  }
}
