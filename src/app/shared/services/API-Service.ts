import {Injectable} from '@angular/core';
import {Headers, Http, RequestOptions, Response} from '@angular/http';
import {Router} from "@angular/router";
import {GlobalVariables} from "./globalVariables";
import {HttpClient} from "@angular/common/http";
import {catchError, map} from "rxjs/internal/operators";
import {Observable} from "rxjs/index";
import {environment} from "../../../environments/environment";
import {SessionStorage} from "ngx-webstorage";
import {ErrorMessageService} from "./error-message-service";
import {error} from "util";


@Injectable()
export class APIService {
    @SessionStorage('token')
    public token;
    isDeveloping = "";
    //  headers = new Headers({'Content-Type': 'application/json'});
    headerDict = {
        'Authorization': 'Jwt ' + this.token,
        'Content-Type': 'application/json'
    }
    simpleHeader = {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache'
    }
    requestOptions = {};

    constructor(private errorMassageService: ErrorMessageService, private  httpClient: HttpClient, private router: Router, private globalVariables: GlobalVariables) {
        if (this.globalVariables.isDevelopingMode) {
            this.isDeveloping = "/api";
        }

        this.requestOptions = {
            headers: new Headers(this.headerDict),
        };
       // console.log(this.token);
    }

    getToken() {
        let header = {
            'Authorization': 'Jwt ' + this.token
        }
        return header;
    }
    ///////////////////////////////admin
    getAdmin(url: string) {
        //console.log(this.headerDict);
        return this.httpClient.get(environment.v2 + url, {headers: this.simpleHeader}) .pipe(
            map( response => {
                return response;
            }),
            catchError( error => {
                this.errorMassageService.Error("Failed To Get Data. ");
                return Observable.throw(error);
            })
        );


    }

    postAdmin(url: string, body: any) {
        //console.log(body);
        return this.httpClient.post(environment.v2 + url, body, {headers: this.simpleHeader}) .pipe(
            map( response => {
                this.errorMassageService.Success("Data Successfully Added.");
                return response;
            }),
            catchError( error => {
                this.errorMassageService.Error("Failed To Add Data.");
                return Observable.throw(error);
            })
        );
    }

    putAdmin(url: string, body: any) {
        return this.httpClient.put(environment.v2 + url, body, {headers: this.simpleHeader}) .pipe(
            map( response => {
                this.errorMassageService.Success("Data Successfully Updated.");
                return response;
            }),
            catchError( error => {
                this.errorMassageService.Error("Failed To Update Data.");
                return Observable.throw(error);
            })
        );
    }

    deleteAdmin(url: string) {
        return this.httpClient.delete(environment.v2 + url, {headers: this.simpleHeader}) .pipe(
            map( response => {
                this.errorMassageService.Success("Data Successfully Deleted.");
                return response;
            }),
            catchError( error => {
                this.errorMassageService.Error("Failed To Dalete Data.");
                return Observable.throw(error);
            })
        );
    }

    ///////////////////////////////////user
    getUser(url: string) {
        //console.log(this.getToken());
        return this.httpClient.get(environment.v2 + url, {headers: this.getToken()}) .pipe(
            map( response => {
                return response;
            }),
            catchError( error => {
                if(error.status==401){
                    this.errorMassageService.Error("Your Token Has Been Expired. Please Login Again.");
                    this.router.navigate(['/home/login']);
                }else{
                    this.errorMassageService.Error("Failed To Get Data.");
                }


                return Observable.throw(error);
            })
        );

    }

    postUser(url: string, body: any) {
        return this.httpClient.post(environment.v2 + url, body, {headers: this.getToken()}) .pipe(
            map( response => {
                this.errorMassageService.Success("Data Successfully Added.");
                return response;
            }),
            catchError( error => {
                if(error.status==401){
                    this.errorMassageService.Error("Your Token Has Been Expired. Please Login Again.");
                    this.router.navigate(['/home/login']);
                }else{
                    this.errorMassageService.Error("Failed To Get Data.");
                }
                return Observable.throw(error);
            })
        );
    }

    putUser(url: string, body: any) {
        return this.httpClient.put(environment.v2 + url, body, {headers: this.getToken()}) .pipe(
            map( response => {
                this.errorMassageService.Success("Data Successfully Updated.");
                return response;
            }),
            catchError( error => {
                if(error.status==401){
                    this.errorMassageService.Error("Your Token Has Been Expired. Please Login Again.");
                    this.router.navigate(['/home/login']);
                }else{
                    this.errorMassageService.Error("Failed To Get Data.");
                }
                return Observable.throw(error);
            })
        );

    }

    deleteUser(url: string) {
        return this.httpClient.delete(environment.v2 + url, {headers: this.getToken()}) .pipe(
            map( response => {
                this.errorMassageService.Success("Data Successfully Deleted.");
                return response;
            }),
            catchError( error => {
                if(error.status==401){
                    this.errorMassageService.Error("Your Token Has Been Expired. Please Login Again.");
                    this.router.navigate(['/home/login']);
                }else{
                    this.errorMassageService.Error("Failed To Get Data.");
                }
                return Observable.throw(error);
            })
        );
    }

    /////////////////////////////////settings
    getAuth(url: string) {
       // console.log(this.headerDict);
        return this.httpClient.get(environment.v1 + url, {headers: this.headerDict});
    }

    postAuth(url: string, body: any) {
        return this.httpClient.post(environment.v1 + url, body) .pipe(
            map( (response:any) => {
                if(response.status==400){
                    this.errorMassageService.Error(response.message);
                }
                else{
                    if(url.includes('register')){
                        this.errorMassageService.Success("You Are Successfully Registered. Please Check Your Email To Verify Your Account.");
                    }else{
                        this.errorMassageService.Success(response.message);
                    }

                }

                return response;
            }),
            catchError( error => {
                this.errorMassageService.Error("Failed To Add Data.");
                return Observable.throw(error);
            })
        );
    }

    putAuth(url: string, body: any) {
        return this.httpClient.put(environment.v1 + url, body);
    }

    deleteAuth(url: string) {
        return this.httpClient.delete(environment.v1 + url);
    }

    ////////////////////////////////////auth
    login(url: string, body: any): Observable<any> {
        return this.httpClient.post(environment.v2 + url, body) .pipe(
            map( (response:any) => {
                if(response.status==400){
                    this.errorMassageService.Error(response.message);
                }
                return response;
            }),
            catchError( error => {
                this.errorMassageService.Error("Failed To Login.");
                return Observable.throw(error);
            })
        );
    }

    logout(url: string, body: any) {
        return this.httpClient.post(this.isDeveloping + url, body);
    }


}
