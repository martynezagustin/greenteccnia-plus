import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from "./navbar/navbar.component";
import { User } from '../../../../interfaces/user/user.interface';
import { UserService } from '../../../services/private/user/user.service';
import { Enterprise } from '../../../../interfaces/enterprise/enterprise.interface';
import { EnterpriseService } from '../../../services/private/enterprise/enterprise.service';
import { RouterOutlet } from '@angular/router';
import { DeviceService } from '../../../services/private/user/device/device.service';
import { Device } from '../../../../interfaces/security/devices/device.interface';
import { ShowNavbarService } from '../../../services/private/misc/show-navbar/show-navbar.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-interface',
  standalone: true,
  imports: [NavbarComponent, RouterOutlet, CommonModule],
  templateUrl: './interface.component.html',
  styleUrl: './interface.component.css'
})
export class InterfaceComponent implements OnInit {
  user!: User
  enterprise!: Enterprise
  devices: Device[] = []
  userId: any = ''
  loading: boolean = false
  errorMessage: String = ''
  constructor(private userService: UserService, private enterpriseService: EnterpriseService, private deviceService: DeviceService, private showNavbarService: ShowNavbarService) {
    this.userId = this.userService.getUserId()
  }
  ngOnInit(): void {
    this.getUserInfo()
  }
  getUserInfo() {
    this.userService.getUserInfo(this.userId).subscribe(
      response => {
        this.user = response
        this.getEnterprise()
        this.enterpriseService.enterprise$.subscribe(enterprise => {
          this.enterprise = enterprise!
        })
        this.getDevices()
      },
      err => {
        console.error(err);
      }
    )
  }
  getEnterprise() {
      this.enterpriseService.getEnterprise(this.user.enterprise).subscribe(
        response => {
          this.enterprise = response
          localStorage.setItem("enterpriseId", this.enterprise._id)
        },
        err => {
          this.errorMessage = err.error.message
        }
      )
  }
  getDevices() {
    this.deviceService.getDevices(this.userId).subscribe(
      response => {
        this.devices = response
      },
      err => {
        console.error(err);
      }
    )
  }
}
