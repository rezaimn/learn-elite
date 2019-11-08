import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LandingComponent} from "./landing.component";

const routes: Routes = [
    {
        path: '',
        component: LandingComponent,
        children: [
            { path: '', loadChildren: './main/main.module#MainModule' },
            { path: 'login', loadChildren: './login/login.module#LoginModule' },
            { path: 'reset-password', loadChildren: './reset-password/reset-password.module#ResetPasswordModule' },
            { path: 'signup', loadChildren: './signup/signup.module#SignupModule' },
            { path: 'not-found', loadChildren: './not-found/not-found.module#NotFoundModule' },
            { path: 'server-error', loadChildren: './server-error/server-error.module#ServerErrorModule' },
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class LandingRoutingModule {}
