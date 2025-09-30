import { Component, Input, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { User } from '../../../../../../interfaces/user/user.interface';
import { UserService } from '../../../../../services/private/user/user.service';

@Component({
  selector: 'app-user-data',
  imports: [RouterOutlet, RouterLink],
  templateUrl: './user-data.component.html',
  styleUrl: './user-data.component.css'
})
export class UserDataComponent implements OnInit {
  user!: User
  private userId: any = ''
  constructor(private userService: UserService) {
    this.userId = this.userService.getUserId()
  }
  ngOnInit(): void {
    this.getUserInfo()
  }
  getUserInfo() {
    this.userService.getUserInfo(this.userId).subscribe(
      response => {
        this.user = response
      }, err => {
        console.error(err);
      }
    )
  }
}
