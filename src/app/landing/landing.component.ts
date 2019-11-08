import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { routerTransition } from '../router.animations';
import {LocalStorageService, SessionStorage, SessionStorageService} from 'ngx-webstorage';

@Component({
    selector: 'app-landing',
    templateUrl: './landing.component.html',
    styleUrls: ['./landing.component.scss'],
    animations: [routerTransition()]
})
export class LandingComponent implements OnInit {
    @SessionStorage('currentPage')
    public currentPage='landing-home';
    constructor(public router: Router,private sessionStorageService : SessionStorageService) {
    }



    ngOnInit() {

    }

}
