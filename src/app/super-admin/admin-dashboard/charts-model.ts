export class Visitor{
    id:number;
    visitId:number;
    date:string;
    view:number;
    visitor:number;
    user_id:number;
    constructor(data:any={}){
        this.id=data.id||0;
        this.user_id=data.user_id||0;
        this.visitId=data.visitId||0;
        this.date=data.date||'';
        this.view=data.view||0;
        this.visitor=data.visitor||0;
    }
}
export class payments{
    id:number;
    paymentId:number;
    date:string;
    payment:string;
    paymentMethod:string;
    user_id:number;
    constructor(data:any={}){
        this.id=data.id||0;
        this.user_id=data.user_id||0;
        this.paymentId=data.paymentId||0;
        this.date=data.date||'';
        this.payment=data.payment||'';
        this.paymentMethod=data.visitor||'';
    }
}
export class Sales{
    id:number;
    saleId:number;
    date:string;
    sale_Amount:number;
    sale_Quantity:number;
    user_id:number;
    constructor(data:any={}){
        this.id=data.id||0;
        this.user_id=data.user_id||0;
        this.saleId=data.saleId||0;
        this.date=data.date||'';
        this.sale_Amount=data.sale_Amount||0;
        this.sale_Quantity=data.sale_Quantity||0;
    }
}
export class country{
    id:number;
    visitId:number;
    date:string;
    country:string;
    visit:number;
    user_id:number;
    constructor(data:any={}){
        this.id=data.id||0;
        this.user_id=data.user_id||0;
        this.visitId=data.visitId||0;
        this.date=data.date||'';
        this.country=data.country||'';
        this.visit=data.visit||0;
    }
}
