import { Routes } from '@angular/router';
import { LogInFormComponent } from './components/log-in-form/log-in-form.component';
import { AuthGuardService } from './services/auth-guard.service';
import { UserDataComponent } from './components/private/interface/user/user-data/user-data.component';
import { PersonalInfoComponent } from './components/private/interface/user/user-data/personal-info/personal-info.component';
import { SecurityComponent } from './components/private/interface/user/user-data/security/security.component';
import { RecoveryKeyComponent } from './components/private/interface/user/user-data/security/recovery-key/recovery-key.component';
import { DashboardComponent } from './components/private/interface/user/user-data/security/dashboard/dashboard.component';
import { DashboardPrivacityComponent } from './components/private/interface/user/user-data/privacity/dashboard-privacity/dashboard-privacity.component';
import { PasswordComponent } from './components/private/interface/user/user-data/security/password/password.component';
import { SetSecurityMeasuresComponent } from './components/private/interface/user/user-data/security/set-security-measures/set-security-measures.component';
import { ConfirmChangesTwoFaComponent } from './components/private/interface/user/user-data/security/confirm-changes-two-fa/confirm-changes-two-fa.component';
import { SuspiciousLoginsComponent } from './components/private/interface/user/user-data/security/suspicious-logins/suspicious-logins.component';
import { LogsComponent } from './components/private/interface/user/user-data/logs/logs.component';
import { PrivacityComponent } from './components/private/interface/user/user-data/privacity/privacity.component';
import { AddEnterpriseComponent } from './components/private/interface/enterprise/add-enterprise/add-enterprise.component';
import { AddSustainabilityDataComponent } from './components/private/interface/enterprise/add-enterprise/add-sustainability-data/add-sustainability-data.component';
import { UnitMeasuresComponent } from './components/private/interface/enterprise/add-enterprise/add-sustainability-data/unit-measures/unit-measures.component';
import { CertificationsAccomplishedComponent } from './components/private/interface/enterprise/add-enterprise/add-sustainability-data/certifications-accomplished/certifications-accomplished.component';
import { AddSustainableObjectivesComponent } from './components/private/interface/enterprise/add-enterprise/add-sustainability-data/add-sustainable-objectives/add-sustainable-objectives.component';
import { DashboardGenericComponent } from './components/private/interface/enterprise/dashboard-generic/dashboard-generic.component';
import { DashboardFinanceComponent } from './components/private/interface/finances/dashboard-finance/dashboard-finance.component';
import { financeRoutes } from './finance.routes';
import { ViewItemComponent } from './components/private/interface/finances/dashboard-finance/last-registers/view-item/view-item.component';
import { FinancesComponent } from './components/private/interface/finances/finances.component';
import { RrhhComponent } from './components/private/interface/rrhh/rrhh.component';
import { LiquidationsComponent } from './components/private/interface/rrhh/rrhh-module-load/liquidations/liquidations.component';
import { AssistsComponent } from './components/private/interface/rrhh/rrhh-module-load/assists/assists.component';
import { AccidentsComponent } from './components/private/interface/rrhh/rrhh-module-load/accidents/accidents.component';
import { EmployeesComponent } from './components/private/interface/rrhh/rrhh-module-load/employees/employees.component';
import { rrhhRoutes } from './rrhh.routes';
import { DashboardEmployeesComponent } from './components/private/interface/rrhh/dashboard-employees/dashboard-employees.component';

export const privateRoutes: Routes = [
    {
        path: "my-user", component: UserDataComponent, canActivate: [AuthGuardService], children: [
            {
                path: "security", component: SecurityComponent, canActivate: [AuthGuardService], children: [
                    { path: "recovery-key", component: RecoveryKeyComponent, canActivate: [AuthGuardService] },
                    { path: "password", component: PasswordComponent, canActivate: [AuthGuardService] },
                    { path: "confirm-change", component: ConfirmChangesTwoFaComponent, canActivate: [AuthGuardService] },
                    { path: 'set-security-measures', component: SetSecurityMeasuresComponent, canActivate: [AuthGuardService] },
                    { path: 'suspicious-logins', component: SuspiciousLoginsComponent, canActivate: [AuthGuardService] },
                    { path: "**", component: DashboardComponent, canActivate: [AuthGuardService] },
                ]

            },
            {
                path: "privacity", component: PrivacityComponent, canActivate: [AuthGuardService], children: [
                    { path: "**", component: DashboardPrivacityComponent, canActivate: [AuthGuardService] }
                ]
            },
            { path: 'logs', component: LogsComponent, canActivate: [AuthGuardService] },
            { path: "**", component: PersonalInfoComponent, canActivate: [AuthGuardService] },
            { path: "personal-info", component: PersonalInfoComponent, canActivate: [AuthGuardService] }
        ]
    },
    { path: "add-enterprise", component: AddEnterpriseComponent, canActivate: [AuthGuardService] },
    {
        path: "add-sustainability-enterprise", component: AddSustainabilityDataComponent, canActivate: [AuthGuardService], children: [
            { path: "unit-measures", component: UnitMeasuresComponent, canActivate: [AuthGuardService] },
            { path: "certifications-accomplished", component: CertificationsAccomplishedComponent, canActivate: [AuthGuardService] },
            { path: "add-sustainable-objectives", component: AddSustainableObjectivesComponent, canActivate: [AuthGuardService] }
        ]
    },
    { path: 'finances', component: FinancesComponent, canActivate: [AuthGuardService], children: financeRoutes },
    {
        path: 'rrhh', component: RrhhComponent, canActivate: [AuthGuardService], children: rrhhRoutes
    },
    { path: "my-enterprise", component: DashboardGenericComponent, canActivate: [AuthGuardService] },
    { path: 'employees', component: DashboardEmployeesComponent, canActivate: [AuthGuardService] },
    { path: "**", component: DashboardGenericComponent, canActivate: [AuthGuardService] }
];
