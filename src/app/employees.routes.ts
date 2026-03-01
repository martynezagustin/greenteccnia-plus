import { Routes } from "@angular/router";
import { GeneralPanelComponent } from "./components/private/interface/rrhh/dashboard-employees/general-panel/general-panel.component";
import { AuthGuardService } from "./services/auth-guard.service";
import { SatisfactionPanelComponent } from "./components/private/interface/rrhh/dashboard-employees/satisfaction-panel/satisfaction-panel.component";
import { DashboardObjectivesComponent } from "./components/private/interface/rrhh/dashboard-employees/objectives-and-accomplished/dashboard-objectives/dashboard-objectives.component";

export const employeesRoutes: Routes = [
    {path: 'general-panel', component: GeneralPanelComponent, canActivate: [AuthGuardService]},
    {path: 'objectives-and-accomplishment', component: DashboardObjectivesComponent, canActivate: [AuthGuardService]},
    {path: 'satisfaction', component: SatisfactionPanelComponent, canActivate: [AuthGuardService]},
    {path: '**', component: GeneralPanelComponent, canActivate: [AuthGuardService]}
]