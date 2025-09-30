import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { User } from '../../../../../../../../../interfaces/user/user.interface';
import { Device } from '../../../../../../../../../interfaces/security/devices/device.interface';
import { DeviceService } from '../../../../../../../../services/private/user/device/device.service';
import { DateDevicePipe } from '../../../../../../../../pipes/date-device.pipe';

@Component({
  selector: 'app-registered-devices',
  imports: [DateDevicePipe],
  templateUrl: './registered-devices.component.html',
  styleUrl: '../../security.component.css'
})
export class RegisteredDevicesComponent implements OnChanges, OnInit {
  @Input() loading!: Boolean
  @Input() user!: User
  @Input() userId: any = ''
  //dispositivos
  devices: Device[] = []
  constructor(private deviceService: DeviceService){}
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['devices']) {
      this.devices = changes['devices'].currentValue
      console.log(this.devices)
    }
  }
  ngOnInit(): void {
    this.getDevices()
  }
  getDevices() {
    this.deviceService.getDevices(this.userId).subscribe(
      response => {
        this.devices = response
        console.log("Dispositivos:",this.devices)
      },
      err => {
        console.error(err);
      }
    )
  }
}
