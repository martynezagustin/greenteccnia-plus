import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RecoveryKeyService } from '../../../../../../../services/private/user/security/recovery-key/recovery-key.service';
import { UserService } from '../../../../../../../services/private/user/user.service';
import Swal from 'sweetalert2';
import { RouterLink } from '@angular/router';
import { PasswordService } from '../../../../../../../services/private/user/security/password/password.service';
import { User } from '../../../../../../../../interfaces/user/user.interface';

@Component({
  selector: 'app-recovery-key',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './recovery-key.component.html',
  styleUrl: '../security.component.css'
})
export class RecoveryKeyComponent implements OnInit {
  recoveryKeyForm: FormGroup
  recoveryKey: string = ''
  statusRecoveryKey!: any
  showRecoveryKey: Boolean = false
  userId: any = ''
  user!: User
  constructor(private formBuilder: FormBuilder, private userService: UserService, private recoveryKeyService: RecoveryKeyService, private passwordService: PasswordService) {
    this.recoveryKeyForm = this.formBuilder.group({
      recoveryKey: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(6)])
    })
    this.userId = this.userService.getUserId()
  }
  ngOnInit(): void {
    this.getStatusRecoveryKey()
  }
  async handleSubmit() {
    const { value: password } = await Swal.fire({
      title: "Ingrese su contraseña",
      input: "password",
      inputLabel: "Contraseña",
      inputPlaceholder: "**********"
    })
    const { value: repeatYourPassword } = await Swal.fire({
      title: "Repita su contraseña",
      input: "password",
      inputLabel: "Contraseña",
      inputPlaceholder: "**********"
    })
    if (password === repeatYourPassword) {
      this.passwordService.validatePassword(this.userId, password, repeatYourPassword).subscribe(
        () => {
          this.recoveryKeyService.addRecoveryKey(this.userId, this.recoveryKeyForm.value.recoveryKey).subscribe(
            (response) => {
              Swal.fire({
                icon: "success",
                title: `<h2 style="font-family: Poppins; letter-spacing: -1.2px">Clave de recuperación creada con éxito.</h2>`,
                text: "Ya puedes recuperar tu cuenta en caso de olvidar tu contraseña."
              })
            },
            err => {
              Swal.fire({
                icon: "error",
                title: "Ha ocurrido un error",
                text: `${err.error.message}`
              })
              return
            }
          )
        },
        err => {
          Swal.fire({
            icon: "error",
            title: "Ha ocurrido un error",
            text: `${err.error.message}`
          })
          return
        }
      )
    }
  }
  getStatusRecoveryKey() {
    this.recoveryKeyService.getRecoveryKey(this.userId).subscribe(
      (response) => {
        this.statusRecoveryKey = response.isValid
        this.recoveryKey = response.recoveryKey

      }, err => {
        console.error(err);

      }
    )
  }
  async toggleRecoveryKey() {
    if (this.showRecoveryKey !== true) {
      const { value: password } = await Swal.fire({
        title: "Ingrese su contraseña",
        input: "password",
        inputLabel: "Contraseña",
        inputPlaceholder: "**********"
      })
      if (!password) {
        Swal.fire({
          icon: "error",
          title: "Ha ocurrido un error",
          text: "Debes ingresar tu contraseña para continuar."
        })
        return
      }
      const { value: repeatYourPassword } = await Swal.fire({
        title: "Repita su contraseña",
        input: "password",
        inputLabel: "Contraseña",
        inputPlaceholder: "**********"
      })
      if (password === repeatYourPassword) {
        this.passwordService.validatePassword(this.userId, password, repeatYourPassword).subscribe(
          () => {
            this.showRecoveryKey = !this.showRecoveryKey
          },
          err => {
            Swal.fire({
              icon: "error",
              title: "Ha ocurrido un error",
              text: `${err.error.message}`
            })
            return
          }
        )
      }
    }else{
      this.showRecoveryKey = !this.showRecoveryKey
    }
  }
}
