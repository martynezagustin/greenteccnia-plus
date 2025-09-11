import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, MinLengthValidator, ReactiveFormsModule, Validators } from '@angular/forms';
import { CctService } from '../../../../../../../../services/private/rrhh/cct/cct.service';
import { CommonModule } from '@angular/common';
import { EnterpriseService } from '../../../../../../../../services/private/enterprise/enterprise.service';

@Component({
  selector: 'app-add-cct',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './add-cct.component.html',
  styleUrl: './add-cct.component.css'
})
export class AddCctComponent {
  enterpriseId!: any
  formAddCCT: FormGroup
  messageError!: String
  successfullyMessage!: String
  loading: Boolean = false
  constructor(private fb: FormBuilder, private cctService: CctService, private enterpriseService: EnterpriseService) {
    this.formAddCCT = this.fb.group({
      name: new FormControl('', [Validators.required, Validators.minLength(3)]),
      cctNumber: new FormControl('', Validators.required),
      dateOfCelebration: new FormControl('', Validators.required)
    })
  }
  handleSubmit(e: Event) {
    this.getEnterpriseId()
    this.loading = true
    this.messageError = ''
    e.preventDefault()
    this.cctService.addCCT(this.enterpriseId, this.formAddCCT.value).subscribe(
      () => {
        this.successfullyMessage = 'Convenio colectivo creado con éxito.'
        this.loading = false
      },
      error => {
        this.messageError = error.error.message
        this.loading = false
      }
    )
  }
  getEnterpriseId() {
    this.enterpriseId = this.enterpriseService.getEnterpriseId()
  }
}
