import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import {ModalDismissReasons, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {TaskModel} from "./task-model";
import {APIService} from "../../shared/services/API-Service";
import {GlobalVariables} from "../../shared/services/globalVariables";
@Component({
    selector: 'app-task-generator',
    templateUrl: './task-generator.component.html',
    styleUrls: ['./task-generator.component.scss'],
    animations: [routerTransition()]
})
export class TaskGeneratorComponent implements OnInit {
    closeResult: string;
    public taskModel:TaskModel=new TaskModel({});
    public userTaskList=[];
    selectedTask;
    public userTaskListOriginal=[];
    public userSelectedPage=1;

    public selectedDate={
        year:new Date().getFullYear(),
        month:new Date().getMonth()+1,
        day:new Date().getDate()
    };
    mode="add";
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
    paginationSize: number;
    disabledPagination: number;
    isDisabled: boolean;
    constructor(private modalService: NgbModal,private apiService:APIService,private globalVariables:GlobalVariables) {
        this.defaultPagination = 1;
        this.advancedPagination = 1;
        this.paginationSize = 1;
        this.disabledPagination = 1;
        this.isDisabled = true;
    }

    ngOnInit() {
        this.getUserTaskList();
    }
    //
    getUserTaskList(){
        this.apiService.getUser('v2/user-dashboard/todo/').subscribe(
            (res:any)=>{
                this.userTaskListOriginal= res;
                this.userTaskList=this.globalVariables.setPageData(this.userTaskListOriginal,1,5);
                this.userSelectedPage=1;
            }
        )
    }
    addUpdateTask(mode:string){
        this.taskModel.date=this.dateConvertToSave();
        if(mode=='add'){
            delete this.taskModel.taskId;
            this.apiService.postUser('v2/user-dashboard/todo/',this.taskModel).subscribe(
                (res:any)=>{
                    this.getUserTaskList();
                    this.resetTaskForm();
                }
            )
        }
        if(mode=='edit') {
            this.apiService.putUser('v2/user-dashboard/todo/'+this.taskModel.id+'/',this.taskModel).subscribe(
                (res: any) => {
                    this.getUserTaskList();
                    this.resetTaskForm();
                }
            )
        }
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

    resetTaskForm(){
        this.mode='add';
        this.taskModel=new TaskModel({});
    }
    deleteTask(){
        this.apiService.deleteUser('v2/user-dashboard/todo/'+this.selectedTask.id+'/').subscribe(
            (res: any) => {
                this.getUserTaskList();
            }
        )
    }
    selectTaskToDelete(task){
       this.selectedTask=task;
    }
    loadDataForEdit(task){
        this.taskModel=task;
        this.mode='edit';
        this.selectedDate={
            year:parseInt(task.date.substr(0,4)),
            month:parseInt(task.date.substr(5,2)),
            day:parseInt(task.date.substr(8,2))
        }
    }
    loadPage(event) {
        this.userTaskList = this.globalVariables.setPageData(this.userTaskListOriginal, event, 5);
    }
    openModal(content) {
        this.modalService.open(content, { windowClass : "delete-modal"}).result
            .then((result) => {

            }, (reason) => {

            });
    }
}
