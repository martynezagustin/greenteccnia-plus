import { Component, OnInit } from '@angular/core';
import { ObjectiveService } from '../../../../../../../../services/private/rrhh/objective/objective.service';

@Component({
  selector: 'app-objectives',
  imports: [],
  templateUrl: './objectives.component.html',
  styleUrl: './objectives.component.css',
})
export class ObjectivesComponent implements OnInit {
  constructor(private objectiveService: ObjectiveService) { }
  ngOnInit(): void {
    this.objectiveService.dashboardObjectives$.subscribe(
      response => {
        console.log("Llegó la response a la tabla perro", response)
      }, err => {
        console.error(err);        
      }
    )
  }
}
