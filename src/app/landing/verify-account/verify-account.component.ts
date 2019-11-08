import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {APIService} from "../../shared/services/API-Service";

@Component({
    selector: 'app-verify-account',
    templateUrl: './verify-account.component.html',
    styleUrls: ['./verify-account.component.scss']
})
export class VerifyAccountComponent implements OnInit {
    constructor(private route: ActivatedRoute ,private apiService:APIService,private router:Router) {

    }
    order: string;
    ngOnInit() {

       let params={
           "randomKey":this.route.snapshot.queryParamMap.get('randomKey'),
           "id":this.route.snapshot.queryParamMap.get('id')
       }
            this.apiService.postAuth('v1/users/verify-account',params).subscribe(
                (res:any)=>{
                    this.router.navigate(['/home/login']);
                }
            )

    }
}
