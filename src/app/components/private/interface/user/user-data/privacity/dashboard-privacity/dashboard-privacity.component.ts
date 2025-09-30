import { Component } from '@angular/core';
import { ExportDataService } from '../../../../../../../services/private/user/security/export-data/export-data.service';
import { UserService } from '../../../../../../../services/private/user/user.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { PasswordService } from '../../../../../../../services/private/user/security/password/password.service';
import { UpdateRetentionDataComponent } from './update-retention-data/update-retention-data.component';

@Component({
  selector: 'app-dashboard-privacity',
  imports: [UpdateRetentionDataComponent],
  templateUrl: './dashboard-privacity.component.html',
  styleUrl: '../privacity.component.css'
})
export class DashboardPrivacityComponent {
  loading!: Boolean
  userId: any = ''
  constructor(private exportDataService: ExportDataService, private passwordService: PasswordService, private userService: UserService, private router: Router) {
    this.userId = this.userService.getUserId()
  }
  exportDataCSV() {
    this.exportDataService.exportDataCSV(this.userId)
  }
  exportDataJSON() {
    this.exportDataService.exportDataJSON(this.userId)
  }
  async deleteAccount() {
    const { value: password } = await Swal.fire({
      title: "<h2 style='font-familiy: Poppins; letter-spacing: -1.8px'>Ingrese su contraseña</h2>",
      input: "password",
      inputLabel: "Contraseña",
      inputPlaceholder: "**********"
    })
    if (!password) {
      return
    }
    const { value: repeatYourPassword } = await Swal.fire({
      title: "<h2 style='font-familiy: Poppins; letter-spacing: -1.8px'>Repita su contraseña</h2>",
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
        this.userService.deleteUser(this.userId, password, repeatYourPassword).subscribe(
          response => {
            Swal.fire({
              title: '<h2 style="font-family: Poppins; letter-spacing: -1.6px">Chequea tu casilla de email</h2>',
              text: `${response.message}`,
              icon: "success"
            })
            localStorage.setItem("request", "confirmDeleteAccount")
            return this.router.navigate(["/dashboard/my-user/security/confirm-change"])
          },
          err => {
            Swal.fire({
              title: '<h2 style="font-family: Poppins; letter-spacing: -1.6px">Oops...</h2>',
              text: `${err.error.message}`,
              icon: "error"
            })
          }
        )
      },
      err => {
        console.error(err);
      }
    )
  }
}
