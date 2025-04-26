import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActiveService } from '../../../../../../../../services/private/finances/netWorth/active/active.service';
import { response } from 'express';
import { EnterpriseService } from '../../../../../../../../services/private/enterprise/enterprise.service';
import { Router } from '@angular/router';
import { HandlersRoutesService } from '../../../../../../../../services/private/dashboard/handlers/handlers-routes/handlers-routes.service';

@Component({
  selector: 'app-add-active',
  imports: [FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './add-active.component.html',
  styleUrl: '../../../global-styles/global-finances.css'
})
export class AddActiveComponent implements OnInit {
  @Input() selectedForm!: String
  enterpriseId!: any
  formAddActive: FormGroup
  selectedCategory: String = ''
  loading: Boolean = false
  errorMessage: string = ''
  categoriesActive = [
    {
      name: "Activo corriente",
      types: ["Caja", "Bancos", "Inversiones a corto plazo", "Suministros", "Inventario", "Cuentas por cobrar", "Inventarios", "Otros activos corrientes"]
    },
    {
      name: "Activo no corriente",
      types: ["Bienes inmuebles", "Maquinaria", "Vehículos", "Muebles y enseres", "Activos intangibles", "Otros activos no corrientes"]
    },
    {
      name: "Activo intangible",
      types: ["Patentes", "Marcas registradas", "Derechos de autor", "Software", "Otros activos intangibles"]
    },
    {
      name: "Otro activo no corriente",
      types: ["Obras en curso", "Inversiones a largo plazo", "Otros activos no corrientes"]
    }
  ]
  constructor(private fb: FormBuilder, private activeService: ActiveService, private enterpriseService: EnterpriseService, private handlersRoutes: HandlersRoutesService) {
    this.formAddActive = this.fb.group({
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
    this.formAddActive.get('category')?.valueChanges.subscribe(value => {
      this.selectedCategory = value
      this.updateAvaiableTypes(value)
    })

    const firstCategory = this.categoriesActive[0].name
    this.formAddActive.patchValue({ category: firstCategory })
    this.updateAvaiableTypes(firstCategory)
  }
  updateAvaiableTypes(selectedCategory: string) {
    const category = this.categoriesActive.find(category => category.name === selectedCategory)
    this.avaiableTypes = category ? category.types : []
    this.formAddActive.get('typeAccount')?.setValue('')
  }
  handleSubmit() {
    this.errorMessage = ''
    this.loading = true
    this.activeService.addActive(this.enterpriseId, this.formAddActive.value).subscribe(
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
