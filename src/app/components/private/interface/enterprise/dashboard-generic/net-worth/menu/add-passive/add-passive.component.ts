import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { PassiveService } from '../../../../../../../../services/private/finances/netWorth/passive/passive.service';
import { EnterpriseService } from '../../../../../../../../services/private/enterprise/enterprise.service';
import { Router } from '@angular/router';
import { HandlersRoutesService } from '../../../../../../../../services/private/dashboard/handlers/handlers-routes/handlers-routes.service';

@Component({
  selector: 'app-add-passive',
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './add-passive.component.html',
  styleUrl: '../../../global-styles/global-finances.css'
})
export class AddPassiveComponent {
  @Input() selectedForm!: String
  enterpriseId!: any
  formAddPassive: FormGroup
  selectedCategory: String = ''
  loading: Boolean = false
  errorMessage: string = ''
  categoriesPassive = [
    {
      name: "Pasivo corriente",
      types: ["Cuentas por pagar", "Préstamos a corto plazo", "Salarios y prestaciones pendientes", "Impuestos pendientes", "Devengos", "Gastos acumulados", "Dividendos por pagar", "Anticipos de clientes"]
    },
    {
      name: "Pasivo no corriente",
      types: ["Bonos", "Arrendamientos financieros", "Préstamos bancarios a largo plazo", "Hipotecas", "Deudas con empresas del grupo y asociadas a largo plazo", "Planes de financiación"]
    },
    {
      name: "Pasivo contingente",
      types: ["Litigio", "Auditorías pendientes", "Pasivos fiscales en disputa", "Garantías de productos", "Indemnizaciones", "Sanción de organismo público"]
    },
  ]
  constructor(private fb: FormBuilder, private passiveService: PassiveService, private enterpriseService: EnterpriseService, private handlersRoutes: HandlersRoutesService) {
    this.formAddPassive = this.fb.group({
      category: ['', Validators.required],
      typeAccount: ['', Validators.required],
      amount: ['', Validators.nullValidator],
      date: ['', Validators.required],
      details: ['', [Validators.required, Validators.minLength(10)]],
    })
  }
  avaiableTypes: String[] = []
  ngOnInit(): void {
    this.getEnterpriseId()
    this.formAddPassive.get('category')?.valueChanges.subscribe(value => {
      this.selectedCategory = value
      this.updateAvaiableTypes(value)
    })
    const firstCategory = this.categoriesPassive[0].name
    this.formAddPassive.patchValue({ category: firstCategory })
    this.updateAvaiableTypes(firstCategory)
  }
  updateAvaiableTypes(selectedCategory: String) {
    const category = this.categoriesPassive.find(category => category.name === selectedCategory)
    this.avaiableTypes = category ? category.types : []
    this.formAddPassive.get('typeAccount')?.setValue('')
    console.log(this.avaiableTypes)
  }
  handleSubmit() {
    this.errorMessage = ''
    this.loading = true
    this.passiveService.addPassive(this.enterpriseId, this.formAddPassive.value).subscribe(
      response => {
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
