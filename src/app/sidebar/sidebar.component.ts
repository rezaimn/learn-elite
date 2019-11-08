import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import {Router, NavigationEnd, NavigationStart} from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import {LocalStorageService, SessionStorage, SessionStorageService} from 'ngx-webstorage';

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
    @SessionStorage('token')
    public token;
    isActive: boolean = false;
    collapsed: boolean = false;
    showMenu: string = '';
    pushRightClass: string = 'push-right';
    hideLandingSidebar=false;
    @Output() collapsedEvent = new EventEmitter<boolean>();
    @SessionStorage('loggedInUser')
    public loggedInUser;
    @SessionStorage('currentPage')
    public currentPage;

    @SessionStorage('loggedIn')
    public userIsLoggedIn;
    @SessionStorage('isAdmin')
    public isAdmin;
    @SessionStorage('isManager')
    public isManager;
    constructor(private translate: TranslateService, public router: Router) {
        this.router.events.subscribe(val => {
            if (
                val instanceof NavigationEnd &&
                window.innerWidth <= 992 &&
                this.isToggled()
            ) {
                this.toggleSidebar();
            }
            let url=this.router.url;

            if(window.innerWidth > 992 && (url.includes('manage') ||url.includes('admin'))){
                //console.log('side-menu-false');
               this.hideLandingSidebar=false;
            }
            if(window.innerWidth > 992 && !url.includes('manage') && !url.includes('admin') ){
               // console.log('side-menu-false');
                this.hideLandingSidebar=true;
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
    urlContainsAdmin(){
        let url=this.router.url;

        if(url.includes('admin')){

            return true;
        }else{
            return false;
        }
    }
    urlContainsNothing(){
        let url=this.router.url;
        // console.log(url);
        if(url=='/home'){
            return true;
        }else{
            return false;
        }
    }
    eventCalled() {
        this.isActive = !this.isActive;
    }

    addExpandClass(element: any) {
        if (element === this.showMenu) {
            this.showMenu = '0';
        } else {
            this.showMenu = element;
        }
    }

    toggleCollapsed() {
        this.collapsed = !this.collapsed;
        this.collapsedEvent.emit(this.collapsed);
    }

    isToggled(): boolean {
        //console.log("trueeeeeeeeeeeeee");
        const dom: Element = document.querySelector('body');
        return dom.classList.contains(this.pushRightClass);
    }

    toggleSidebar() {
       // console.log("toglllllllllllllle");
        const dom: any = document.querySelector('body');
        dom.classList.toggle(this.pushRightClass);
    }


    changeLang(language: string) {
        this.translate.use(language);
    }
    onLoggedout() {
        this.loggedInUser={name:''};
        this.userIsLoggedIn=false;
        this.isAdmin=false;
        this.isManager=false;
        this.token="";
    }
}
