import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { TwoFaService } from '../../services/auth/two-fa.service';

@Component({
  selector: 'app-verify-login',
  imports: [ReactiveFormsModule, HttpClientModule],
  providers: [TwoFaService],
  templateUrl: './verify-twoFA.component.html',
  styleUrl: './verify-twoFA.component.css'
})
export class VerifyLoginComponent implements OnInit {
  verify2FAForm: FormGroup
  errorMessage: string = ''
  successMessage: string = ''
  userId: any = ''
  //advertencia
  warn: any = ''
  confirmDevice: any = ''
  constructor(private formBuilder: FormBuilder, private twoFAservice: TwoFaService, private router: Router) {
    this.verify2FAForm = this.formBuilder.group({
      userId: new FormControl(this.userId, Validators.required),
      code: new FormControl('', Validators.required)
    })
  }
  ngOnInit(): void {
    this.userId = localStorage.getItem("userId")
    console.log(this.userId)
    this.warn = localStorage.getItem("warn") || ''
    this.confirmDevice = localStorage.getItem("confirmDevice") || ''
  }
  back() {
    this.router.navigate(["/log-in"])
  }
  handleSubmit(): void {
    this.twoFAservice.verify2FA(this.userId, this.verify2FAForm.value.code).subscribe(
      () => {
        console.log("Esta el token?", document.cookie.includes("token"))
        if (this.warn) {
          this.router.navigate(["/confirm-device"])
        } else {
          const request = localStorage.getItem("setVerify2FA")
          if(request === "logIn"){ 
            this.router.navigate(["/dashboard"])
            localStorage.removeItem('setVerify2FA')
          } else {
            this.router.navigate(['/set-new-password'])
          }
        }
        localStorage.removeItem("warn")
      },
      err => {
        this.errorMessage = err.error.message
        this.successMessage = ''
      }
    )
  }
}
