import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sing-up',
  imports: [ReactiveFormsModule],
  templateUrl: './sing-up.component.html',
  styleUrl: './sing-up.component.css'
})
export class SingUpComponent {
  loading!: Boolean
  formRegister: FormGroup
  errorMessage: String = ''
  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.formRegister = this.fb.group({
      name: new FormControl('', Validators.required),
      lastname: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      age: new FormControl(null, Validators.required),
      gender: new FormControl('', Validators.required),
      address: new FormControl('', Validators.required),
      identityCard: new FormControl('', Validators.required),
      position: new FormControl('', Validators.required),
      phone: new FormControl('', Validators.required),
      username: new FormControl('', Validators.required),
      security: this.fb.group({
        password: this.fb.group({
          currentPassword: new FormControl('', [Validators.required, Validators.minLength(8)]),
          repeatYourPassword: new FormControl('', [Validators.required, Validators.minLength(8)])
        })
      }),
    })
  }
  handleTest() {
    console.log(this.formRegister.value)
  }
  handleSubmit() {
    this.errorMessage = ''
    this.loading = true
    this.authService.registerUser(this.formRegister.value).subscribe(
      response => {
        console.log(response);
        this.loading = false
        this.errorMessage = ''
        this.router.navigate(["/verify-register"])
      }, err => {
        this.errorMessage = err.error.message
        console.log(err)
        this.loading = false
      }
    )
  }
}
