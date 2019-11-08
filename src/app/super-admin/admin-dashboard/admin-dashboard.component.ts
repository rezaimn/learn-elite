import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import {ModalDismissReasons, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {Visitor,country,payments,Sales} from "./charts-model";
import {APIService} from "../../shared/services/API-Service";
import {GlobalVariables} from "../../shared/services/globalVariables";

@Component({
    selector: 'app-admin-dashboard',
    templateUrl: './admin-dashboard.component.html',
    styleUrls: ['./admin-dashboard.component.scss'],
    animations: [routerTransition()]
})
export class AdminDashboardComponent implements OnInit {
    closeResult: string;
    mode='add';
    countryDate;
    public deleteTarget='';
    public selectedDelete;
    public selectedDate={
        year:new Date().getFullYear(),
        month:new Date().getMonth()+1,
        day:new Date().getDate()
    };
    public selectedUserId;
    public allUsers=[];
    public allUserVisitors=[];
    public allUserPayments=[];
    public allUserSales=[];
    public allUserCountryVisits=[];
    public allUsersOrginal=[];
    public allUserVisitorsOrginal=[];
    public allUserPaymentsOrginal=[];
    public allUserSalesOrginal=[];
    public allUserCountryVisitsOrginal=[];
    public visitorModel=new Visitor({});
    public paymentModel=new payments({});
    public saleModel=new Sales({});
    public countryModel=new country({});
    open(content) {
        this.modalService.open(content).result.then((result) => {
            this.closeResult = `Closed with: ${result}`;
        }, (reason) => {
            this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        });
    }

    private getDismissReason(reason: any): string {
        if (reason === ModalDismissReasons.ESC) {
            return 'by pressing ESC';
        } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
            return 'by clicking on a backdrop';
        } else {
            return  `with: ${reason}`;
        }
    }
    defaultPagination: number;
    advancedPagination: number;
    visitorSelectedPage: number;
    paymentSelectedPage: number;
    saleSelectedPage: number;
    countrySelectedPage: number;
    userSelectedPage:number;
    disabledPagination: number;
    isDisabled: boolean;
    constructor(private modalService: NgbModal,
                private apiService:APIService,
                private globalVariables:GlobalVariables) {
        this.defaultPagination = 1;
        this.advancedPagination = 1;
        this.visitorSelectedPage=1;
        this.paymentSelectedPage=1;
        this.saleSelectedPage=1;
        this.countrySelectedPage=1;
        this.userSelectedPage=1;
        this.disabledPagination = 1;
        this.isDisabled = true;
    }
    ngOnInit() {
        this.getAllUsers();
        // this.tempDate = new Date().toISOString().split('T')[0];
        // console.log(this.tempDate);
    }
    getAllUsers(){
        this.apiService.getAdmin('v2/admin-dashboard/users/').subscribe(
            (res:any)=>{
               // console.log(res);
                this.allUsersOrginal= res;
                this.allUsers=this.globalVariables.setPageData(this.allUsersOrginal,1,5);
                this.userSelectedPage=1;
            }
        )
    }
    getAllSelectedUserVisitors(userId){
        this.resetVisitorForm();
        this.selectedUserId=userId;
        this.apiService.getAdmin('v2/admin-dashboard/visitors/?user_id='+userId).subscribe(
            (res:any)=>{
                this.allUserVisitorsOrginal=res;
                this.allUserVisitors=this.globalVariables.setPageData(this.allUserVisitorsOrginal,1,5);
                this.visitorSelectedPage=1;
            }
        )
    }
    getAllSelectedUserPayments(userId){
       this.resetPaymentForm();
        this.selectedUserId=userId;
        this.apiService.getAdmin('v2/admin-dashboard/payment/?user_id='+userId).subscribe(
            (res:any)=>{
                this.allUserPaymentsOrginal=res;
                this.allUserPayments=this.globalVariables.setPageData(this.allUserPaymentsOrginal,1,5);
                this.paymentSelectedPage=1;
            }
        )
    }
    getAllSelectedUserSales(userId){
        this.resetSaleForm();
        this.selectedUserId=userId;
        this.apiService.getAdmin('v2/admin-dashboard/sales/?user_id='+userId).subscribe(
            (res:any)=>{
                this.allUserSalesOrginal=res;
                this.allUserSales=this.globalVariables.setPageData(this.allUserSalesOrginal,1,5);
                this.saleSelectedPage=1;
            }
        )
    }
    getAllSelectedUserCountryVisits(userId){
        this.resetCountryForm();
        this.selectedUserId=userId;
        this.apiService.getAdmin('v2/admin-dashboard/country-visit/?user_id='+userId).subscribe(
            (res:any)=>{
                this.allUserCountryVisitsOrginal=res;
                this.allUserCountryVisits=this.globalVariables.setPageData(this.allUserCountryVisitsOrginal,1,5);
                this.countrySelectedPage=1;
            }
        )
    }
    dateConvertToSave(){
        let dateTemp='';
        let year=this.selectedDate.year.toString();
        let month='';
        if(this.selectedDate.month<10){
            month='0'+this.selectedDate.month.toString();
        }else{
            month=this.selectedDate.month.toString();
        }
        let day='';
        if(this.selectedDate.day<10){
            day='0'+this.selectedDate.day.toString();
        }else{
            day=this.selectedDate.day.toString();
        }
        dateTemp=year+'-'+month+'-'+day;
        return dateTemp;
    }
    addUpdateVisitor(mode:string){

        this.visitorModel.user_id= this.selectedUserId;
        this.visitorModel.date=this.dateConvertToSave();
        if(mode=='add'){
            delete this.visitorModel.visitId;
            this.apiService.postAdmin('v2/admin-dashboard/visitors/',this.visitorModel).subscribe(
                (res:any)=>{
                    this.getAllSelectedUserVisitors(this.selectedUserId);
                    this.resetVisitorForm();
                }
            )
        }
        if(mode=='edit') {
            this.apiService.putAdmin('v2/admin-dashboard/visitors/'+this.visitorModel.id+'/',this.visitorModel).subscribe(
                (res: any) => {
                    this.getAllSelectedUserVisitors(this.selectedUserId);
                    this.resetVisitorForm();
                }
            )
        }
    }
    resetVisitorForm(){
        this.mode='add';
        this.selectedDate={
            year:new Date().getFullYear(),
            month:new Date().getMonth()+1,
            day:new Date().getDate()
        }
        this.visitorModel=new Visitor({});
    }
    addUpdatePayment(mode:string){
        this.paymentModel.user_id= this.selectedUserId;
        this.paymentModel.date=this.dateConvertToSave();
        if(mode=='add'){
            delete this.paymentModel.paymentId;
            this.apiService.postAdmin('v2/admin-dashboard/payment/',this.paymentModel).subscribe(
                (res:any)=>{
                    this.getAllSelectedUserPayments(this.selectedUserId);
                    this.resetPaymentForm();
                }
            )
        }
        if(mode=='edit') {
            this.apiService.putAdmin('v2/admin-dashboard/payment/'+this.paymentModel.id+'/',this.paymentModel).subscribe(
                (res: any) => {
                    this.getAllSelectedUserPayments(this.selectedUserId);
                    this.resetPaymentForm();
                }
            )
        }
    }
    resetPaymentForm(){
        this.mode='add';
        this.selectedDate={
            year:new Date().getFullYear(),
            month:new Date().getMonth()+1,
            day:new Date().getDate()
        }
        this.paymentModel=new payments({});
    }
    addUpdateSale(mode:string){
        this.saleModel.user_id= this.selectedUserId;
        this.saleModel.date=this.dateConvertToSave();
        if(mode=='add'){
            delete this.saleModel.saleId;
            this.apiService.postAdmin('v2/admin-dashboard/sales/',this.saleModel).subscribe(
                (res:any)=>{
                    this.getAllSelectedUserSales(this.selectedUserId);
                    this.resetSaleForm();
                }
            )
        }
        if(mode=='edit') {
            this.apiService.putAdmin('v2/admin-dashboard/sales/'+this.saleModel.id+'/',this.saleModel).subscribe(
                (res: any) => {
                    this.getAllSelectedUserSales(this.selectedUserId);
                    this.resetSaleForm();
                }
            )
        }

    }
    resetSaleForm(){
        this.mode='add';
        this.selectedDate={
            year:new Date().getFullYear(),
            month:new Date().getMonth()+1,
            day:new Date().getDate()
        }
        this.saleModel=new Sales({});
    }
    addUpdateCountry(mode:string){
        this.countryModel.user_id= this.selectedUserId;
        this.countryModel.date=this.countryDate+'-01';
        if(mode=='add'){
            delete this.countryModel.visitId;
            this.apiService.postAdmin('v2/admin-dashboard/country-visit/',this.countryModel).subscribe(
                (res:any)=>{
                    this.getAllSelectedUserCountryVisits(this.selectedUserId);
                    this.resetCountryForm();
                }
            )
        }
        if(mode=='edit') {
            this.apiService.putAdmin('v2/admin-dashboard/country-visit/'+this.countryModel.id+'/',this.countryModel).subscribe(
                (res: any) => {
                    this.getAllSelectedUserCountryVisits(this.selectedUserId);
                    this.resetCountryForm();
                }
            )
        }
    }
    resetCountryForm(){
        this.mode='add';
        this.countryDate=null;
        this.countryModel=new country({});
    }
    loadVisitorDataForEdit(visitor){
        this.mode='edit';
        this.visitorModel=visitor;
        this.selectedDate={
            year:parseInt(visitor.date.substr(0,4)),
            month:parseInt(visitor.date.substr(5,2)),
            day:parseInt(visitor.date.substr(8,2))
        }

    }
    deleteVisitor(visitor){
        //console.log(visitor);
        this.apiService.deleteAdmin('v2/admin-dashboard/visitors/'+visitor.id+'/').subscribe(
            (res: any) => {
                this.getAllSelectedUserVisitors(this.selectedUserId);
            }
        )
    }
    loadPaymentDataForEdit(payment){
        this.mode='edit';
        this.paymentModel=payment;
        this.selectedDate={
            year:parseInt(payment.date.substr(0,4)),
            month:parseInt(payment.date.substr(5,2)),
            day:parseInt(payment.date.substr(8,2))
        }

    }
    deletePayment(payment){
        this.apiService.deleteAdmin('v2/admin-dashboard/payment/'+payment.id+'/').subscribe(
            (res: any) => {
                this.getAllSelectedUserPayments(this.selectedUserId);
                this.selectedDelete=null;
            }
        )
    }
    loadSaleDataForEdit(sale){
        this.mode='edit';
        this.saleModel=sale;
        this.selectedDate={
            year:parseInt(sale.date.substr(0,4)),
            month:parseInt(sale.date.substr(5,2)),
            day:parseInt(sale.date.substr(8,2))
        }

    }
    deleteSale(sale){
        this.apiService.deleteAdmin('v2/admin-dashboard/sales/'+sale.id+'/').subscribe(
            (res: any) => {
                this.getAllSelectedUserSales(this.selectedUserId);
                this.selectedDelete=null;
            }
        )
    }
    loadCountryDataForEdit(country){
        this.countryModel=country;
        this.mode='edit';
        this.countryDate=this.countryModel.date.substr(0,7);
        this.selectedDate={
            year:parseInt(country.date.substr(0,4)),
            month:parseInt(country.date.substr(5,2)),
            day:parseInt(country.date.substr(8,2))
        }
    }
    deleteCountry(country){
        this.apiService.deleteAdmin('v2/admin-dashboard/country-visit/'+country.id+'/').subscribe(
            (res: any) => {
                this.getAllSelectedUserCountryVisits(this.selectedUserId);
                this.selectedDelete=null;
            }
        )
    }
    selectDeleteTarget(object:any,target:string){
        this.selectedDelete=object;
        this.deleteTarget=target;
    }
    confirmDelete(){
        switch (this.deleteTarget){
            case 'visitor':{
                this.deleteVisitor(this.selectedDelete);
                break;
            }
            case 'payment':{
                this.deletePayment(this.selectedDelete);
                break;
            }
            case 'sale':{
                this.deleteSale(this.selectedDelete);
                break;
            }
            case 'country':{
                this.deleteCountry(this.selectedDelete);
                break;
            }
        }
    }
    openModal(content) {
        this.modalService.open(content, { windowClass : "delete-modal"}).result
            .then((result) => {

            }, (reason) => {

            });
    }
    loadPage(event,target){
        switch (target){
            case 'visitor':{
                this.allUserVisitors=this.globalVariables.setPageData(this.allUserVisitorsOrginal,event,5);
                break;
            }
            case 'payment':{
                this.allUserPayments=this.globalVariables.setPageData(this.allUserPaymentsOrginal,event,5);
                break;
            }
            case 'sale':{
                this.allUserSales=this.globalVariables.setPageData(this.allUserSalesOrginal,event,5);
                break;
            }
            case 'country':{
                this.allUserCountryVisits=this.globalVariables.setPageData(this.allUserCountryVisitsOrginal,event,5);
                break;
            }
            case 'user':{
                this.allUsers=this.globalVariables.setPageData(this.allUsersOrginal,event,5);
                break;
            }
        }
    }
}
