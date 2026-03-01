import { Component, Input, OnInit } from '@angular/core';
import { CreateClasificationComponent } from "./create-clasification/create-clasification.component";
import { NgClass, NgStyle } from '@angular/common';
import { EmployeesService } from '../../../../../../../services/private/rrhh/employees/employees.service';
import { Employee } from '../../../../../../../../interfaces/enterprise/rrhh/employees/employee.interface';
import { FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ObjectiveService } from '../../../../../../../services/private/rrhh/objective/objective.service';
import Swal from 'sweetalert2';
import { ClasificationService } from '../../../../../../../services/private/rrhh/objective/clasification/clasification.service';
import { Clasification } from '../../../../../../../../interfaces/enterprise/rrhh/objective/clasification/clasification.interface';

@Component({
  selector: 'app-form-add-objective',
  imports: [ReactiveFormsModule, CreateClasificationComponent, NgStyle],
  templateUrl: './form-add-objective.component.html',
  styleUrl: './form-add-objective.component.css',
})
export class FormAddObjectiveComponent implements OnInit {
  enterpriseId: any = localStorage.getItem('enterpriseId')
  group!: any
  employees!: Employee[]
  clasifications!: Clasification[] | null
  loadingScope!: Boolean
  errorMessageClasification!: String
  formAddObjective!: FormGroup
  priorityValues = [
    { value: 'LOW', view: 'BAJA', bgColor: 'yellow', color: 'black' },
    { value: 'MEDIUM', view: 'MEDIA', bgColor: 'rgb(255, 182, 46)', color: 'black' },
    { value: 'HIGH', view: 'ALTA', bgColor: '#ff693f', color: 'white' },
    { value: 'CRITICAL', view: 'CRÍTICA', bgColor: 'red', color: 'white' }
  ]
  constructor(private fb: FormBuilder, private rrhhObjectiveService: ObjectiveService, private clasificationService: ClasificationService) {
    this.formAddObjective = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      startDate: [null, Validators.required],
      endDate: [null, Validators.required],
      clasification: ['', Validators.required],
      priority: ['', Validators.required],
      checklist: this.fb.array([])
    })
  }
  ngOnInit(): void {
    this.clasificationService.getAllClasifications(this.enterpriseId).subscribe(
      response => {
        this.clasifications = response
      },
      err => {
        this.errorMessageClasification = err.error.message || 'Ha ocurrido un error con las clasificaciones.'
      }
    )
    this.clasificationService.clasifications$.subscribe(
      response => {
        this.clasifications = response
      },
      err => {
        this.errorMessageClasification = err.error.message || 'Ha ocurrido un error con las clasificaciones.'
      }
    )
  }
  //testeando el primer handlesubmit
  handleSubmit() {
    let timerInterval: any;
    Swal.fire({
      title: "<h1 style='font-family:Montserrat;letter-spacing:-1.2px;font-size:1.5rem;font-weight:700'>🎯 Creando objetivo</h1>",
      html: "<h2 style='font-family:Montserrat; letter-spacing:-1px; font-size:1rem'>Guardando la información, aguardá un instante...</h2>",
      allowOutsideClick: false,
      background: 'springgreen',
      allowEscapeKey: false,
      didOpen: () => {
        Swal.showLoading();
      },
      willClose: () => {
        clearInterval(timerInterval);
      }
    }).then((result) => {
      if (result.dismiss === Swal.DismissReason.timer) {
        console.log("I was closed by the timer");
      }
    });

    this.rrhhObjectiveService.createObjective(this.formAddObjective.value, this.enterpriseId)
      .subscribe({
        next: (response: any) => {
          Swal.fire({
            icon: 'success',
            title: '✅ Objetivo creado',
            text: `${response.message}`,
            timer: 2500,
            showConfirmButton: false
          })
          this.formAddObjective.reset()
        },
        error: (err) => {
          Swal.fire({
            icon: 'error',
            title: '<h1 style="font-family: Montserrat; letter-spacing: -1px; font-size: 1.3rem">❌ Ha ocurrido un error al crear el objetivo</h1>',
            html: `<h2 style='font-family: Montserrat; letter-spacing:-1.2px; font-size:1.2rem; font-weight:600'>${err.error.message}<h2>`,
            background: 'rgb(255, 222, 222)',
            timer: 3500,
            showConfirmButton: false
          })
        }
      })
  }
  get checklist() {
    return this.formAddObjective.get('checklist') as FormArray
  }
  //obtenemos el progreso
  get progress(): number {
    const total = this.checklist.length
    console.log('total?', total)
    const completed = this.checklist.controls.filter(t => t.value.completed).length
    return total ? Math.round((completed / total) * 100) : 0
  }
  addTask() {
    const taskGroup = this.fb.group({
      title: ['', Validators.required],
      startDate:['', Validators.required],
      endDate: ['', Validators.required],
      completed: [false]
    })
    const completedCheck = taskGroup.get('completed')
    if (taskGroup.get('title')?.invalid) {
      completedCheck?.disable()
      completedCheck?.setValue(false)
    }

    //obtener los cambios del título
    taskGroup.get('title')?.valueChanges.subscribe(
      response => {
        if (response && response.trim().length > 0) {
          completedCheck?.enable()
        } else {
          completedCheck?.disable()
          completedCheck?.setValue(false)
        }
      }
    )
    this.checklist.push(taskGroup)
  }
  deleteTask(index: number) {
    this.checklist.removeAt(index)
  }
}
