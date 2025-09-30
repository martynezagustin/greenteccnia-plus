import { Routes } from "@angular/router";
import { AuthGuardService } from "./services/auth-guard.service";
import { EmployeesComponent } from "./components/private/interface/rrhh/rrhh-module-load/employees/employees.component";
import { LiquidationsComponent } from "./components/private/interface/rrhh/rrhh-module-load/liquidations/liquidations.component";
import { AssistsComponent } from "./components/private/interface/rrhh/rrhh-module-load/assists/assists.component";
import { AccidentsComponent } from "./components/private/interface/rrhh/rrhh-module-load/accidents/accidents.component";

export const rrhhRoutes: Routes = [
    { path: 'employees', component: EmployeesComponent, canActivate: [AuthGuardService] },
    { path: 'liquidations', component: LiquidationsComponent, canActivate: [AuthGuardService] },
    { path: 'assists', component: AssistsComponent, canActivate: [AuthGuardService] },
    { path: 'accidents', component: AccidentsComponent, canActivate: [AuthGuardService] },
    { path: '**', component: EmployeesComponent, canActivate: [AuthGuardService] }
]