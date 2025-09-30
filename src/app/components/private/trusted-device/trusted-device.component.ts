import { Component, OnInit } from '@angular/core';
import { DeviceService } from '../../../services/private/user/device/device.service';
import { UserService } from '../../../services/private/user/user.service';
import { Device } from '../../../../interfaces/security/devices/device.interface';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-trusted-device',
  imports: [RouterLink],
  templateUrl: './trusted-device.component.html',
  styleUrl: './trusted-device.component.css'
})
export class TrustedDeviceComponent implements OnInit {
  userId: any = ''
  suspiciousDevice!: Device
  loading!: Boolean
  loadingConfirmOrNot!: Boolean
  messageError: String = ''
  constructor(private deviceService: DeviceService, private userService: UserService, private router: Router) {
    this.userId = this.userService.getUserId()
  }
  ngOnInit(): void {
    this.getDevice()
    this.loading = true
  }
  getDevice() {
    this.deviceService.getConfirmDevice(this.userId).subscribe(
      (response: Device) => {
        this.suspiciousDevice = response
        this.loading = false
        console.log(this.suspiciousDevice);
        this.messageError = ''
      }, err => {
        this.messageError = err.error.message
        this.loading = false
      }
    )
  }
  confirmDevice(deviceId: String, actionByUser: Boolean) {
    this.loadingConfirmOrNot = true
    this.deviceService.setTrustedDevice(this.userId, deviceId, actionByUser).subscribe(
      response => {
        console.log(response);
        this.router.navigate(["/dashboard"])
        localStorage.removeItem("warn")
        this.loadingConfirmOrNot = false
      }, err => {
        console.error(err);
        this.loadingConfirmOrNot = false
      }
    )
  }
}
