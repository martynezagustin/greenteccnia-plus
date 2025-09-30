import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { EnterpriseService } from '../../../../../../../services/private/enterprise/enterprise.service';
import { UserService } from '../../../../../../../services/private/user/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-certifications-accomplished',
  imports: [ReactiveFormsModule],
  templateUrl: './certifications-accomplished.component.html',
  styleUrl: '../add-sustainability-data.component.css'
})
export class CertificationsAccomplishedComponent {
  formAccomplishedCertifications: FormGroup
  userId!: any
  loading!: Boolean
  errorMessage!: String
  constructor(private fb: FormBuilder, private enterpriseService: EnterpriseService, private userService: UserService, private router: Router) {
    this.userId = this.userService.getUserId()
    this.formAccomplishedCertifications = this.fb.group({
      certificationsAccomplished: this.fb.group({
        ISO_14001: new FormControl(false, Validators.required),
        ISO_50001: new FormControl(false, Validators.required),
        certification_LEED: new FormControl(false, Validators.required),
        B_Corp: new FormControl(false, Validators.required),
        ISO_26000: new FormControl(false, Validators.required),
        ISO_20400: new FormControl(false, Validators.required),
        ISO_14046: new FormControl(false, Validators.required),
        ISO_14064: new FormControl(false, Validators.required)
      })
    })
  }
  handleSubmit() {
    this.errorMessage = ''
    this.loading = true
    this.enterpriseService.addCertificationsAccomplished(this.userId, this.formAccomplishedCertifications.value).subscribe(
      () => {
        this.router.navigate(["/dashboard/add-sustainability-enterprise/add-sustainable-objectives"])
        this.loading = false
      }, err => {
        this.errorMessage = err.error.message
        this.loading = false
      }
    )
  }
}
