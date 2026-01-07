import { Routes } from "@angular/router";
import { GeneralPanelComponent } from "./components/private/interface/rrhh/dashboard-employees/general-panel/general-panel.component";
import { AuthGuardService } from "./services/auth-guard.service";
import { ObjectivesAndAccomplishedComponent } from "./components/private/interface/rrhh/dashboard-employees/objectives-and-accomplished/objectives-and-accomplished.component";
import { SatisfactionPanelComponent } from "./components/private/interface/rrhh/dashboard-employees/satisfaction-panel/satisfaction-panel.component";

export const employeesRoutes: Routes = [
    {path: 'general-panel', component: GeneralPanelComponent, canActivate: [AuthGuardService]},
    {path: 'objectives-and-accomplishment', component: ObjectivesAndAccomplishedComponent, canActivate: [AuthGuardService]},
    {path: 'satisfaction', component: SatisfactionPanelComponent, canActivate: [AuthGuardService]},
    {path: '**', component: GeneralPanelComponent, canActivate: [AuthGuardService]}
]