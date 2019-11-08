import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import {LocalStorageService, SessionStorage, SessionStorageService} from 'ngx-webstorage';
import {SignupModel} from "./signup-model";
import {APIService} from "../../shared/services/API-Service";
import {Router} from "@angular/router";

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.scss'],
    animations: [routerTransition()]
})
export class SignupComponent implements OnInit {
    constructor(private apiService:APIService,public router: Router) {}
    public signUpModel:SignupModel=new SignupModel({});
    myStyle: object = {};
    myParams: object = {};
    width: number = 100;
    height: number = 100;
    @SessionStorage('currentPage')
    public currentPage='landing-login';
    ngOnInit() {
    }
    signUp(){
        this.apiService.postAuth('v1/users/register',this.signUpModel).subscribe(
            (res:any)=>{
                if(res.status==200){
                    this.router.navigate(['/home']);
                }

            }
        )
    }
}
