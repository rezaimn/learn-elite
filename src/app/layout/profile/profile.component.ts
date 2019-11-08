import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import {ProfileModel} from "./profile-model";
import {APIService} from "../../shared/services/API-Service";

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss'],
    animations: [routerTransition()]
})
export class ProfileComponent implements OnInit {
    constructor(private apiService:APIService) {}
    public profileModel:ProfileModel=new ProfileModel({});
    ngOnInit() {
        this.getUserInfo();
    }
    getUserInfo(){
        this.apiService.getUser('/v2/user-dashboard/user-info/').subscribe(
            (res:any)=>{
                this.profileModel=res[0];
            }
        )
    }
    updateUserInfo(){
        let profileT=new ProfileModel(this.profileModel);
        delete profileT.username;
        delete profileT.email;
        delete profileT.firstname;
        delete profileT.lastname;
        this.apiService.putUser('v2/user-dashboard/user-info/'+profileT.id+'/',profileT).subscribe(
            (res:any)=>{

            }
        )
    }
}
