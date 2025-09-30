import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { EnterpriseService } from '../../../../../services/private/enterprise/enterprise.service';
import { UserService } from '../../../../../services/private/user/user.service';
import { Router } from '@angular/router';
import { ToastService } from '../../../../../services/private/enterprise/misc/toast/toast.service';
import { CommonModule } from '@angular/common';
import { LocationService } from '../../../../../services/private/enterprise/location/location.service';
import { FormAddEnterpriseComponent } from "./form-add-enterprise/form-add-enterprise.component";

@Component({
  selector: 'app-add-enterprise',
  imports: [ReactiveFormsModule, CommonModule, FormAddEnterpriseComponent],
  templateUrl: './add-enterprise.component.html',
  styleUrl: './add-enterprise.component.css'
})
export class AddEnterpriseComponent {
  formAddEnterprise: FormGroup
  loading!: Boolean
  userId: any = ''
  errorMessage: String = ''
  countries: any[] = []
  provincesOrStates: any[] = []
  selectedCountry: string = ''
  isVisible: boolean = false
  constructor(private fb: FormBuilder, private enterpriseService: EnterpriseService, private userService: UserService, private router: Router, private locationService: LocationService) {
    this.userId = this.userService.getUserId()
    this.formAddEnterprise = this.fb.group({
      nameEnterprise: new FormControl('', Validators.required),
      address: new FormControl('', Validators.required),
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
  getCountries(){
    this.locationService.getCountries().subscribe(
      response => {
        console.log(response);
        this.countries = response.map((c: any) => c.name.common).sort()
      }
    )
  }
  viewForm(){
    this.isVisible = !this.isVisible
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
  back() {
    this.router.navigate(['/dashboard'])
  }

}
