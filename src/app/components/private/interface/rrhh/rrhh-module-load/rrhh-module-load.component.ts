import { Component, OnInit } from '@angular/core';
import { RouterModule } from "@angular/router";
import { RrhhService } from '../../../../../services/private/rrhh/rrhh/rrhh.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-rrhh-module-load',
  imports: [RouterModule],
  templateUrl: './rrhh-module-load.component.html',
  styleUrl: './rrhh-module-load.component.css'
})
export class RrhhModuleLoadComponent implements OnInit {
  public destroy$ = new Subject<void>
  constructor(private rrhhService: RrhhService) { }
  title!: String
  view!: String
  linksGenerated: any = [
    {
      employees: {
        title: 'Empleados',
        view: 'employees'
      }
    },
    {
      assists: {
        title: 'Asistencias',
        view: "assists"
      }
    },
    {
      liquidations: {
        title: "Liquidaciones",
        view: "liquidations"
      }
    },
    {
      accidents: {
        title: 'Accidentes',
        view: "accidents"
      }
    }
  ]
  ngOnInit(): void {
    const titles: Record<string,string> = {
      employees: 'Empleados',
      assists: 'Asistencias',
      liquidations: 'Liquidaciones',
      accidents: 'Accidentes'
    }
    this.rrhhService.viewRRHHElement$.pipe(takeUntil(this.destroy$)).subscribe(
      response => {
        this.title = titles[response] ?? ''
        this.view = response 
      },
      err => {
        console.error(err);
      }
    )
  }
  setViewRRHHElement(view: "employees" | "assists" | "liquidations" | "accidents") {
    this.rrhhService.setSummaryView(view)
  }
}
