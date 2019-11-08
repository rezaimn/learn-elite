import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { routerTransition } from '../../router.animations';
import {LocalStorageService, SessionStorage, SessionStorageService} from 'ngx-webstorage';
import {ContactUs} from "./contact-us";
import {APIService} from "../../shared/services/API-Service";
import {error} from "@angular/compiler/src/util";
import {ErrorMessageService} from "../../shared/services/error-message-service";
@Component({
    selector: 'app-main',
    templateUrl: './main.component.html',
    styleUrls: ['./main.component.scss'],
    animations: [routerTransition()]
})
export class MainComponent implements OnInit {
    videoHeight=window.outerHeight;
    public contactUsModel:ContactUs=new ContactUs({});
    @SessionStorage('currentPage')
    public currentPage='landing-home';
    constructor(public router: Router,private apiService:APIService,private errorMessageService:ErrorMessageService) {

    }

    ngOnInit() {}
    contactUs(){
        this.apiService.postAuth('v1/users/contact-us',this.contactUsModel)
            .subscribe(
                restItems => {
                    this.contactUsModel=new ContactUs({})
                   // this.errorMassageService.Success('Data Sent Successfully.');
                },
                error=>{
                   // this.errorMassageService.Errors('Failed Send Data.');
                }
            )
    }
}
