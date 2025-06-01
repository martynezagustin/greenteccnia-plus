import { Component, Input, OnInit } from '@angular/core';
import { ItemService } from '../../../../../../services/private/finances/items/item/item.service';
import { forkJoin } from 'rxjs';
import { formatValue } from '../../../../../../services/utilities/format-dates/formatNumbers';
import { CommonModule } from '@angular/common';
import { Active } from '../../../../../../../interfaces/enterprise/finances/netWorth/active/active.interface';
import { Passive } from '../../../../../../../interfaces/enterprise/finances/netWorth/passive/passive.interface';
import { Income } from '../../../../../../../interfaces/enterprise/finances/cashFlow/income/income.interface';
import { Expense } from '../../../../../../../interfaces/enterprise/finances/cashFlow/expense/expense.interface';
import Swal from 'sweetalert2';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AddItemComponent } from '../../../enterprise/dashboard-generic/add-item/add-item.component';
import { MenuOffCanvasComponent } from '../../../enterprise/dashboard-generic/menu-off-canvas/menu-off-canvas.component';

@Component({
  selector: 'app-last-items',
  imports: [CommonModule, ReactiveFormsModule, RouterLink, MenuOffCanvasComponent],
  templateUrl: './last-items.component.html',
  styleUrl: '../complete-dashboard.component.css'
})
export class LastItemsComponent implements OnInit {
  @Input() type!: 'cashFlow' | 'netWorth' | null
  enterpriseId: any = localStorage.getItem('enterpriseId')
  loading!: Boolean
  editableItemId: string | null = null
  isEditable: boolean = false
  updateForm!: FormGroup
  errorMessage!: String | null
  public allItems: (Income | Expense | Active | Passive)[] = []
  formMap: { [key: string]: string } = {}

  ngOnInit(): void {
    this.getAllItemsPerOrder()
    this.getItemsByOrder()
    this.itemService.itemsSubject$.subscribe(
      response => {
        this.allItems = response ?? []
      }
    )
    console.log(this.allItems)
  }

  constructor(private itemService: ItemService, private formBuilder: FormBuilder) {
    this.updateForm = this.type == 'cashFlow' ? this.formBuilder.group({
      concept: new FormControl('', Validators.required),
      amount: new FormControl('', Validators.required),
      paymenMethod: new FormControl('', Validators.required),
      date: new FormControl('', Validators.required),
    }) : this.formBuilder.group({
      category: new FormControl('', Validators.required),
      typeAccount: new FormControl('', Validators.required),
      amount: new FormControl(0, Validators.required),
      details: new FormControl('', Validators.required),
    })
  }
  getAllItemsPerOrder() {
    this.loading = true
    const type1 = this.type === 'cashFlow' ? 'income' : 'active'
    const type2 = this.type === 'cashFlow' ? 'expense' : 'passive'
    forkJoin([
      this.itemService.getAllItems(this.enterpriseId, type1),
      this.itemService.getAllItems(this.enterpriseId, type2),
    ]).subscribe(
      ([items1 = [], items2 = []]: [Active[] | Income[], Passive[] | Expense[]]) => {
        this.allItems = [...items1, ...items2];
        console.log(items1, items2)
        this.getItemsByOrder()
        this.loading = false
        this.errorMessage = this.allItems.length > 0 ? '' : 'No hay items para mostrar';
      },
      err => {
        console.warn("No llegaron los datos", err);
        this.loading = false
      }
    )
  }
  getItemsByOrder() {
    this.allItems.sort((a, b) => {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();
      return dateB - dateA; // Ordena de más reciente a más antiguo
    });
    this.allItems = this.allItems.slice(0, 7) //limitar a 7 elementos
    console.log(this.allItems);

  }
  formatValue(num: Number) {
    return formatValue(num)
  }
  formatDate(date: Date) {
    const dateObj = new Date(date);
    return dateObj.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    });
  }
  //esto será para eliminar un item, pero no se implementa en el dashboard
  async deleteItem(item: Active | Passive | Income | Expense) {
    await Swal.fire({
      title: '<h2 style="font-family: Montserrat; letter-spacing: -1.3px">¿Estás seguro que deseas eliminar el item?</h2>',
      text: `Este item será eliminado permanentemente.`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    })
    this.itemService.deleteItem(this.enterpriseId, item.type, item._id).subscribe(
      response => {
        console.log(response)
        Swal.fire({
          title: '<h2 style="font-family: Montserrat; letter-spacing: -1.3px">Item eliminado exitosamente.</h2>',
          icon: 'success'
        })
        this.allItems = this.allItems.filter(i => i._id !== item._id);
      },
      error => {
        console.error('Error al eliminar el item:', error);
      }
    )
  }
  toggleEditable(item: Active | Passive | Income | Expense) {
    //aqui era el modo que activa el boolean editable
    this.itemService.setItemToUpdate(item)
  }

  //algunos valids
  getItemMainField(item: Active | Passive | Income | Expense): string {
    return 'concept' in item ? item.concept : 'typeAccount' in item ? item.typeAccount : ''
  }
  getCategory(item: Active | Passive | Income | Expense): string {
    return 'category' in item ? item.category : ''
  }
  getPaymentMethod(item: Active | Passive | Income | Expense): string {
    return 'paymentMethod' in item ? item.paymentMethod : ''
  }
}
