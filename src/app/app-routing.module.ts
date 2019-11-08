import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {AppComponent} from './app.component';
import {AuthGuard} from './shared';
import {VerifyAccountComponent} from "./landing/verify-account/verify-account.component";

const routes: Routes = [
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
    },
    {
        path: 'home',
        loadChildren: './landing/landing.module#LandingModule'
    },
    {
        path: 'manage',
        loadChildren: './layout/layout.module#LayoutModule',
        canActivate: [AuthGuard],
        data: {
            role:'manager'
        }
    },
    {
        path: 'admin',
        loadChildren: './super-admin/super-admin.module#SuperAdminModule',
        canActivate: [AuthGuard],
        data: {
            role:'admin'
        }
    },
    {
        path: 'users/verify-account',
        component: VerifyAccountComponent
    },
    {
        path: '**',
        redirectTo:'home'
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
