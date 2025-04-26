import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';
import { HttpClientModule, provideHttpClient } from '@angular/common/http';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '../../services/private/user/user.service';

@Component({
  selector: 'log-in-form',
  standalone: true,
  imports: [ReactiveFormsModule, HttpClientModule, RouterLink],
  providers: [AuthService],
  templateUrl: './log-in-form.component.html',
  styleUrl: './log-in-form.component.css'
})
export class LogInFormComponent implements OnInit{
  logInForm: FormGroup
  clasificationSecurity: String = ''
  successMessage: string = ''
  errorMessage: string = ''
  welcome: String = "¡Bienvenido de nuevo!" //para el inicio
  loading!: Boolean
  constructor(private formBuilder: FormBuilder, private authService: AuthService, private userService: UserService, private router: Router) {

    this.logInForm = this.formBuilder.group({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    })
  }
  ngOnInit(): void {
    if(document.cookie.includes("token")){
      this.router.navigate(["/dashboard"])
    }
  }
  handleSubmit(): void {
    this.loading = true
    this.authService.logIn(this.logInForm.value.username, this.logInForm.value.password).subscribe(
      response => {
        localStorage.setItem("userId", response.userId)
        if(response.warn !== null){
          localStorage.setItem("warn", response.warn)
        }
        this.successMessage = response.message
        this.errorMessage = ''
        if(document.cookie.includes("token")){
          this.loading = false
          return this.router.navigate(["/dashboard"])
        } else {
          this.loading = false
          localStorage.setItem("setVerify2FA", "logIn")
          return this.router.navigate(["/verify-2fa"])
        }
      },
      err => {
        this.errorMessage = err.error.message
        console.error(err);
        this.successMessage = ''

        this.loading = false
      }
    )
  }
}
