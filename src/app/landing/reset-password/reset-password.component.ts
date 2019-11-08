import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { routerTransition } from '../../router.animations';
import {LoginModel} from "./reset-password-model";
import {APIService} from "../../shared/services/API-Service";
import {LocalStorageService, SessionStorage, SessionStorageService} from 'ngx-webstorage';
@Component({
    selector: 'app-reset-password',
    templateUrl: './reset-password.component.html',
    styleUrls: ['./reset-password.component.scss'],
    animations: [routerTransition()]
})
export class ResetPasswordComponent implements OnInit {
    constructor(public router: Router,private apiService:APIService,
                private sessionStorageService : SessionStorageService) {}
    public loginObject=new LoginModel({});
    myStyle: object = {};
    myParams: object = {};
    width: number = 100;
    height: number = 100;
    @SessionStorage('loggedIn')
    public userIsLoggedIn=false;
    @SessionStorage('currentPage')
    public currentPage='landing-login';
    @SessionStorage('loggedInUser')
    public loggedInUser={};
    ngOnInit() {
    //     this.myStyle = {
    //         'position': 'fixed',
    //         'width': '100%',
    //         'height': '100%',
    //         'background':'#fed36d',
    //         'z-index': -1,
    //         'top': 0,
    //         'left': 0,
    //         'right': 0,
    //         'bottom': 0,
    //     };
    //
    //     this.myParams = {
    //         particles: {
    //             number: {
    //                 value: 200,
    //             },
    //             color: {
    //                 value: '#efefef'
    //             },
    //             shape: {
    //                 type: 'circle',
    //             },
    //         }
    //     };
    }

    onLoggedin() {
         // this.apiService.login('/login',this.loginObject)
         //    .subscribe(
         //        restItems => {
         //            let res = restItems;
         //            console.log(res);
         //        }
         //    )
        this.loggedInUser={};
    }
}
