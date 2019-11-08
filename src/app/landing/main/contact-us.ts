export class ContactUs{
    name:string;
    topic:string;
    phone:number;
    email:string;
    text:string;
    constructor(data:any={}){
        this.name=data.name||'';
        this.topic=data.topic||'';
        this.phone=data.phone||'';
        this.email=data.email||'';
        this.text=data.text||'';
    }
}


