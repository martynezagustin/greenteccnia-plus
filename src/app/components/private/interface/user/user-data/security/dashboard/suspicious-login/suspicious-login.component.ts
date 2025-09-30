import { Component, Input, OnInit } from '@angular/core';
import { SuspiciousLoginService } from '../../../../../../../../services/private/user/security/suspicious-login/suspicious-login.service';
import { SuspiciousLogin } from '../../../../../../../../../interfaces/security/suspiciousLogin/suspiciousLogin.interface';
import { DateDevicePipe } from '../../../../../../../../pipes/date-device.pipe';
import Swal from 'sweetalert2';
import { PasswordService } from '../../../../../../../../services/private/user/security/password/password.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-suspicious-login',
  imports: [DateDevicePipe, RouterLink],
  templateUrl: './suspicious-login.component.html',
  styleUrls: ['../../security.component.css', "./suspicious-login.component.css"]
})
export class SuspiciousLoginComponent implements OnInit {
  @Input() loading!: Boolean
  @Input() userId!: any
  suspiciousLogins!: SuspiciousLogin[]
  constructor(private suspiciousLoginService: SuspiciousLoginService, private passwordService: PasswordService, private router: Router) { }
  ngOnInit(): void {
    this.getSuspiciousLogins()
  }
  getSuspiciousLogins() {
    this.suspiciousLoginService.getSuspiciousLogins(this.userId).subscribe(
      response => {
        this.suspiciousLogins = response
      },
      err => {
        console.error(err);
      }
    )
  }
  async toggleSuspiciousDevice(suspiciousLoginId: String, pendingActionByUser: String) {
    const { value: password } = await Swal.fire({
      title: "<h2 style='font-familiy: Poppins; letter-spacing: -1.3px'>Ingrese su contraseña</h2>",
      input: "password",
      inputLabel: "Contraseña",
      inputPlaceholder: "**********"
    })
    if (!password) {
      return
    }
    const { value: repeatYourPassword } = await Swal.fire({
      title: "Repita su contraseña",
      input: "password",
      inputLabel: "Contraseña",
      inputPlaceholder: "**********"
    })
    if (!repeatYourPassword) {
      return
    }
    if (password !== repeatYourPassword) {
      Swal.fire({
        title: 'Las contraseñas no coinciden.',
        text: 'Vuelva a intentarlo.',
        icon: "error"
      })
      return
    }
    if (!password || !repeatYourPassword) {
      return
    }
    this.passwordService.validatePassword(this.userId, password, repeatYourPassword).subscribe(
      () => {
        this.suspiciousLoginService.setSuspiciousLogin(this.userId, suspiciousLoginId, pendingActionByUser).subscribe(
          () => {
            localStorage.setItem("request", "confirmSuspiciousLogin")
            return this.router.navigate(["/dashboard/my-user/security/confirm-change"])
          },
          err => {
            Swal.fire({
              title: '<h2 style="font-family: Poppins; letter-spacing: -1.3px">Oops...</h2>',
              text: `${err.error.message}`,
              icon: 'error'
            })
            console.error(err);

          }
        )
      },
      err => {
        Swal.fire({
          title: '<h2 style="font-family: Poppins; letter-spacing: -1.3px">Oops...</h2>',
          text: `${err.error.message}`,
          icon: 'error'
        })
        console.error(err);

      }
    )
  }
}
