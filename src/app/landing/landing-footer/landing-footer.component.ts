import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import {LocalStorageService, SessionStorage, SessionStorageService} from 'ngx-webstorage';
@Component({
    selector: 'app-landing-footer',
    templateUrl: './landing-footer.component.html',
    styleUrls: ['./landing-footer.component.scss']
})
export class LandingFooterComponent implements OnInit {
    pushRightClass: string = 'push-right';
    @SessionStorage('currentPage')
    public currentPage;

    public userIsLoggedIn=false;
    constructor(private translate: TranslateService,
                public router: Router,
                private sessionStorageService : SessionStorageService) {
//console.log(this.currentPage);

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
        localStorage.removeItem('isLoggedin');
    }

    changeLang(language: string) {
        this.translate.use(language);
    }
}
