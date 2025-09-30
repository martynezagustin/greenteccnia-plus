import { Component, Input } from '@angular/core';
import { User } from '../../../../../../interfaces/user/user.interface';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'data-user',
  imports: [CommonModule, RouterLink],
  templateUrl: './data-user.component.html',
  styleUrls: ['./data-user.component.css', "../grids.css", "../custom-ux.css"]
})
export class DataUserComponent {
  @Input() user!: User
  @Input() isMontserrat!: boolean
  @Input() isPoppins!: boolean
  @Input() isDark!: boolean
  @Input() isLight!: boolean
  @Input() roundedButtons!: boolean
  @Input() squareButtons!: boolean
  @Input() isMonochrome!: boolean
}
