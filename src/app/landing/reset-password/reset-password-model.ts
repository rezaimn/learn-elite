export class LoginModel{
    username:string;
    pass:string;
    constructor(data:any={}){
        this.username=data.username||'';
        this.pass=data.pass||'';
    }
}
