import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { PasswordService } from '../../../../../../../services/private/user/security/password/password.service';
import { UserService } from '../../../../../../../services/private/user/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-password',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.css', '../security.component.css']
})
export class PasswordComponent {
  passwordUpdateForm: FormGroup
  userId: any = ''
  constructor(private formBuilder: FormBuilder, private userService: UserService, private passwordService: PasswordService, private router: Router) {
    this.passwordUpdateForm = this.formBuilder.group({
      password: new FormControl('', [Validators.required, Validators.minLength(8)]),
      newPassword: new FormControl('', [Validators.required, Validators.minLength(8)]),
      repeatNewPassword: new FormControl('', [Validators.required, Validators.minLength(8)])
    })
    this.userId = this.userService.getUserId()
  }
  handleSubmit() {
    const password = this.passwordUpdateForm.value.password
    const newPassword = this.passwordUpdateForm.value.newPassword
    const repeatNewPassword = this.passwordUpdateForm.value.repeatNewPassword
    if (!password) {
      Swal.fire({
        icon: 'error',
        title: `<h2 style="font-family: Poppins; letter-spacing: -1.3px">Oops...<h2>`,
        text: `Debes ingresar tu contraseña actual.`
      })
      return
    }
    if (!newPassword && !repeatNewPassword) {
      Swal.fire({
        icon: 'error',
        title: '<h2 style="font-family: Poppins; letter-spacing: -1.3px">Oops...</h2>',
        text: 'Debes ingresar tu nueva contraseña y repetirla.'
      })
      return
    }
    if (!newPassword) {
      Swal.fire({
        icon: 'error',
        title: `<h2 style="font-family: Poppins; letter-spacing: -1.3px">Oops...</h2>`,
        text: 'Debes ingresar tu nueva contraseña.'
      })
      return
    }
    if (!repeatNewPassword) {
      Swal.fire({
        icon: 'error',
        title: `<h2 style="font-family: Poppins; letter-spacing: -1.3px">Oops...</h2>`,
        text: 'Debes repetir tu nueva contraseña.'
      })
      return
    }
    this.passwordService.updatePassword(this.userId, this.passwordUpdateForm.value).subscribe(
      (response) => {
        Swal.fire({
          icon: 'success',
          title: `<h2 style="font-family: Poppins; letter-spacing: -1.3px">${response.message}</h2>`,
          text: 'Nos vemos en la siguiente pestaña.'
        })
        localStorage.setItem("request", "confirmPasswordUpdated")
        this.router.navigate(["/dashboard/my-user/security/confirm-change"])
      }, err => {
        Swal.fire({
          icon: 'error',
          title: `<h2 style="font-family: Poppins; letter-spacing: -1.3px">Oops...</h2>`,
          text: `${err.error.message}`
        })
        console.error(err)
      }
    )
  }
}
