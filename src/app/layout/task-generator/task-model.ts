export class TaskModel{
    id:number;
    taskId:number;
    date:string;
    taskTitle:string;
    flag:boolean;
    constructor(data:any={}){
        this.id=data.id||0;
        this.taskId=data.taskId||0;
        this.date=data.date||'';
        this.taskTitle=data.taskTitle||'';
        this.flag=data.flag||false;
    }
}
