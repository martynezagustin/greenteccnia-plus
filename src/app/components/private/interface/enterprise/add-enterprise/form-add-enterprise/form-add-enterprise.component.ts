import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { EnterpriseService } from '../../../../../../services/private/enterprise/enterprise.service';
import { UserService } from '../../../../../../services/private/user/user.service';
import { ToastService } from '../../../../../../services/private/enterprise/misc/toast/toast.service';
import { LocationService } from '../../../../../../services/private/enterprise/location/location.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-form-add-enterprise',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './form-add-enterprise.component.html',
  styleUrl: './form-add-enterprise.component.css'
})
export class FormAddEnterpriseComponent implements OnInit {
  formAddEnterprise: FormGroup
  loading!: Boolean
  userId: any = ''
  errorMessage: String = ''
  countries: any[] = []
  provincesOrStates: any[] = []
  selectedCountry: string = ''
  constructor(private fb: FormBuilder, private enterpriseService: EnterpriseService, private userService: UserService, private router: Router, private toast: ToastService, private locationService: LocationService) {
    this.userId = this.userService.getUserId()
    this.formAddEnterprise = this.fb.group({
      nameEnterprise: new FormControl('', Validators.required),
      address: this.fb.group({
        name: new FormControl('', Validators.required),
        numberAddress: new FormControl('', Validators.required),
        apartment: new FormControl('')
      }) ,
      description: new FormControl('', Validators.required),
      taxIdentificationNumber: this.fb.group({
        number: new FormControl('', [Validators.required, Validators.minLength(8)]),
        type: new FormControl('', Validators.required)
      }),
      dateOfStart: new FormControl('', Validators.required),
      city: new FormControl('', Validators.required),
      stateOrProvince: new FormControl('', Validators.required),
      country: new FormControl('', Validators.required),
      companySize: new FormControl('', Validators.required),
      businessSector: new FormControl('', Validators.required),
      currency: new FormControl('', Validators.required),
      businessType: new FormControl('', Validators.required)
    })
  }
  ngOnInit(): void {
    setTimeout(() => {
      this.toast.info('Comienza a rellenar el formulario y ser parte de la gestión sustentable 🚀.', `Bienvenido a GreenTeccnia+`);
    }, 1000);
    this.getCountries()
  }
  getCountries() {
    this.locationService.getCountries().subscribe(
      response => {
        console.log(response);
        this.countries = response.map((c: any) => c.name.common).sort()
      }
    )
  }
  getProvincesOrStates() {
    this.selectedCountry = this.formAddEnterprise.value.country
    this.locationService.getProvincesOrStates(this.selectedCountry).subscribe(
      response => {
        this.provincesOrStates = response.data.states.map((s: any) => s.name).sort()
      },
      err => {
        console.error(err);
      }
    )
  }
  handleSubmit() {
    this.loading = true
    this.errorMessage = ""
    this.enterpriseService.addEnterprise(this.userId, this.formAddEnterprise.value).subscribe(
      () => {
        this.router.navigate(["/dashboard/add-sustainability-enterprise/unit-measures"])
        this.loading = false
      },
      err => {
        this.errorMessage = err.error.message
        this.loading = false
      }
    )
  }
  get nameEnterprise() { return this.formAddEnterprise.get('nameEnterprise') }
  get address() { return this.formAddEnterprise.get('address') }
  get description() { return this.formAddEnterprise.get('description') }
  get taxIdentificationNumber() { return this.formAddEnterprise.get('taxIdentificationNumber.number') }
  get typeTaxId() { return this.formAddEnterprise.get('taxIdentificationNumber.type') }
  get dateOfStart() { return this.formAddEnterprise.get('dateOfStart') }
  get city() { return this.formAddEnterprise.get('city') }
  get stateOrProvince() { return this.formAddEnterprise.get('stateOrProvince') }
  get country() { return this.formAddEnterprise.get('country') }
  get companySize() { return this.formAddEnterprise.get('companySize') }
  get businessSector() { return this.formAddEnterprise.get('businessSector') }
  get currency() { return this.formAddEnterprise.get('currency') }
  get businessType() { return this.formAddEnterprise.get('businessType') }

}
