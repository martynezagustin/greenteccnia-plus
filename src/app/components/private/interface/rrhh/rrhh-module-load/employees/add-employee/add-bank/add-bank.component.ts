import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { BankService } from '../../../../../../../../services/private/rrhh/bank/bank.service';

@Component({
  selector: 'app-add-bank',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './add-bank.component.html',
  styleUrl: './add-bank.component.css'
})
export class AddBankComponent {
  formAddBank!: FormGroup;
  enterpriseId: any = localStorage.getItem('enterpriseId')
  //misc
  loading: Boolean = false
  messageError!: String
  successfullyMessage!: String
  constructor(private fb: FormBuilder, private bankService: BankService) {
    this.formAddBank = this.fb.group({
      name: new FormControl('', Validators.required),
      shortName: new FormControl('', Validators.required),
      CUIT: new FormControl('', Validators.required),
      bicSwift: new FormControl('', Validators.required),
      supportPhone: new FormControl('', [Validators.required, Validators.minLength(6)]),
      supportEmail: new FormControl('', [Validators.required, Validators.email]),
      city: new FormControl('', Validators.required),
      provinceOrEstate: new FormControl('', Validators.required)
    })
  }
  handleSubmit(e: Event) {
    e.preventDefault()
    this.messageError = ''
    this.successfullyMessage = ''
    this.loading = true
    this.bankService.createBank(this.enterpriseId, this.formAddBank.value).subscribe(
      () => {
        this.successfullyMessage = 'Banco creado con éxito.'
        this.loading = false
      },
      err => {
        this.messageError = err.error.message
      }
    )
  }
}
