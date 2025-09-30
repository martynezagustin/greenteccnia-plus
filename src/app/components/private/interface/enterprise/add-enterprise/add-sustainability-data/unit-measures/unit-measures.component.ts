import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { EnterpriseService } from '../../../../../../../services/private/enterprise/enterprise.service';
import { UserService } from '../../../../../../../services/private/user/user.service';
import { Router } from '@angular/router';
import { Enterprise } from '../../../../../../../../interfaces/enterprise/enterprise.interface';
import { ToastService } from '../../../../../../../services/private/enterprise/misc/toast/toast.service';

@Component({
  selector: 'app-unit-measures',
  imports: [ReactiveFormsModule],
  templateUrl: './unit-measures.component.html',
  styleUrl: '../add-sustainability-data.component.css'
})
export class UnitMeasuresComponent implements OnInit {
  formUnitMeasures: FormGroup
  userId: any
  loading!: Boolean
  // a modo de facilitar, buscamos la empresa
  enterprise!: Enterprise
  constructor(private fb: FormBuilder, private enterpriseService: EnterpriseService, private userService: UserService, private router: Router, private toastService: ToastService) {
    this.userId = this.userService.getUserId()
    this.formUnitMeasures = this.fb.group({
      dataSustainability: this.fb.group({
        consumptionKwh: this.fb.group({
          unit: new FormControl('', Validators.required)
        }),
        waterConsumption: this.fb.group({
          unit: new FormControl('', Validators.required)
        }),
        waste: this.fb.group({
          unit: new FormControl('', Validators.required)
        }),
        CO2emissions: this.fb.group({
          unit: new FormControl('', Validators.required)
        })
      }),
      estimatedSavings: this.fb.group({
        consumptionKwh: this.fb.group({
          unit: new FormControl('', Validators.required)
        }),
        water: this.fb.group({
          unit: new FormControl('', Validators.required)
        }),
        waste: this.fb.group({
          unit: new FormControl('', Validators.required)
        }),
        CO2emissions: this.fb.group({
          unit: new FormControl('', Validators.required)
        })
      })
    })
  }
  ngOnInit(): void {
    setTimeout(() => {
      this.toastService.info('Ingresa las unidades de medida que utilizas en tu día a día. Esto ayudará a mejorar tu experiencia en el manejo de datos de sostenibilidad!', '🤭 ¡Muy importante!')
    }, 2000);
  }
  handleSubmit() {
    this.loading = true
    this.enterpriseService.addSustainabilityOptionsToEnterprise(this.userId, this.formUnitMeasures.value).subscribe(
      () => {
        this.router.navigate(["/dashboard/add-sustainability-enterprise/certifications-accomplished"])
        this.loading = false
      }, err => {
        console.error(err);
        this.loading = false
      }
    )
  }
  getEnterprise(){
    this.enterpriseService.getEnterprise(this.userId).subscribe(
      response => {
        this.enterprise = response
        localStorage.setItem("enterpriseId", this.enterprise._id)
      },
      error => {
        console.error(error);
      }
    )
  }
}
