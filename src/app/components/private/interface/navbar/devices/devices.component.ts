import { Component, Input } from '@angular/core';
import { Device } from '../../../../../../interfaces/security/devices/device.interface';
import { DateDevicePipe } from '../../../../../pipes/date-device.pipe';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'devices',
  imports: [DateDevicePipe, CommonModule],
  templateUrl: './devices.component.html',
  styleUrls: ['./devices.component.css', '../grids.css', "../custom-ux.css"]
})
export class DevicesComponent {
  @Input() devices: Device[] = []
  @Input() isMontserrat!: boolean
  @Input() isPoppins!: boolean
  @Input() isDark!: boolean
  @Input() isLight!: boolean
  @Input() roundedButtons!: boolean
  @Input() squareButtons!: boolean
  @Input() isMonochrome!: boolean
}
