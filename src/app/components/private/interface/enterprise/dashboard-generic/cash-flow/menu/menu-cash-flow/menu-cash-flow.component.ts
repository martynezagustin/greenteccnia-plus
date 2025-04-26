import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { AddExpenseComponent } from '../add-expense/add-expense.component';
import { AddIncomeComponent } from '../add-income/add-income.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-menu-cash-flow',
  imports: [AddIncomeComponent, AddExpenseComponent, CommonModule],
  templateUrl: './menu-cash-flow.component.html',
  styleUrl: './menu-cash-flow.component.css'
})
export class MenuCashFlowComponent implements OnChanges {
  @Input() selectedFormInput!: String
  selectedForm: String = 'income'
  showForm(type: 'income' | 'expense') {
    this.selectedForm = type
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['selectedFormInput']) {
      this.selectedForm = changes['selectedFormInput'].currentValue
      console.log("Valor seleccionado", this.selectedForm);
    }
  }
}
