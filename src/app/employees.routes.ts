import { Routes } from "@angular/router";
import { GeneralPanelComponent } from "./components/private/interface/rrhh/dashboard-employees/general-panel/general-panel.component";
import { AuthGuardService } from "./services/auth-guard.service";

export const employeesRoutes: Routes = [
    {path: 'general-panel', component: GeneralPanelComponent, canActivate: [AuthGuardService]},
    {path: '**', component: GeneralPanelComponent, canActivate: [AuthGuardService]}
]