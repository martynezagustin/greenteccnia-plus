import { Component, Input, input } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EnterpriseService } from '../../../../../../../../services/private/enterprise/enterprise.service';
import { ExpenseService } from '../../../../../../../../services/private/finances/cashFlow/expense/expense.service';
import Swal from 'sweetalert2';
import { HandlersRoutesService } from '../../../../../../../../services/private/dashboard/handlers/handlers-routes/handlers-routes.service';

@Component({
  selector: 'app-add-expense',
  imports: [ReactiveFormsModule],
  templateUrl: './add-expense.component.html',
  styleUrl: '../../../global-styles/global-finances.css'
})
export class AddExpenseComponent {
  enterpriseId!: any
  formAddExpense: FormGroup
  selectedCategory: String = ''
  loading: Boolean = false
  errorMessage: string = ''
  constructor(private fb: FormBuilder, private expenseService: ExpenseService, private enterpriseService: EnterpriseService, private handlersRoutes: HandlersRoutesService) {
    this.formAddExpense = this.fb.group({
      concept: ['', Validators.required],
      amount: ['', Validators.nullValidator],
      paymentMethod: ['', Validators.required],
      date: ['', Validators.required],
      details: ['', [Validators.required, Validators.minLength(10)]],
    })
  }
  paymentMethods: String[] = [
    "Efectivo", "Transferencia bancaria", "Tarjeta de crédito", "Tarjeta de débito", "Cheque", "Criptomonedas", "Otros"
  ]
  avaiableTypes: String[] = []
  ngOnInit(): void {
    this.getEnterpriseId()
  }
  handleSubmit() {
    this.errorMessage = ''
    this.loading = true
    this.expenseService.addExpense(this.enterpriseId, this.formAddExpense.value).subscribe(
      response => {
        console.log(response)
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
