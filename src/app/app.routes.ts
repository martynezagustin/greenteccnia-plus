import { Routes } from '@angular/router';
import { LogInFormComponent } from './components/log-in-form/log-in-form.component';
import { VerifyLoginComponent } from './components/verify-twoFA/verify-twoFA.component';
import { AuthGuardService } from './services/auth-guard.service';
import { privateRoutes } from './private.routes';
import { SingUpComponent } from './components/sing-up/sing-up.component';
import { InterfaceComponent } from './components/private/interface/interface.component';
import { TrustedDeviceComponent } from './components/private/trusted-device/trusted-device.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { LogInWithRecoveryKeyComponent } from './components/log-in-with-recovery-key/log-in-with-recovery-key.component';
import { FormToRescuePasswordComponent } from './components/forgot-password/form-to-rescue-password/form-to-rescue-password.component';
import { SetNewPasswordComponent } from './components/forgot-password/set-new-password/set-new-password.component';
import { VerifyRegisterComponent } from './components/verify-register/verify-register.component';
import { WelcomeGreenteccniaComponent } from './components/welcome-greenteccnia/welcome-greenteccnia.component';
import { DashboardEmployeesComponent } from './components/private/interface/rrhh/dashboard-employees/dashboard-employees.component';

export const routes: Routes = [
    { path: "log-in", component: LogInFormComponent },
    { path: "verify-2fa", component: VerifyLoginComponent },
    {path: "verify-register", component: VerifyRegisterComponent},
    {path: "forgot-password", component: ForgotPasswordComponent},
    {path: "rescue-password", component: FormToRescuePasswordComponent},
    {path: "log-in-with-recovery-key", component: LogInWithRecoveryKeyComponent},
    { path: "sing-up", component: SingUpComponent },
    { path: "dashboard", component: InterfaceComponent, canActivate: [AuthGuardService], children: privateRoutes },
    {path: 'confirm-device', component: TrustedDeviceComponent, canActivate: [AuthGuardService]},
    { path: "set-new-password", component: SetNewPasswordComponent, canActivate: [AuthGuardService] },
    {path: "welcome", component: WelcomeGreenteccniaComponent},
    { path: "**", component: LogInFormComponent }
];
