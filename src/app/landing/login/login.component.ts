import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { routerTransition } from '../../router.animations';
import {LoginModel} from "./login-model";
import {APIService} from "../../shared/services/API-Service";
import {LocalStorageService, SessionStorage, SessionStorageService} from 'ngx-webstorage';
@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    animations: [routerTransition()]
})
export class LoginComponent implements OnInit {
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
    public loggedInUser={name:''};
    @SessionStorage('isAdmin')
    public isAdmin;
    @SessionStorage('isManager')
    public isManager;
    @SessionStorage('token')
    public token;
    ngOnInit() {
        // this.myStyle = {
        //     'position': 'fixed',
        //     'width': '100%',
        //     'height': '100%',
        //     'background':'#fed36d',
        //     'z-index': -1,
        //     'top': 0,
        //     'left': 0,
        //     'right': 0,
        //     'bottom': 0,
        // };
        //
        // this.myParams = {
        //     particles: {
        //         number: {
        //             value: 200,
        //         },
        //         color: {
        //             value: '#efefef'
        //         },
        //         shape: {
        //             type: 'circle',
        //         },
        //     }
        // };
    }

    onLoggedin() {
            this.apiService.login('v2/user/login/',this.loginObject)
                .subscribe(
                    restItems => {
                        //console.log(restItems);
                        if(restItems.token){
                            if(this.loginObject.username=='admin'){
                                this.loggedInUser={name:"Admin"};
                                this.isAdmin=true;
                                this.isManager=false;
                                this.router.navigate(['/admin/dashboard']);
                                this.userIsLoggedIn=true;
                                this.token=restItems.token;
                            }
                            else {
                                this.loggedInUser={name:this.loginObject.username};
                                this.isManager=true;
                                this.userIsLoggedIn=true;
                                this.isAdmin=false;
                                this.router.navigate(['/manage/dashboard']);
                                this.token=restItems.token;
                            }
                        }


                    }
                )



        // this.loggedInUser={};
    }
}
