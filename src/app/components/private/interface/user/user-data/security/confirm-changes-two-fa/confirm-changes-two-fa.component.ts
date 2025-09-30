import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../../../../../../services/private/user/user.service';
import { TwoFaService } from '../../../../../../../services/private/user/security/two-fa/two-fa.service';
import "sweetalert2"
import Swal from 'sweetalert2';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { PasswordService } from '../../../../../../../services/private/user/security/password/password.service';
import { SuspiciousLoginService } from '../../../../../../../services/private/user/security/suspicious-login/suspicious-login.service';

@Component({
  selector: 'app-confirm-changes-two-fa',
  imports: [ReactiveFormsModule, RouterLink, RouterModule],
  templateUrl: './confirm-changes-two-fa.component.html',
  styleUrls: ['../security.component.css']
})
export class ConfirmChangesTwoFaComponent {
  userId: any
  form2FA: FormGroup
  constructor(private twoFaService: TwoFaService, private userService: UserService, private passwordService: PasswordService, private suspiciousLoginService: SuspiciousLoginService, private formBuilder: FormBuilder, private router: Router) {
    this.userId = userService.getUserId()
    this.form2FA = this.formBuilder.group({
      userId: new FormControl(this.userId, [Validators.required]),
      code: new FormControl('', [Validators.required])
    })
  }
  handleSubmit() {
    const key = localStorage.getItem("request")
    switch (key) {
      case "confirm2FAChanges":
        this.twoFaService.confirm2FAStatus(this.userId, this.form2FA.value.code).subscribe(
          (response) => {
            Swal.fire({
              icon: "success",
              title: `<h2 style='font-family:Poppins; letter-spacing: -1.2px;'>${response.message}</h2>`
            })
            localStorage.removeItem("request")
            this.router.navigate(["/dashboard/my-user/security"])
          }, err => {
            console.error(err);
          }
        )
        break;
      case "confirmPasswordUpdated":
        this.passwordService.confirmUpdatePassword(this.userId, this.form2FA.value.code).subscribe(
          (response) => {
            Swal.fire({
              icon: 'success',
              title: `<h2 style='font-family:Poppins; letter-spacing: -1.2px;'>${response.message}</h2>`
            })
            localStorage.removeItem("request")
            this.router.navigate(["/dashboard/my-user/security"])
          }, err => {
            console.error(err);
          }
        )
        break;
      case "confirmSuspiciousLogin":
        this.suspiciousLoginService.confirmStatusSuspiciousLogin(this.userId, this.form2FA.value.code).subscribe(
          response => {
            if (response.updatedSuspiciousLogin.actionByUser === "Confirmado") {
              Swal.fire({
                icon: 'success',
                title: `<h2 style='font-family:Poppins; letter-spacing: -1.2px;'>Inicio de sesión marcado como 'seguro'.</h2>`
              })
              this.router.navigate(["/dashboard/my-user/security"])
            } else {
              Swal.fire({
                icon: 'success',
                title: `<h2 style='font-family:Poppins; letter-spacing: -1.2px;'>Has marcado el inicio de sesión como 'sospechoso'. Se te redirigirá a una pestaña para configurar tus opciones de seguridad.</h2>`
              })
              this.router.navigate(["/dashboard/my-user/security/set-security-measures"])
            }
            localStorage.removeItem("request")
          }, err => {
            console.error(err);
          }
        )
        break;
      case "confirmDeleteAccount":
        this.userService.confirmDeleteUser(this.userId, this.form2FA.value.code).subscribe(
          response => {
            Swal.fire({
              icon: 'success',
              title: `<h2 style='font-family:Poppins; letter-spacing: -1.2px;'>${response.message}</h2>`
            })
            localStorage.removeItem("request")
            this.router.navigate(["/dashboard/my-user/security"])
          }, err => {
            console.error(err);
          }
        )
        break;
      default:
        break;
    }
  }
}
