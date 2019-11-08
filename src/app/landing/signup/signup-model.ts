
export class SignupModel{
    firstname:string;
    lastname:string;
    email:number;
    username:string;
    password:string;
    confirmPass:string;
    constructor(data:any={}){
        this.firstname=data.firstname||'';
        this.lastname=data.lastname||'';
        this.email=data.email||'';
        this.username=data.username||'';
        this.password=data.password||'';
        this.confirmPass=data.confirmPass||'';
    }
}
