import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { UserService } from '../../../../../services/private/user/user.service';
import { User } from '../../../../../../interfaces/user/user.interface';
import { FormBuilder, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'security-panel',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './security-panel.component.html',
  styleUrls: ['./security-panel.component.css', '../grids.css', "../custom-ux.css"]
})
export class SecurityPanelComponent implements OnInit {
  isChecked!: Boolean;
  @Input() user!: User
  @Input() isMontserrat!: boolean
  @Input() isPoppins!: boolean
  @Input() roundedButtons!: boolean
  @Input() squareButtons!: boolean
  @Input() isMonochrome!: boolean
  //para colores y backgrounds
  @Input() isDark!: boolean
  @Input() isLight!: boolean
  userId: any = ''
  //mensajes
  errorMessage: String = ''
  successMessage: String = ''

  constructor(private userService: UserService) {
    this.userId = this.userService.getUserId()
  }
  ngOnInit(): void {
    this.isChecked = this.user.security.twoFA.twoFAActived
  }
}
