import {Component, OnInit} from '@angular/core';
import {routerTransition} from '../../router.animations';
import {APIService} from "../../shared/services/API-Service";
import {GlobalVariables} from "../../shared/services/globalVariables";

@Component({
    selector: 'app-payments',
    templateUrl: './payments.component.html',
    styleUrls: ['./payments.component.scss'],
    animations: [routerTransition()]
})
export class PaymentsComponent implements OnInit {
    defaultPagination: number;
    advancedPagination: number;
    paginationSize: number;
    disabledPagination: number;
    isDisabled: boolean;
    selectedYear = new Date().getFullYear().toString();
    userPaymentList = [];
    allUserPaymentsOrginal=[];
    paymentSelectedPage=1;
    public years: string[] = [
        "2000", "2001", "2002", "2003", "2004", "2005", "2006", "2007", "2008", "2009", "2010",
        "2011", "2012", "2013", "2014", "2015", "2016", "2017", "2018", "2019", "2020", "2021",
        "2022", "2023", "2024", "2025", "2026", "2027", "2028", "2029", "2030", "2031", "2032",
        "2033", "2034", "2035", "2036", "2037", "2038", "2039", "2040", "2041", "2042", "2043"
    ];

    constructor(private apiService: APIService, private globalVariables: GlobalVariables) {
        this.defaultPagination = 1;
        this.advancedPagination = 1;
        this.paginationSize = 1;
        this.disabledPagination = 1;
        this.isDisabled = true;
    }

    ngOnInit() {
        this.getAllPayments();
    }

    getAllPayments() {
        this.apiService.getUser('v2/user-dashboard/payment/?year=' + this.selectedYear).subscribe(
            (res: any) => {
                this.allUserPaymentsOrginal = res;
                this.userPaymentList = this.globalVariables.setPageData(this.allUserPaymentsOrginal, 1, 5);
                this.paymentSelectedPage = 1;
            }
        )
    }

    loadPage(event, target) {
        this.userPaymentList = this.globalVariables.setPageData(this.allUserPaymentsOrginal, event, 5);
    }
}
