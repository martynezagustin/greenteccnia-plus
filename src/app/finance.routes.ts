import { Routes } from "@angular/router";
import { AuthGuardService } from "./services/auth-guard.service";
import { ViewItemComponent } from "./components/private/interface/finances/dashboard-finance/last-registers/view-item/view-item.component";
import { DashboardFinanceComponent } from "./components/private/interface/finances/dashboard-finance/dashboard-finance.component";
import { CompleteDashboardComponent } from "./components/private/interface/finances/complete-dashboard/complete-dashboard.component";
import { ViewMoreLastRegistersComponent } from "./components/private/interface/finances/dashboard-finance/last-registers/view-more-last-registers/view-more-last-registers.component";
import { ViewMoreLastItemsComponent } from "./components/private/interface/finances/complete-dashboard/last-items/view-more-last-items/view-more-last-items.component";

export const financeRoutes: Routes = [
    { path: 'view-item', component: ViewItemComponent, canActivate: [AuthGuardService] },
    { path: 'dashboard-elements', component: CompleteDashboardComponent, canActivate: [AuthGuardService] },
    {
        path: 'last-registers', component: ViewMoreLastRegistersComponent, canActivate: [AuthGuardService]
    },
    { path: 'view-all-last-items', component: ViewMoreLastItemsComponent, canActivate: [AuthGuardService] },
    { path: '**', component: DashboardFinanceComponent, canActivate: [AuthGuardService] }
]