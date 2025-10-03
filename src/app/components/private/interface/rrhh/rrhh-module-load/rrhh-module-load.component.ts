import { Component, OnInit } from '@angular/core';
import { RouterModule } from "@angular/router";
import { RrhhService } from '../../../../../services/private/rrhh/rrhh/rrhh.service';

@Component({
  selector: 'app-rrhh-module-load',
  imports: [RouterModule],
  templateUrl: './rrhh-module-load.component.html',
  styleUrl: './rrhh-module-load.component.css'
})
export class RrhhModuleLoadComponent implements OnInit {
  constructor(private rrhhService: RrhhService) { }
  title!: String
  view!: String
  linksGenerated: any = [
    {
      employees: {
        title: 'Empleados',
        view: 'Employees'
      }
    },
    {
      assists: {
        title: 'Asistencias',
        view: "Assists"
      }
    },
    {
      liquidations: {
        title: "Liquidaciones",
        view: "Liquidations"
      }
    },
    {
      accidents: {
        title: 'Accidentes',
        view: "Accidents"
      }
    }
  ]
  ngOnInit(): void {
    this.rrhhService.viewRRHHElement$.subscribe(
      response => {
        switch (response) {
          case 'employees':
            this.title = 'Empleados'
            break;
          case 'accidents':
            this.title = 'Accidentes'
            break;
          case 'assists':
            this.title = 'Asistencias'
            break;
          case 'liquidations':
            this.title = 'Liquidaciones'
            break;
          default:
            break;
        }
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
