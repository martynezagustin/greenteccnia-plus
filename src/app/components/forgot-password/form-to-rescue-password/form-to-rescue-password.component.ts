import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PasswordService } from '../../../services/private/user/security/password/password.service';
import { Router, RouterLink } from '@angular/router';
import { User } from '../../../../interfaces/user/user.interface';
import { UserService } from '../../../services/private/user/user.service';

@Component({
  selector: 'app-form-to-rescue-password',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './form-to-rescue-password.component.html',
  styleUrl: './form-to-rescue-password.component.css'
})
export class FormToRescuePasswordComponent implements OnInit {
  loading!: Boolean
  formToForgotPassword: FormGroup
  user!: User
  userId: any = ''
  errorMessage: String = ''
  constructor(private fb: FormBuilder, private userService: UserService, private passwordService: PasswordService, private router: Router) {
    this.formToForgotPassword = this.fb.group({
      email: new FormControl('', [Validators.required, Validators.email])
    })
  }
  ngOnInit(): void {
    this.loading = false
  }
  handleSubmit() {
    this.getUserInfo()
    this.loading = true
    this.passwordService.forgotPassword(this.formToForgotPassword.value.email).subscribe(
      () => {
        localStorage.setItem("userId", this.userId)
        localStorage.setItem("setVerify2FA", "rescuePassword")
        this.router.navigate(["/verify-2fa"])
        this.loading = false
      },
      err => {
        this.errorMessage = err.error.message;
        this.loading = false
      }
    )
  }
  getUserInfo() {
    this.userService.getUserByEmail(this.formToForgotPassword.value.email).subscribe(
      response => {
        this.user = response
        this.userId = response._id
      },
      err => {
        console.error(err);
      }
    )
  }
}
