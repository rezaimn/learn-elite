import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './layout.component';

const routes: Routes = [
    {
        path: '',
        component: LayoutComponent,
        children: [
            { path: 'dashboard', loadChildren: './dashboard/dashboard.module#DashboardModule' },
            { path: 'payments', loadChildren: './payments/payments.module#PaymentsModule' },
            { path: 'profile', loadChildren: './profile/profile.module#ProfileModule' },
            { path: 'tasks', loadChildren: './task-generator/task-generator.module#TaskGeneratorModule' },
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class LayoutRoutingModule {}
