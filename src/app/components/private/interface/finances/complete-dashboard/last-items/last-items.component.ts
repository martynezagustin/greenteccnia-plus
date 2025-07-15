import { Component, Input, OnInit } from '@angular/core';
import { ItemService } from '../../../../../../services/private/finances/items/item/item.service';
import { CommonModule } from '@angular/common';
import { Active } from '../../../../../../../interfaces/enterprise/finances/netWorth/active/active.interface';
import { Passive } from '../../../../../../../interfaces/enterprise/finances/netWorth/passive/passive.interface';
import { Income } from '../../../../../../../interfaces/enterprise/finances/cashFlow/income/income.interface';
import { Expense } from '../../../../../../../interfaces/enterprise/finances/cashFlow/expense/expense.interface';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TableLastItemsComponent } from './table-last-items/table-last-items.component';

@Component({
  selector: 'app-last-items',
  imports: [CommonModule, ReactiveFormsModule, TableLastItemsComponent],
  templateUrl: './last-items.component.html',
  styleUrl: '../complete-dashboard.component.css'
})
export class LastItemsComponent {
  @Input() type!: 'cashFlow' | 'netWorth' | null
  constructor() { }
}
