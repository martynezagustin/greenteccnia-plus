import { Component, Input, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { PasswordService } from '../../../../../../../../services/private/user/security/password/password.service';
import { TwoFaService } from '../../../../../../../../services/private/user/security/two-fa/two-fa.service';
import { Router } from '@angular/router';
import { UserService } from '../../../../../../../../services/private/user/user.service';
import { User } from '../../../../../../../../../interfaces/user/user.interface';

@Component({
  selector: 'app-toggle-two-fa',
  imports: [],
  templateUrl: './toggle-two-fa.component.html',
  styleUrl: '../../security.component.css'
})
export class ToggleTwoFaComponent implements OnInit {
  @Input() loading!: Boolean
  loading2FA!: Boolean
  isChecked: Boolean = false
  @Input() userId!: any
  @Input() user!: User
  successMessage: String = ''
  errorMessage: String = ''
  constructor(private userService: UserService, private passwordService: PasswordService, private twoFAService: TwoFaService, private router: Router) { }
  ngOnInit(): void {
    this.userService.getUserInfo(this.userId).subscribe(
      () => {
        this.isChecked = this.user.security.twoFA.twoFAActived
        this.loading = false
      }, err => {
        console.error(err);
      }
    );
  }
  async toggle2FA() {
    const { value: password } = await Swal.fire({
      title: "<h2 style='font-familiy: Poppins; letter-spacing: -1.5px'>Ingrese su contraseña</h2>",
      input: "password",
      inputLabel: "Contraseña",
      inputPlaceholder: "**********"
    })
    if (!password) {
      this.loading2FA = false
      return
    }
    const { value: repeatYourPassword } = await Swal.fire({
      title: "<h2 style='font-familiy: Poppins; letter-spacing: -1.5px'>Repita su contraseña</h2>",
      input: "password",
      inputLabel: "Contraseña",
      inputPlaceholder: "**********"
    })
    if (!repeatYourPassword) {
      this.loading2FA = false
      return
    }
    if (password !== repeatYourPassword) {
      Swal.fire({
        title: 'Las contraseñas no coinciden.',
        text: 'Vuelva a intentarlo.',
        icon: "error"
      })
      this.loading2FA = false
      return
    }
    if (!password || !repeatYourPassword) {
      this.loading2FA = false
      return
    }
    if (password && repeatYourPassword && password === repeatYourPassword) {
      this.loading2FA = true
      this.passwordService.validatePassword(this.userId, password, repeatYourPassword).subscribe(
        () => {
          this.isChecked = !this.isChecked
          this.twoFAService.update2FAStatus(this.userId, this.isChecked).subscribe(
            response => {
              this.successMessage = response.message
              Swal.fire({
                title: '<h2 style="font-family: Poppins">Chequea tu casilla de email.</h2>',
                text: `${this.successMessage}`,
                icon: "success"
              });
              this.errorMessage = ''
              this.loading2FA = false
              localStorage.setItem("request", "confirm2FAChanges")
              return this.router.navigate(["/dashboard/my-user/security/confirm-change"])
            }, err => {
              this.loading2FA = false
              this.errorMessage = err.error.message
              Swal.fire({
                title: 'Oops...',
                text: `${err.error.message}`,
                icon: "error"
              });
              this.successMessage = ''
            }
          )
        }, err => {
          Swal.fire({
            title: 'Oops...',
            text: `${err.error.message}`,
            icon: 'error'
          })

          this.loading2FA = false
        }
      )
    }
  }
}

