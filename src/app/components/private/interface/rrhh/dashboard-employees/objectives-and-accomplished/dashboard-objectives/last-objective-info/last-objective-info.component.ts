import { Component, OnInit } from '@angular/core';
import { ObjectiveService } from '../../../../../../../../services/private/rrhh/objective/objective.service';
import { NgClass } from '@angular/common';
import { RRHHTask } from '../../../../../../../../../interfaces/enterprise/rrhh/objective/task/task.interface';

@Component({
  selector: 'app-last-objective-info',
  imports: [NgClass],
  templateUrl: './last-objective-info.component.html',
  styleUrl: '../dashboard-objectives.component.css',
})
export class LastObjectiveInfoComponent implements OnInit {
  lastObjectiveInfo: any
  progressValue: number = 0
  tasks: any[] = []
  constructor(private objectiveService: ObjectiveService) { }
  ngOnInit(): void {
    this.objectiveService.dashboardObjectives$.subscribe(
      response => {
        this.lastObjectiveInfo = response?.lastObjectiveInfo
        this.tasks = response?.lastObjectiveInfo?.checklist || []
        console.log("La info del último objetivo es", this.lastObjectiveInfo)
      }
    )
  }
  toggleTaskCompletion(task: RRHHTask){
    task.completed = !task.completed
    console.log("Cambió el valor de la tarea", task)
    this.progressValue = this.calculateProgress
  }
  get calculateProgress(): number {
    if(this.tasks.length === 0) return 0
    const completedTasks = this.tasks.filter(task => task.completed).length
    return Math.round((completedTasks / this.tasks.length) * 100)
  }
}
