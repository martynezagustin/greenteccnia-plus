import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ArtService } from '../../../../../../../../services/private/rrhh/art/art.service';

@Component({
  selector: 'app-add-art',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './add-art.component.html',
  styleUrl: './add-art.component.css'
})
export class AddArtComponent {
  enterpriseId: any = localStorage.getItem('enterpriseId')
  formAddART: FormGroup
  loading!: Boolean
  messageError!: String
  successfullyMessage!: String
  constructor(private fb: FormBuilder, private artService: ArtService) {
    this.formAddART = this.fb.group({
      name: new FormControl('', [Validators.required, Validators.minLength(3)]),
      CUIT: new FormControl('', [Validators.required, Validators.minLength(10)]),
      phone: new FormControl('', Validators.required),
      address: new FormControl('',Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      dateOfContract: new FormControl('', Validators.required),
      endOfContract: new FormControl('', Validators.required)
    })
  }
  handleSubmit(e: Event) {
    e.preventDefault()
    this.messageError = ''
    this.successfullyMessage = ''
    this.loading = true
    this.artService.createART(this.enterpriseId, this.formAddART.value).subscribe(
      () => {
        this.successfullyMessage = 'ART creada con éxito.'
        this.loading = false
      },
      error => {
        this.messageError = error.error.message
        this.loading = false
      }
    )
  }
}
