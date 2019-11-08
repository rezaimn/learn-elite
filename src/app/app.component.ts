import { Component, OnInit } from '@angular/core';
import {LocalStorageService, SessionStorage, SessionStorageService} from 'ngx-webstorage';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    // @SessionStorage('loggedIn')
    // public userIsLoggedIn;
    // @SessionStorage('loggedInUser')
    // public loggedInUser={name:''};
    // @SessionStorage('isAdmin')
    // public isAdmin;
    // @SessionStorage('isManager')
    // public isManager;
    constructor() {
        // this.isManager=false;
        // this.isAdmin=false;
    }

    ngOnInit() {
    }
    collapedSideBar: boolean;
    receiveCollapsed($event) {
        this.collapedSideBar = $event;
    }
}
