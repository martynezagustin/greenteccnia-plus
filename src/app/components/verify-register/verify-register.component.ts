import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/private/user/user.service';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-verify-register',
  imports: [ReactiveFormsModule],
  templateUrl: './verify-register.component.html',
  styleUrl: './verify-register.component.css'
})
export class VerifyRegisterComponent implements OnInit {
  userId: any = ''
  formVerifyRegister: FormGroup
  loading!: Boolean
  errorMessage: String = ''
  constructor(private userService: UserService, private fb: FormBuilder, private router: Router) {
    this.formVerifyRegister = this.fb.group({
      code: new FormControl('', Validators.required)
    })
  }
  ngOnInit(): void {
    console.log(document.cookie.includes("userId"))
  }
  handleSubmit() {
    this.errorMessage = ''
    this.loading = true
    this.userService.verifyRegister(this.formVerifyRegister.value.code).subscribe(
      (response) => {
        this.errorMessage = ''
        console.log(response)
        this.loading = false
        this.router.navigate(["/welcome"])
      },
      err => {
        console.error(err);
        this.loading = false
        this.errorMessage = err.error.message
      }
    )
  }
}
