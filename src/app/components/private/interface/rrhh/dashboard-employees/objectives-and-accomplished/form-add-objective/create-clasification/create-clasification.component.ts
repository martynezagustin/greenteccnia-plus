import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ClassificationService } from '../../../../../../../../services/private/rrhh/objective/classification/classification.service';

@Component({
  selector: 'app-create-clasification',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './create-clasification.component.html',
  styleUrl: './create-clasification.component.css',
})
export class CreateClasificationComponent {
  enterpriseId: any = localStorage.getItem('enterpriseId')
  formAddClasification!: FormGroup
  loading!: Boolean
  successMessage!: String
  errorMessage!: String
  constructor(private fb: FormBuilder, private classificationService: ClassificationService){
    this.formAddClasification = this.fb.group({
      name: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required)
    })
  }
  handleSubmit(){
    this.errorMessage = ''
    this.loading = true
    this.classificationService.createClassification(this.enterpriseId, this.formAddClasification.value).subscribe(
      response => {
        this.successMessage = 'Añadido con éxito.'
        setTimeout(() => {
          this.successMessage = ''
        }, 2000);
        this.loading = false
        this.formAddClasification.reset()
      },
      err => {
        this.errorMessage = err.error.message || 'Ha ocurrido un error inesperado.'
        setTimeout(() => {
          this.errorMessage = ''
        }, 2000);
        this.loading = false
      }
    )
  }
}
