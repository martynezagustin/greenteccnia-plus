import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { User } from '../../../../../interfaces/user/user.interface';
import { Enterprise } from '../../../../../interfaces/enterprise/enterprise.interface';
import { Device } from '../../../../../interfaces/security/devices/device.interface';
import { AuthService } from '../../../../services/auth/auth.service';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SecurityPanelComponent } from "./security-panel/security-panel.component";
import { DevicesComponent } from "./devices/devices.component";
import { DataUserComponent } from "./data-user/data-user.component";
import { UxService } from '../../../../services/private/user/ux/ux.service';

@Component({
  selector: 'app-navbar',
  imports: [CommonModule, RouterLink, SecurityPanelComponent, DevicesComponent, DataUserComponent],
  standalone: true,
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css', './offcanvas.css', './grids.css', './custom-ux.css']
})
export class NavbarComponent implements OnChanges, OnInit {
  constructor(private authService: AuthService, private router: Router, private uxService: UxService) { }
  @Input() user!: User
  @Input() enterprise!: Enterprise
  @Input() devices: Device[] = []
  @Input() userId: any
  @Input() loading!: Boolean
  @Input() errorMessage!: String
  //para colores y backgrounds
  isLight: boolean = true
  isDark: boolean = false
  isMonochrome: boolean = false
  //para font families
  isMontserrat: boolean = true
  isPoppins: boolean = false
  roundedButtons: boolean = true
  squareButtons: boolean = false
  ngOnChanges(changes: SimpleChanges): void {
    if(changes["user"]){
      this.user = changes['user'].currentValue
    }
    if(changes["enterprise"]){
      console.log("Enterprise cambiado", changes['enterprise'].currentValue);
    }
    if(changes['errorMessage']){
      this.errorMessage = changes['errorMessage'].currentValue
      console.log(this.errorMessage)
    }
  }
  ngOnInit(): void {
    this.uxService.getUxOptions(this.userId).subscribe(
      response => {
        const darkTheme = response.uxOptions.darkMode
        const montserratFont = response.uxOptions.montserratFont
        const roundedButtons = response.uxOptions.roundedButtons
        const monochrome = response.uxOptions.monochrome
        this.isDark = darkTheme
        this.isLight = !darkTheme
        this.isMontserrat = montserratFont
        this.isPoppins = !montserratFont
        this.roundedButtons = roundedButtons
        this.squareButtons = !roundedButtons
        this.isMonochrome = monochrome
        if (this.isMonochrome) {
          this.isDark = false
          this.isLight = false
        }
      },
      err => {
        console.error(err);

      }
    )
  }
  logOut() {
    this.authService.logOut().subscribe(
      () => {
        localStorage.removeItem("userId")
        localStorage.removeItem("warn")
        this.router.navigate(["/log-in"])
      },
      err => {
        console.error(err);
      }
    )
  }
  // a continuacion, funciones para establecer personalizaciones de UX
  toggleDarkMode() {
    this.isDark = !this.isDark
    this.isLight = !this.isLight
    this.uxService.changeTheme(this.userId, this.isDark).subscribe(
      () => {
        return
      },
      err => {
        console.error(err);
      }
    )
  }
  toggleFontFamily() {
    this.isMontserrat = !this.isMontserrat
    this.isPoppins = !this.isPoppins
    this.uxService.changeFont(this.userId, this.isMontserrat).subscribe(
      () => {
        return
      },
      err => {
        console.error(err);
      }
    )
  }
  toggleRoundedButtons() {
    this.roundedButtons = !this.roundedButtons
    this.squareButtons = !this.squareButtons
    this.uxService.changeButtonsStyle(this.userId, this.roundedButtons).subscribe(
      response => {
        console.log(response)
      },
      err => {
        console.error(err);
      }
    )
  }
  toggleMonochrome() {
    this.isMonochrome = !this.isMonochrome
    if (this.isMonochrome === true) {
      this.isDark = false
      this.isLight = false
      this.uxService.setMonochrome(this.userId, this.isMonochrome).subscribe(
        response => {
          console.log(response)
        },
        err => {
          console.error(err);
        }
      )
    } else {
      this.isDark = true
      this.uxService.setMonochrome(this.userId, this.isMonochrome).subscribe(
        response => {
          this.uxService.changeTheme(this.userId, this.isDark).subscribe(
            () => {
              return
            }, err => {
              console.error(err);

            }
          )
        },
        err => {
          console.error(err);
        }
      )
    }
    console.log(this.isMonochrome)
  }
}
