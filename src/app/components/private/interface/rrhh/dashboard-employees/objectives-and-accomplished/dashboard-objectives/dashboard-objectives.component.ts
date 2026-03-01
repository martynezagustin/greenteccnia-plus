import { Component, OnInit, ViewChild } from '@angular/core';
import { FormAddObjectiveComponent } from "../form-add-objective/form-add-objective.component";
import { ObjectiveService } from '../../../../../../../services/private/rrhh/objective/objective.service';
import { DashboardObjectivesData } from '../../../../../../../../interfaces/enterprise/rrhh/objective/dashboard.interface';
import {
  ApexNonAxisChartSeries,
  ApexResponsive,
  ApexChart,
  ChartComponent
} from "ng-apexcharts";
import { HistoricSnapshotsComponent } from "./historic-snapshots/historic-snapshots.component";
import { Subject, takeUntil } from 'rxjs';
import { OverallProgressComponent } from "./overall-progress/overall-progress.component";
import { CardLastObjectiveProgressComponent } from "./card-last-objective-progress/card-last-objective-progress.component";

export type ChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  responsive: ApexResponsive[];
  labels: any;
  dataLabels: any,
  colors: any;
  legend?: any;
  stroke?: any;
};

@Component({
  selector: 'app-dashboard-objectives',
  imports: [FormAddObjectiveComponent, ChartComponent, HistoricSnapshotsComponent, OverallProgressComponent, CardLastObjectiveProgressComponent],
  templateUrl: './dashboard-objectives.component.html',
  styleUrl: './dashboard-objectives.component.css',
})
export class DashboardObjectivesComponent implements OnInit {
  loading!: Boolean
  public destroy = new Subject<void>
  references: Record<string, string> = {
    'PLANNED': '✍️ Planificado',
    'ACTIVE': '🟢 Activo',
    'COMPLETED': '✅ Completado',
    'EXPIRED': '😣 Expirado'
  }

  @ViewChild("composition") chart!: ChartComponent
  public chartOptions!: Partial<ChartOptions>
  enterpriseId: any = localStorage.getItem('enterpriseId')
  dashboard!: DashboardObjectivesData | null
  constructor(private objectiveService: ObjectiveService) { }
  ngOnInit(): void {
    this.loading = true
    this.objectiveService.printDashboard(this.enterpriseId).subscribe(
      response =>{
        this.dashboard = response
          this.printComposition(this.dashboard?.composition)
          
        }
      )
    }
    printComposition(composition: any) {
      let labelsNormalized
      const labels = composition.map((item: any) => item.status)
      labelsNormalized = this.normalizeLabels(labels)
      console.log('Normalized labels', labelsNormalized)
      this.chartOptions = this.buildCompositionChart(composition)
      this.loading = false
    }
    
    normalizeLabels(response: any) {
    console.log('Llega el response', response)
    return response.map((s: any) => {
      return this.references[s] || s
    })
  }
  private buildCompositionChart(composition: any[]): Partial<ChartOptions> {
    return {
      series: composition.map(i => i.count),
      labels: this.normalizeLabels(composition.map(i => i.status)),
      chart: {
        width: 320,
        type: "donut"
      },
      responsive:
      [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200
            },
            legend: {
              position: "bottom"
              }
            }
          }
        ]
      ,
      dataLabels: {
        enabled:false
      },
      stroke: {
        width: 0,
      },
      colors: ['#0d581d', 'rgb(51, 112, 86)', 'rgb(30,30,30)'],
      legend: { position: 'bottom', horizontalAlign: 'center', labels: { colors: ['#0d581d', 'rgb(51, 112, 86)', 'rgb(30,30,30)'] } },
    }
  }
}
