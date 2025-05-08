import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { EnterpriseService } from '../../../../../../../../services/private/enterprise/enterprise.service';
import { Router } from '@angular/router';
import { IncomeService } from '../../../../../../../../services/private/finances/cashFlow/income/income.service';
import Swal from 'sweetalert2';
import { HandlersRoutesService } from '../../../../../../../../services/private/dashboard/handlers/handlers-routes/handlers-routes.service';
import { ItemService } from '../../../../../../../../services/private/finances/items/item/item.service';

@Component({
  selector: 'app-add-income',
  imports: [ReactiveFormsModule],
  templateUrl: './add-income.component.html',
  styleUrl: '../../../global-styles/global-finances.css'
})
export class AddIncomeComponent {
  enterpriseId!: any
  formAddIncome: FormGroup
  selectedCategory: String = ''
  loading: Boolean = false
  errorMessage: string = ''
  constructor(private fb: FormBuilder, private itemService: ItemService, private enterpriseService: EnterpriseService, private handlersRoutes: HandlersRoutesService) {
    this.formAddIncome = this.fb.group({
      concept: ['', Validators.required],
      amount: ['', Validators.nullValidator],
      category: ['', Validators.required],
      paymentMethod: ['', Validators.required],
      date: ['', Validators.required],
      details: ['', [Validators.required, Validators.minLength(10)]],
    })
  }
  paymentMethods: String[] = [
    "Efectivo", "Transferencia bancaria", "Tarjeta de crédito", "Tarjeta de débito", "Cheque", "Criptomonedas", "Otros"
  ]
  categories: String[] = ["Ingreso fijo", "Ingreso variable", "Ingreso extraordinario"]
  ngOnInit(): void {
    this.getEnterpriseId()
  }
  handleSubmit() {
    this.errorMessage = ''
    this.loading = true
    this.itemService.addItem(this.enterpriseId, 'income', this.formAddIncome.value).subscribe(
      () => {
        this.formAddIncome.reset()
        this.loading = false
        this.handlersRoutes.reload()
      },
      err => {
        this.errorMessage = err.error.message;
        this.loading = false
      }
    )
  }
  getEnterpriseId() {
    this.enterpriseId = this.enterpriseService.getEnterpriseId()
  }
}
