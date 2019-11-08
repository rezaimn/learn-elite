export class ProfileModel{
    id:number;
    username:string;
    firstname:string;
    lastname:string;
    email:string;
    address:string;
    city:string;
    country:string;
    zipcode:string;
    paypal_id:string;
    constructor(data:any={}){
        this.id=data.id||0;
        this.username=data.username||'';
        this.firstname=data.firstname||'';
        this.lastname=data.lastname||'';
        this.email=data.email||'';
        this.address=data.address||'';
        this.city=data.city||'';
        this.country=data.country||'';
        this.zipcode=data.zipcode||0;
        this.paypal_id=data.paypal_id||0;
    }
}
