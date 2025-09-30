import { Component, OnInit } from '@angular/core';
import { PasswordService } from '../../../services/private/user/security/password/password.service';
import { UserService } from '../../../services/private/user/user.service';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { User } from '../../../../interfaces/user/user.interface';
import { response } from 'express';

@Component({
  selector: 'app-set-new-password',
  imports: [ReactiveFormsModule],
  templateUrl: './set-new-password.component.html',
  styleUrl: './set-new-password.component.css'
})
export class SetNewPasswordComponent implements OnInit {
  userId: any = ''
  user!: User
  loading!: Boolean
  formPassword: FormGroup
  constructor(private fb: FormBuilder, private passwordService: PasswordService, private userService: UserService, private router: Router) {
    this.formPassword = this.fb.group({
      newPassword: new FormControl('', [Validators.required, Validators.minLength(8)]),
      repeatNewPassword: new FormControl('', [Validators.required, Validators.minLength(8)])
    })
    this.userId = this.userService.getUserId()
  }
  ngOnInit(): void {
    this.getUserInfo()
  }
  handleSubmit() {
    this.passwordService.setNewPassword(this.userId, this.formPassword.value.newPassword, this.formPassword.value.repeatNewPassword).subscribe(
      response => {
        Swal.fire({
          icon: 'success',
          title: `<h2 style='font-family: Poppins; letter-spacing: -1.2px'>${response.message}</h2>`,
        })
        localStorage.removeItem("setVerify2FA")
        this.router.navigate(['/log-in'])
      },
      err => {
        console.error(err);
      }
    )
  }
  getUserInfo() {
    this.userService.getUserInfo(this.userId).subscribe(
      response => {
        this.user = response
      },
      err => {
        console.error(err);
      }
    )
  }
}
