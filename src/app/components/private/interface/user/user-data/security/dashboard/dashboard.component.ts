import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Device } from '../../../../../../../../interfaces/security/devices/device.interface';
import { UserService } from '../../../../../../../services/private/user/user.service';
import { DeviceService } from '../../../../../../../services/private/user/device/device.service';
import { ConfirmationService } from '../../../../../../../services/utilities/confirmation/confirmation.service';
import Swal from 'sweetalert2';
import { User } from '../../../../../../../../interfaces/user/user.interface';
import { DateDevicePipe } from '../../../../../../../pipes/date-device.pipe';
import { Router, RouterLink } from '@angular/router';
import { PasswordService } from '../../../../../../../services/private/user/security/password/password.service';
import { SuspiciousLogin } from '../../../../../../../../interfaces/security/suspiciousLogin/suspiciousLogin.interface';
import { SuspiciousLoginService } from '../../../../../../../services/private/user/security/suspicious-login/suspicious-login.service';
import { TwoFaService } from '../../../../../../../services/private/user/security/two-fa/two-fa.service';
import { ExportDataService } from '../../../../../../../services/private/user/security/export-data/export-data.service';
import { ToggleTwoFaComponent } from './toggle-two-fa/toggle-two-fa.component';
import { RegisteredDevicesComponent } from "./registered-devices/registered-devices.component";
import { PasswordAndRecoveryComponent } from "./password-and-recovery/password-and-recovery.component";
import { SuspiciousLoginComponent } from './suspicious-login/suspicious-login.component';

@Component({
  selector: 'app-dashboard',
  imports: [RouterLink, ToggleTwoFaComponent, RegisteredDevicesComponent, PasswordAndRecoveryComponent, SuspiciousLoginComponent],
  templateUrl: './dashboard.component.html',
  styleUrls: ['../security.component.css', './dashboard.component.css', '../../utils.css']
})
export class DashboardComponent implements OnInit {
  user!: User
  loading: Boolean = true
  userId: any = ''
  //para la autenticacion 2FA
  loading2FA!: Boolean
  isChecked!: Boolean //valor que toma el estado d 2fa y da dinamismo
  //logins sospechosos
  suspiciousLogins: SuspiciousLogin[] = []
  constructor(private userService: UserService, private passwordService: PasswordService, private suspiciousLoginService: SuspiciousLoginService, private router: Router, private exportDataService: ExportDataService) {
    this.userId = this.userService.getUserId()
  }
  ngOnInit(): void {
    this.getUserInfo()
    this.getSuspiciousLogins()
  }
  getUserInfo() {
    this.userService.getUserInfo(this.userId).subscribe(
      response => {
        this.user = response
        this.isChecked = this.user.security.twoFA.twoFAActived
        setTimeout(() => {
          this.loading = false
        }, 1000);
      }, err => {
        console.error(err);
      }
    );
  }
  exportLogsCSV(){
    this.exportDataService.exportDataCSV(this.userId)
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
  

  
}
