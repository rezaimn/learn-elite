import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot} from '@angular/router';
import { Router } from '@angular/router';
import {SessionStorage} from "ngx-webstorage";
import {Observable} from "rxjs/index";

@Injectable()
export class AuthGuard implements CanActivate {
    @SessionStorage('loggedIn')
    public userIsLoggedIn;
    @SessionStorage('isAdmin')
    public isAdmin;
    @SessionStorage('isManager')
    public isManager;
    constructor(private router: Router) {}

    canActivate(route: ActivatedRouteSnapshot,
                state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean  {
        if (this.userIsLoggedIn && route.data.role=='manager' && this.isManager) {
            return true;
        }
        if (this.userIsLoggedIn && route.data.role=='admin' && this.isAdmin) {
            return true;
        }
        this.router.navigate(['/login']);
        return false;
    }
}
