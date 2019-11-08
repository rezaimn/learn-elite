import {Component, OnInit, ViewChild} from '@angular/core';
import {routerTransition} from '../../router.animations';
import * as shape from 'd3-shape';
import {APIService} from "../../shared/services/API-Service";
import {BaseChartDirective} from "ng2-charts";
import {GlobalVariables} from "../../shared/services/globalVariables";

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss'],
    animations: [routerTransition()]
})
export class DashboardComponent implements OnInit {
    userSelectedPage=1;
    public userTaskListOriginal=[];
    public filterDate={
        year:new Date().getFullYear(),
        month:new Date().getMonth()+1,
        day:new Date().getDate()
    }
    selectedMonth = "";
    selectedYear =new Date().getFullYear().toString();
    @ViewChild("countryPie") countryPie: BaseChartDirective;
    userVisitorList = [];
    userPaymentList = [];
    userSaleList = [];
    userCountryVisitList = [];
    userTaskList = [];
    defaultPagination: number;
    advancedPagination: number;
    paginationSize: number;
    disabledPagination: number;
    isDisabled: boolean;
    public years: string[] = [
        "2000", "2001", "2002", "2003", "2004", "2005", "2006", "2007", "2008", "2009", "2010",
        "2011", "2012", "2013", "2014", "2015", "2016", "2017", "2018", "2019", "2020", "2021",
        "2022", "2023", "2024", "2025", "2026", "2027", "2028", "2029", "2030", "2031", "2032",
        "2033", "2034", "2035", "2036", "2037", "2038", "2039", "2040", "2041", "2042", "2043"
    ];
    public months: string[] = [
        "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December",
    ];
    public days: string[] = [
        "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15",
        "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29",
        "30", "31"
    ];



    public barChartOptions: any = {
        scaleShowVerticalLines: false,
        responsive: true
    };

    public barChartLabels: string[] = this.months;
    public barChartVisitorL: string[] = this.months;
    public barChartType: string = 'bar';
    public barChartLegend: boolean = true;

    public barChartVisitorData: any[] = [
        {data: [], label: 'Visitor'},
        {data: [], label: 'View'}
    ];
    public barChartSalesQuantityData: any[] = [
        {data: [], label: 'Sales Quantity'}
    ];
    public barChartSalesAmountData: any[] = [
        {data: [], label: 'Sales Amount'}
    ];
    public barChartPaymentsData: any[] = [
        {data: [], label: 'payments'}
    ];
    public pieChartCountryLabels: string[] = [];
    public pieChartCountryData: number[] = [];
    public pieChartVisitorLabels: string[] = ["View","Visitor"];
    public pieChartVisitorData: number[] = [];
    colors: any[] = [
        {
            backgroundColor: ['#4DD0E1', '#FF5722', '#DAF7A6', '#FFC300', '#CFD8DC', '#278ecf', '#4bd762', '#ffca1f', '#ff9416', '#d42ae8', '#535ad7', '#ff402c', '#fffac8', '#83bfff', '#6edb8f', '#ffe366', '#ffd8b1', '#b1afdb', '#808080', '#ff7b65', '#ffbeb2']
        }];
    public  paymentsColor:Array<any>=[
        { // first color
            backgroundColor: '#c8c604',
            borderColor: 'rgba(225,10,24,0.2)',
            pointBackgroundColor: '#c8c604',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: '#c8c604'
        }
    ]
    public  salesQuantityColor:Array<any>=[
        { // second color
            backgroundColor: '#ff4e3b',
            borderColor: 'rgba(225,10,24,0.2)',
            pointBackgroundColor: '#ff4e3b',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: '#ff4e3b'
        }
    ]
    public  salesAmountColor:Array<any>=[
        { // second color
            backgroundColor: '#239bcc',
            borderColor: 'rgba(225,10,24,0.2)',
            pointBackgroundColor: '#239bcc',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: '#239bcc'
        }
    ]
    public chartColors: Array<any> = [

        { // second color
            backgroundColor: '#ee6667',
            borderColor: 'rgba(225,10,24,0.2)',
            pointBackgroundColor: '#ee6667',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: '#ee6667'
        },
        { // second color
            backgroundColor: '#19add4',
            borderColor: 'rgba(225,10,24,0.2)',
            pointBackgroundColor: '#19add4',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: '#19add4'
        }

    ];
    public pieChartType: string = 'pie';

    constructor(private apiService: APIService,private globalVariables:GlobalVariables) {
        this.defaultPagination = 1;
        this.advancedPagination = 1;
        this.paginationSize = 1;
        this.disabledPagination = 1;
        this.isDisabled = true;
        this.selectedMonth=this.months[new Date().getMonth()];

    }

    ngOnInit() {
        if(this.selectedMonth=='') {
            this.barChartLabels = this.months;
        }else {
            this.barChartLabels = this.days;
        }
        this.getUserVisitorList();
        this.getUserPaymentList();
        this.getUserSaleList();
        this.getUserCountryVisitList();
        this.getUserTaskList();
    }

    updateCharts() {
        if(this.selectedMonth=='') {
            this.barChartLabels = this.months;
        }else {
            this.barChartLabels = this.days;
        }
        this.getUserVisitorList();
        this.getUserPaymentList();
       this.getUserSaleList();
        this.getUserCountryVisitList();
    }

    getUserVisitorList() {
        this.apiService.getUser('v2/user-dashboard/visitors/?year='+this.selectedYear).subscribe(
            (res: any) => {
                this.userVisitorList = res;

                if(this.selectedMonth==''){
                    let chartData=this.userVisitorList;
                    let viewT = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
                    let visitorT = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
                    let visitorView=[0,0];
                    for (let visitor of chartData) {
                        visitorView[0]=visitorView[0]+visitor.view;
                        visitorView[1]=visitorView[1]+visitor.visitor;
                        viewT[parseInt(visitor.date.substr(5, 2)) - 1] = viewT[parseInt(visitor.date.substr(5, 2)) - 1] + visitor.view;
                        visitorT[parseInt(visitor.date.substr(5, 2)) - 1] = visitorT[parseInt(visitor.date.substr(5, 2)) - 1] + visitor.visitor;
                    }
                    this.barChartVisitorData = [{data: visitorT, label: "Visitor"}, {data: viewT, label: "View"}];
                    this.pieChartVisitorData = visitorView;
                }
                else {
                    let chartData = this.dataFilter(this.userVisitorList, "month");
                    let viewT = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
                    let visitorT = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
                    let visitorView=[0,0];
                    for (let visitor of chartData) {
                        visitorView[0]=visitorView[0]+visitor.view;
                        visitorView[1]=visitorView[1]+visitor.visitor;
                        viewT[parseInt(visitor.date.substr(8, 2)) - 1] = viewT[parseInt(visitor.date.substr(8, 2)) - 1] + visitor.view;
                        visitorT[parseInt(visitor.date.substr(8, 2)) - 1] = visitorT[parseInt(visitor.date.substr(8, 2)) - 1] + visitor.visitor;
                    }
                    this.barChartVisitorData = [{data: visitorT, label: "Visitor"}, {data: viewT, label: "View"}];
                    this.pieChartVisitorData = visitorView;
                }

            }
        )
    }

    getUserPaymentList() {
        this.apiService.getUser('v2/user-dashboard/payment/?year='+this.selectedYear).subscribe(
            (res: any) => {
                this.userPaymentList = res;
                if(this.selectedMonth==''){
                    let chartData =this.userPaymentList;
                    let paymentT = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
                    for (let payment of chartData) {
                        paymentT[parseInt(payment.date.substr(5, 2)) - 1] = paymentT[parseInt(payment.date.substr(5, 2)) - 1] + payment.payment;

                    }
                    this.barChartPaymentsData = [{data: paymentT, label: "Payment"}];
                }else{
                    let chartData = this.dataFilter(this.userPaymentList, "month");
                    let paymentT = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
                    for (let payment of chartData) {
                        paymentT[parseInt(payment.date.substr(8, 2)) - 1] = paymentT[parseInt(payment.date.substr(8, 2)) - 1] + payment.payment;
                    }
                    this.barChartPaymentsData = [{data: paymentT, label: "Payment"}];

                }


            }
        )
    }

    getUserSaleList() {
        this.apiService.getUser('v2/user-dashboard/sales/?year='+this.selectedYear).subscribe(
            (res: any) => {
                this.userSaleList = res;
                if(this.selectedMonth==''){
                    let chartData = this.userSaleList;
                    let saleAmountT = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
                    let saleQuantityT = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
                    for (let sale of chartData) {
                        saleAmountT[parseInt(sale.date.substr(5, 2)) - 1] = saleAmountT[parseInt(sale.date.substr(5, 2)) - 1] + sale.sale_Amount;
                        saleQuantityT[parseInt(sale.date.substr(5, 2)) - 1] = saleQuantityT[parseInt(sale.date.substr(5, 2)) - 1] + sale.sale_Quantity;
                    }
                    this.barChartSalesAmountData = [{data: saleAmountT, label: "Sales Amount"}];
                    this.barChartSalesQuantityData = [{data: saleQuantityT, label: "Sales Quantity"}];
                }
                else{
                    let chartData = this.dataFilter(this.userSaleList, "month");
                    let saleAmountT = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
                    let saleQuantityT = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
                    for (let sale of chartData) {
                        saleAmountT[parseInt(sale.date.substr(8, 2)) - 1] = saleAmountT[parseInt(sale.date.substr(8, 2)) - 1] + sale.sale_Amount;
                        saleQuantityT[parseInt(sale.date.substr(8, 2)) - 1] = saleQuantityT[parseInt(sale.date.substr(8, 2)) - 1] + sale.sale_Quantity;
                    }
                    this.barChartSalesAmountData = [{data: saleAmountT, label: "Sales Amount"}];
                    this.barChartSalesQuantityData = [{data: saleQuantityT, label: "Sales Quantity"}];
                }


            }
        )
    }

    getUserCountryVisitList() {

            this.apiService.getUser('v2/user-dashboard/country-visit/?year='+this.selectedYear).subscribe(
                (res: any) => {
                    this.userCountryVisitList = res;
                        let pieCountryL=[];
                        let pieCountryD = [];
                        if(this.selectedMonth==''){
                            let chartData =this.userCountryVisitList;
                            for (let country of chartData) {
                                let flag=false;
                                let index=0;
                                for(let labelT of pieCountryL){
                                    if(country.country==labelT){
                                        flag=true;
                                        break;
                                    }
                                    index=index+1;
                                }
                                if(flag){
                                    pieCountryD[index]=pieCountryD[index]+country.visit;
                                }else{
                                    pieCountryL.push(country.country);
                                    pieCountryD.push(country.visit);
                                }

                            }
                        }else{

                            let chartData = this.dataFilter(this.userCountryVisitList, "month");
                            for (let country of chartData) {
                                let flag=false;
                                let index=0;
                                for(let labelT of pieCountryL){
                                    if(country.country==labelT){
                                        flag=true;
                                        break;
                                    }
                                    index=index+1;
                                }
                                if(flag){
                                    pieCountryD[index]=pieCountryD[index]+country.visit;
                                }else{
                                    pieCountryL.push(country.country);
                                    pieCountryD.push(country.visit);
                                }
                            }
                        }
                        if(pieCountryL.length==0){
                            this.pieChartCountryLabels.splice(0,this.pieChartCountryLabels.length);
                            this.pieChartCountryLabels.push("");
                            this.pieChartCountryData=[0];
                        }else {
                            this.pieChartCountryLabels.splice(0,this.pieChartCountryLabels.length);
                            for(let label of pieCountryL){
                                this.pieChartCountryLabels.push(label);
                            }
                            this.pieChartCountryData=pieCountryD;
                        }

                }

            )

    }

    // showXAxis = true;
    // showYAxis = true;
    // gradient = false;
    // showLegend = true;
    // showXAxisLabel = false;
    // tooltipDisabled = false;
    // xAxisLabel = 'Country';
    // showYAxisLabel = false;
    // yAxisLabel = 'GDP Per Capita';
    // showGridLines = true;
    // roundDomains = false;
    // colorSchemeSearchStatus = {
    //     domain: [
    //        '#ff4e3b', '#C8C604','#0099cc', '#FF4E3B', '#24f3f6'
    //     ]
    // };
    // colorSchemeSuccessTransaction = {
    //     domain: [
    //         '#d96557', '#ba68c8', '#0099cc', '#2ECC71', '#4cc3d9', '#ffc65d'
    //     ]
    // };
    // colorSchemeDriversStatus = {
    //     domain: [
    //         '#4cc3d9', '#ffc65d', '#0099cc', '#2ECC71', '#d96557', '#ba68c8'
    //     ]
    // };
    // colorSchemeCustomersRequests = {
    //     domain: [
    //         '#4cc3d9', '#ffc65d', '#d96557', '#ba68c8', '#0099cc', '#2ECC71'
    //     ]
    // };
    // barChart=[
    //     {
    //         "name": "Germany",
    //         "value": 40632
    //     },
    //     {
    //         "name": "France",
    //         "value": 36745
    //     },
    //     {
    //         "name": "Italy",
    //         "value": 35800
    //     },
    //     {
    //         "name": "Lao People's Democratic Republic",
    //         "value": 16289
    //     },
    //     {
    //         "name": "British Indian Ocean Territory",
    //         "value": 24862
    //     },
    //     {
    //         "name": "European Union",
    //         "value": 37013
    //     },
    //     {
    //         "name": "Guatemala",
    //         "value": 32725
    //     }
    // ]
    // areaChart = [
    //     {
    //         "name": "Northern Mariana Islands",
    //         "series": [
    //             {
    //                 "value": 4340,
    //                 "name": "2016-09-19"
    //             },
    //             {
    //                 "value": 2878,
    //                 "name": "2016-09-16"
    //             },
    //             {
    //                 "value": 2427,
    //                 "name": "2016-09-14"
    //             },
    //             {
    //                 "value": 2095,
    //                 "name": "2016-09-21"
    //             },
    //             {
    //                 "value": 5731,
    //                 "name": "2016-09-15"
    //             }
    //         ]
    //     },
    //     {
    //         "name": "Denmark",
    //         "series": [
    //             {
    //                 "value": 4524,
    //                 "name": "2016-09-19"
    //             },
    //             {
    //                 "value": 6396,
    //                 "name": "2016-09-16"
    //             },
    //             {
    //                 "value": 6037,
    //                 "name": "2016-09-14"
    //             },
    //             {
    //                 "value": 6839,
    //                 "name": "2016-09-21"
    //             },
    //             {
    //                 "value": 5758,
    //                 "name": "2016-09-15"
    //             }
    //         ]
    //     },
    //     {
    //         "name": "Australia",
    //         "series": [
    //             {
    //                 "value": 4722,
    //                 "name": "2016-09-19"
    //             },
    //             {
    //                 "value": 4907,
    //                 "name": "2016-09-16"
    //             },
    //             {
    //                 "value": 6971,
    //                 "name": "2016-09-14"
    //             },
    //             {
    //                 "value": 6042,
    //                 "name": "2016-09-21"
    //             },
    //             {
    //                 "value": 3174,
    //                 "name": "2016-09-15"
    //             }
    //         ]
    //     },
    //
    // ]
    // pieChart = [
    //     {
    //         "name": "Germany",
    //         "value": 40632
    //     },
    //     {
    //         "name": "United States",
    //         "value": 49737
    //     },
    //     {
    //         "name": "France",
    //         "value": 36745
    //     },
    //
    // ]
    // schemeType = 'ordinal';
    // // line interpolation
    // curve = shape.curveLinear;
    // // line, area
    // timeline = false;
    // // margin
    // margin = false;
    // // marginTop = 40;
    // // marginRight = 40;
    // // marginBottom = 40;
    // // marginLeft = 40;
    // // // gauge
    // // gaugeMin = 0;
    // // gaugeMax = 50;
    // // gaugeLargeSegments = 10;
    // // gaugeSmallSegments = 5;
    // // gaugeTextValue = '';
    // // gaugeUnits = 'alerts';
    // // gaugeAngleSpan = 240;
    // // gaugeStartAngle = -120;
    // // gaugeShowAxis = true;
    // // gaugeValue = 50; // linear gauge value
    // // gaugePreviousValue = 70;
    //
    // constructor() {
    //     // console.log(Object.assign(this, {
    //     //     single
    //     // }));
    //     // this.dateDataCustomersStatus = this.laodChart(this.daySeries, this.dateDataCustomersStatus);
    //     // this.dateDataDriversStatus = this.laodChart(this.daySeries, this.dateDataDriversStatus);
    //     // this.dateDataSearchStatus = this.laodChart(this.daySeries, this.dateDataSearchStatus);
    //     // this.dateDataSuccessTransaction = this.laodChart(this.daySeries, this.dateDataSuccessTransaction);
    //     //
    //
    // }
    //
    // // laodChart(seriesTemp: any[], dataTemp: any[]) {
    // //     let dataT = [];
    // //     for (let i = 0; i < dataTemp.length; i++) {
    // //         let seriesT = [];
    // //         let dataObj = {
    // //             "name": dataTemp[i].name,
    // //             "series": []
    // //         }
    // //         for (let temp of seriesTemp) {
    // //             let seriesObj = {
    // //                 "name": temp.name,
    // //                 "value": Math.floor(Math.random() * 100)
    // //             }
    // //             seriesT.push(seriesObj);
    // //         }
    // //         dataObj.series = seriesT;
    // //         dataT.push(dataObj);
    // //     }
    // //     return dataT;
    // // }
    // //
    // // setChartsTimeRange(range: any) {
    // //     this.selectedRange=range.name;
    // //     switch (range.selector) {
    // //         case 'day': {
    // //             this.dateDataCustomersStatus = this.laodChart(this.daySeries, this.dateDataCustomersStatus);
    // //             this.dateDataDriversStatus = this.laodChart(this.daySeries, this.dateDataDriversStatus);
    // //             this.dateDataSearchStatus = this.laodChart(this.daySeries, this.dateDataSearchStatus);
    // //             this.dateDataSuccessTransaction = this.laodChart(this.daySeries, this.dateDataSuccessTransaction);
    // //
    // //             break;
    // //         }
    // //         case 'week': {
    // //
    // //             this.dateDataCustomersStatus = this.laodChart(this.weekSeries, this.dateDataCustomersStatus);
    // //             this.dateDataDriversStatus = this.laodChart(this.weekSeries, this.dateDataDriversStatus);
    // //             this.dateDataSearchStatus = this.laodChart(this.weekSeries, this.dateDataSearchStatus);
    // //             this.dateDataSuccessTransaction = this.laodChart(this.weekSeries, this.dateDataSuccessTransaction);
    // //             break;
    // //         }
    // //         case 'month': {
    // //             this.dateDataCustomersStatus = this.laodChart(this.monthSeries, this.dateDataCustomersStatus);
    // //             this.dateDataDriversStatus = this.laodChart(this.monthSeries, this.dateDataDriversStatus);
    // //             this.dateDataSearchStatus = this.laodChart(this.monthSeries, this.dateDataSearchStatus);
    // //             this.dateDataSuccessTransaction = this.laodChart(this.monthSeries, this.dateDataSuccessTransaction);
    // //
    // //             break;
    // //         }
    // //         case 'year': {
    // //             this.dateDataCustomersStatus = this.laodChart(this.yearSeries, this.dateDataCustomersStatus);
    // //             this.dateDataDriversStatus = this.laodChart(this.yearSeries, this.dateDataDriversStatus);
    // //             this.dateDataSearchStatus = this.laodChart(this.yearSeries, this.dateDataSearchStatus);
    // //             this.dateDataSuccessTransaction = this.laodChart(this.yearSeries, this.dateDataSuccessTransaction);
    // //
    // //             break;
    // //         }
    // //     }
    // // }
    select(data) {
       // console.log('Item clicked', data);
    }

    chartHovered(event: any) {

    }

    chartClicked(event: any) {

    }

    dataFilter(arrayList: any, filterType: string) {
        let dataArrayTemp = [];
        for (let item of arrayList) {
            switch (filterType) {
                case 'year': {
                    if (item.date.substr(0, 4) == this.selectedYear) {
                        dataArrayTemp.push(item);
                    }
                    break;
                }
                case 'month': {
                    let monthT='';
                    switch (this.selectedMonth){
                        case "January":{
                            monthT="01";
                            break;
                        }
                        case "February":{
                            monthT="02";
                            break;
                        }
                        case "March":{
                            monthT="03";
                            break;
                        }
                        case "April":{
                            monthT="04";
                            break;
                        }
                        case "May":{
                            monthT="05";
                            break;
                        }
                        case "June":{
                            monthT="06";
                            break;
                        }
                        case "July":{
                            monthT="07";
                            break;
                        }
                        case "August":{
                            monthT="08";
                            break;
                        }
                        case "September":{
                            monthT="09";
                            break;
                        }
                        case "October":{
                            monthT="10";
                            break;
                        }
                        case "November":{
                            monthT="11";
                            break;
                        }
                        case "December":{
                            monthT="12";
                            break;
                        }

                    }
                    if (item.date.substr(5, 2) == monthT) {
                        dataArrayTemp.push(item);
                    }
                    break;
                }

            }
        }
        //console.log(dataArrayTemp);
        return dataArrayTemp;
    }
    convertFilterDate(){
        let dateTemp='';
        let year=this.filterDate.year.toString();
        let month='';
        if(this.filterDate.month<10){
            month='0'+this.filterDate.month.toString();
        }else{
            month=this.filterDate.month.toString();
        }
        let day='';
        if(this.filterDate.day<10){
            day='0'+this.filterDate.day.toString();
        }else{
            day=this.filterDate.day.toString();
        }
        dateTemp=year+'-'+month+'-'+day;
        return dateTemp;
    }
    loadPage(event) {
        this.userTaskList = this.globalVariables.setPageData(this.userTaskListOriginal, event, 5);
    }
    getUserTaskList(){

        this.apiService.getUser('v2/user-dashboard/todo/?date='+this.convertFilterDate()).subscribe(
            (res:any)=>{
                this.userTaskListOriginal= res;
                this.userTaskList=this.globalVariables.setPageData(this.userTaskListOriginal,1,5);
                this.userSelectedPage=1;
            }
        )
    }
    ChangeTaskStatus(task){
        this.apiService.putUser('v2/user-dashboard/todo/'+task.id+'/',task).subscribe(
            (res: any) => {
                this.getUserTaskList();
            }
        )
    }
    setDate(date){
        this.filterDate=date._model;
        this.getUserTaskList();
    }
}
