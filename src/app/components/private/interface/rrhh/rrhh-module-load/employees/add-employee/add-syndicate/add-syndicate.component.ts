import { Component } from '@angular/core';
import { SyndicatesService } from '../../../../../../../../services/private/rrhh/syndicates/syndicates.service';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-syndicate',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './add-syndicate.component.html',
  styleUrl: './add-syndicate.component.css'
})
export class AddSyndicateComponent {
  enterpriseId: any = localStorage.getItem('enterpriseId')
  formAddSyndicate!: FormGroup
  successfullyMessage!: String
  //loading
  messageError!: String 
  loading!: Boolean
  constructor(private fb: FormBuilder, private syndicateService: SyndicatesService) {
    this.formAddSyndicate = this.fb.group({
      name: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.email, Validators.required]),
      type: new FormControl('', Validators.required),
      jurisdiction: new FormControl('', Validators.required)
    })
  }
  handleSubmit(e: Event){
    this.successfullyMessage = ''
    this.messageError = ''
    this.loading = true
    e.preventDefault()
    this.syndicateService.createSyndicate(this.enterpriseId, this.formAddSyndicate.value).subscribe(
      () => {
        this.successfullyMessage = 'Has añadido un sindicato con éxito.' 
        this.formAddSyndicate.reset()
        this.loading = false
      },
      error => {
        this.messageError = error.error.message
        this.loading = false
      }
    )
  }
} 
