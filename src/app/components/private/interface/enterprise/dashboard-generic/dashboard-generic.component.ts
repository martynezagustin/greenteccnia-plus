import { Component, OnInit } from '@angular/core';
import { User } from '../../../../../../interfaces/user/user.interface';
import { Enterprise } from '../../../../../../interfaces/enterprise/enterprise.interface';
import { UserService } from '../../../../../services/private/user/user.service';
import { EnterpriseService } from '../../../../../services/private/enterprise/enterprise.service';
import { CashFlowComponent } from './cash-flow/cash-flow.component';
import { NetWorthComponent } from './net-worth/net-worth.component';
import { RouterLink } from '@angular/router';
import { RrhhSummaryComponent } from "./rrhh-summary/rrhh-summary.component";

@Component({
  selector: 'app-dashboard-generic',
  imports: [CashFlowComponent, NetWorthComponent, RouterLink, RrhhSummaryComponent],
  templateUrl: './dashboard-generic.component.html',
  styleUrl: './dashboard-generic.component.css'
})
export class DashboardGenericComponent implements OnInit {
  user!: User
  userId: any = ''
  enterprise!: Enterprise
  enterpriseId: any = ''
  errorMessageEnterprise: string = ''
  loading: boolean = false
  constructor(private userService: UserService, private enterpriseService: EnterpriseService) {
    this.userId = this.userService.getUserId()
  }
  ngOnInit(): void {
    this.getUser()
  }
  getUser() {
    this.loading = true
    this.userService.getUserInfo(this.userId).subscribe(
      response => {
        this.user = response
        this.getEnterprise()
        this.loading = false
      },
      err => {
        console.error(err);
        this.loading = false
      }
    )
  }
  getEnterprise() {
    this.errorMessageEnterprise = ''
    this.enterpriseService.getEnterprise(this.user.enterprise).subscribe(
      response => {
        this.enterprise = response
        this.loading = false
        this.errorMessageEnterprise = ''
      },
      () => {
        this.errorMessageEnterprise = 'Aún no has creado tu empresa.'
        this.loading = false
      }
    )
  }
}
