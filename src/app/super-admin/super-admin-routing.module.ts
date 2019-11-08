import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SuperAdminComponent } from './super-admin.component';

const routes: Routes = [
    {
        path: '',
        component: SuperAdminComponent,
        children: [
            { path: 'dashboard', loadChildren: './admin-dashboard/admin-dashboard.module#AdminDashboardModule' },
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class SuperAdminRoutingModule {}
