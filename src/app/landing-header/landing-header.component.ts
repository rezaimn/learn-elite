import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import {LocalStorageService, SessionStorage, SessionStorageService} from 'ngx-webstorage';

@Component({
    selector: 'app-landing-header',
    templateUrl: './landing-header.component.html',
    styleUrls: ['./landing-header.component.scss']
})
export class LandingHeaderComponent implements OnInit {
    pushRightClass: string = 'push-right';
    @SessionStorage('loggedIn')
    public userIsLoggedIn;
    @SessionStorage('currentPage')
    public currentPage;
    @SessionStorage('loggedInUser')
    public loggedInUser;
    @SessionStorage('isAdmin')
    public isAdmin;
    @SessionStorage('isManager')
    public isManager;
    @SessionStorage('token')
    public token;
    constructor(private translate: TranslateService,
                private sessionStorageService : SessionStorageService,
                public router: Router) {
//console.log("oooooooooooooooooooooooooooooo",this.isManager,this.isAdmin);
        this.router.events.subscribe(val => {

            if (
                val instanceof NavigationEnd &&
                window.innerWidth <= 992 &&
                this.isToggled()
            ) {
                this.toggleSidebar();
            }
        });
    }
    urlContainsManage(){
        let url=this.router.url;
        if(url.includes('manage')){
            return true;
        }else{
            return false;
        }
    }
    urlContainsNothing(){
        let url=this.router.url;
        // console.log(url);
        if(url=='/'){
            return true;
        }else{
            return false;
        }
    }
    urlContainsAdmin(){
        let url=this.router.url;

        if(url.includes('admin')){

            return true;
        }else{
            return false;
        }
    }
    ngOnInit() {}

    isToggled(): boolean {
        const dom: Element = document.querySelector('body');
        return dom.classList.contains(this.pushRightClass);
    }

    toggleSidebar() {
        const dom: any = document.querySelector('body');
        dom.classList.toggle(this.pushRightClass);
    }

    rltAndLtr() {
        const dom: any = document.querySelector('body');
        dom.classList.toggle('rtl');
    }

    onLoggedout() {
        this.loggedInUser={name:''};
        this.userIsLoggedIn=false;
        this.isAdmin=false;
        this.isManager=false;
        this.token="";
    }
    changeLang(language: string) {
        this.translate.use(language);
    }
}
