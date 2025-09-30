import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { UserService } from '../../../../../../services/private/user/user.service';
import { LogsDataService } from '../../../../../../services/private/user/security/logsData/logs-data.service';
import { LogUser } from '../../../../../../../interfaces/security/logsUser/logUser.interface';
import { CommonModule } from '@angular/common';
import { DateDevicePipe } from '../../../../../../pipes/date-device.pipe';

@Component({
  selector: 'app-logs',
  imports: [RouterLink, CommonModule, DateDevicePipe],
  templateUrl: './logs.component.html',
  styleUrls: ['./logs.component.css', "../security/security.component.css"]
})
export class LogsComponent implements OnInit {
  userId: any
  logs!: LogUser[]
  loading!: Boolean
  constructor(private userService: UserService, private logsDataService: LogsDataService) {
    this.userId = this.userService.getUserId()
  }
  ngOnInit(): void {
    this.getLogs()
  }
  getLogs() {
    this.loading = true
    this.logsDataService.getLogs(this.userId).subscribe(
      response => { 
        this.logs = response.reverse(), 
        this.loading = false

       },
      err => console.error(err)
    )
  }
}
