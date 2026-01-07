import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
import { DepartmentService } from '../../../../../../../../services/private/rrhh/department/department.service';

@Component({
  selector: 'app-add-department',
  imports: [FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './add-department.component.html',
  styleUrl: './add-department.component.css',
})
export class AddDepartmentComponent {
  enterpriseId: any = localStorage.getItem('enterpriseId')
  formAddDepartment!: FormGroup
  title: String = 'Añadir departamento de trabajo'
  //misc
  loading!: Boolean
  successfullyMessage!: String
  errorMessage!: String
  constructor(private fb: FormBuilder, private departmentService: DepartmentService){
    this.formAddDepartment = this.fb.group({
      name: new FormControl('', [Validators.required, Validators.minLength(3)]),
      description: new FormControl('', [Validators.required, Validators.minLength(10)])
    })
  }
  handleSubmit(){
    this.loading = true
    this.successfullyMessage = ''
    this.errorMessage = ''
    this.departmentService.addDepartment(this.enterpriseId, this.formAddDepartment.value).subscribe(
      response => {
        this.successfullyMessage = response.message
        this.loading = false
      },
      err => {
        this.errorMessage = err.error.message
        this.loading = false
      }
    )
  }
}
