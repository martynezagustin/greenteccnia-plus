import { Component, OnInit } from '@angular/core';
import { ItemService } from '../../../../../../services/private/finances/items/item/item.service';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Active } from '../../../../../../../interfaces/enterprise/finances/netWorth/active/active.interface';
import { Income } from '../../../../../../../interfaces/enterprise/finances/cashFlow/income/income.interface';
import { Passive } from '../../../../../../../interfaces/enterprise/finances/netWorth/passive/passive.interface';
import { Expense } from '../../../../../../../interfaces/enterprise/finances/cashFlow/expense/expense.interface';

@Component({
  selector: 'app-add-item',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-item.component.html',
  styleUrl: './add-item.component.css'
})
export class AddItemComponent implements OnInit {
  formAddItem: FormGroup | undefined
  enterpriseId: any = localStorage.getItem('enterpriseId')
  view!: 'active' | 'passive' | 'income' | 'expense'
  //variable que define si el item carga para editar
  itemToUpdate: Active | Passive | Income | Expense | null = null
  isUpdate: boolean = false
  typeFinance!: 'netWorth' | 'cashFlow'
  loading!: Boolean
  successMessage!: String
  errorMessage!: String
  declarePaymentMethods: string[] = ["Efectivo",
    "Transferencia bancaria",
    "Cheque",
    "Tarjeta de crédito",
    "Tarjeta de débito",
    "Criptomonedas",
    "Otros"]
  public declareCategories = {
    income: ["Ingreso fijo", "Ingreso variable", "Ingreso extraordinario"],
    expense: ["Egreso fijo", "Egreso variable", "Egreso discrecional", "Egreso de capital", "Egreso operativo"],
    active: ['Activo corriente', 'Activo no corriente', 'Activo intangible'],
    passive: ["Pasivo corriente", "Pasivo no corriente", "Pasivo contingente"]
  }

  public groupedNetWorthCategories: string[] = []
  public availableExamples = {
    active: {
      'Activo corriente': [
        "Caja", "Bancos", "Inversiones a corto plazo", "Suministros", "Inventario", "Cuentas por cobrar", "Inventarios", "Otros activos corrientes"
      ],
      'Activo no corriente': [
        "Bienes inmuebles", "Maquinaria", "Vehículos", "Muebles y enseres", "Equipos de procesos informáticos", "Otros activos no corrientes"
      ],
      'Activo intangible': [
        "Patentes", "Marcas registradas", "Derechos de autor", "Software", "Otros activos intangibles"
      ]
    },
    passive: {
      'Pasivo corriente': [
        'Cuentas por pagar',
        'Préstamos bancarios a corto plazo',
        'Gastos acumulados',
        'Provisiones',
        'Otros pasivos corrientes'
      ],
      'Pasivo no corriente': [
        'Préstamos a largo plazo',
        'Bonos por pagar',
        'Obligaciones financieras',
        'Otros pasivos no corrientes'
      ],
      'Pasivo contingente': [
        'Demandas legales',
        'Garantías otorgadas',
        'Otros pasivos contingentes'
      ]
    }
  }
  private formStrategies = {
    income: () => this.formCashFlow(), // invoca uno u otro formulario
    expense: () => this.formCashFlow(),
    active: () => this.formNetWorth(),
    passive: () => this.formNetWorth()
  }
  //etiquetas para decorar en el html, nada relevante, el tipo de view define la etiqueta
  labels = {
    income: 'ingreso',
    expense: 'egreso',
    active: 'activo',
    passive: 'pasivo'
  }
  constructor(private itemService: ItemService, private fb: FormBuilder) {
  }
  ngOnInit(): void {
    this.itemService.viewTypeItemSubject$.subscribe(
      response => {
        this.view = response
        this.renderFormType()
        this.successMessage = ''
        this.errorMessage = ''
      }
    )
    this.itemService.itemToUpdate$.subscribe(
      response => {
        this.itemToUpdate = response
        this.isUpdate = this.itemToUpdate != null
        this.loadingItemToUpdate()
      }
    )
  }
  renderFormType() {
    this.formAddItem = this.formStrategies[this.view]()
  }
  private formCashFlow(): FormGroup {
    this.typeFinance = 'cashFlow'
    return this.fb.group({
      concept: new FormControl('', Validators.required),
      category: new FormControl('', Validators.required),
      date: new FormControl('', Validators.required),
      amount: new FormControl(0, Validators.required),
      paymentMethod: new FormControl('', Validators.required)
    })
  }

  private formNetWorth(): FormGroup {
    this.typeFinance = 'netWorth'
    const form = this.fb.group({
      category: new FormControl('', Validators.required),
      typeAccount: new FormControl('', Validators.required),
      date: new FormControl('', Validators.required),
      amount: new FormControl(0, Validators.required),
      details: new FormControl('', Validators.required)
    })

    form.get('category')?.valueChanges.subscribe(
      (response: string | null) => {
        console.log("Respuesta", response)
        const type = this.view === "active" ? 'active' : 'passive'
        const foundGroup = this.availableExamples[type]
        const groupedType = foundGroup as Record<string, string[]>
        if (response && response in groupedType) {
          this.groupedNetWorthCategories = groupedType[response]
          console.log(this.groupedNetWorthCategories)
        }
      }
    )
    return form
  }
  handleSubmit() {
    this.errorMessage = ''
    this.successMessage = ''
    this.loading = true
    this.itemToUpdate == null
      ? this.itemService.addItem(this.enterpriseId, this.view, this.formAddItem ? this.formAddItem.value : null).subscribe(
        response => {
          this.successMessage = response.message
          this.loading = false
          this.formAddItem?.reset()
          setTimeout(() => {
            this.successMessage = ''
          }, 4000);
        },
        err => {
          this.errorMessage = err.error.message
          this.loading = false
        }
      )
      : this.itemService.updateItem(this.enterpriseId, this.view, this.formAddItem ? this.formAddItem.value : null, this.itemToUpdate._id).subscribe(
        response => {
          this.successMessage = response.message
          this.loading = false
          setTimeout(() => {
            this.successMessage = ''
          }, 4000);
        }, err => {
          this.errorMessage = err.error.message
          this.loading = false
        }
      )
  }
  loadingItemToUpdate() {
    if (this.itemToUpdate != null) {
      const formattedDate = new Date(this.itemToUpdate.date).toISOString().split('T')[0]
      this.formAddItem?.patchValue({ ...this.itemToUpdate, date: formattedDate })
      console.log(this.formAddItem?.value)
    }
  }
}
