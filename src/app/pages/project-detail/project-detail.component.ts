import { Task } from './../../shared/models/task';
import { Comment } from './../../shared/models/comment';
import { NzMessageService } from 'ng-zorro-antd/message';
import { CommentService } from './../../core/services/comment.service';
import { JobService } from './../../core/services/job.service';
import { Component, OnInit } from '@angular/core';
import { ProjectService } from 'src/app/core/services/project.service';
import { Project } from 'src/app/shared/models/project';
import { Card } from 'src/app/shared/models/card';
import { CardService } from 'src/app/core/services/card.service';
import { UserService } from 'src/app/core/services/user.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TaskService } from 'src/app/core/services/task.service';
import { Job } from 'src/app/shared/models/job';
import { distanceInWords } from 'date-fns';

@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.scss']
})

export class ProjectDetailComponent implements OnInit {

  constructor(
    private projectService: ProjectService,
    private cardService: CardService,
    private userService: UserService,
    private formBuilder: FormBuilder,
    private router: Router,
    private taskService: TaskService,
    private jobService:JobService,
    private commentService:CommentService
  ) { }

  get f() {
    return this.requestForm.controls;
  }

  requestForm: FormGroup;
  requestFormTask: FormGroup;
  requestFormJob: FormGroup;
  submitted = false;
  submittedTask = false;
  isLoading = false;
  project: Project;
  cards: any[];
  tasks: Task[] = [];
  data: Task;

  ngOnInit() {
    this.getProjectById();
    this.getCardByProject();
    this.requestForm = this.formBuilder.group({
      name: ['', [Validators.required]]
    });
    this.requestFormTask = this.formBuilder.group({
      name: ['', [Validators.required]],
      description: ['', [Validators.required]]
    });
    this.requestFormJob = this.formBuilder.group({
      content: ['', [Validators.required]]
    });
    
  }

  getProjectById() {
    var id = parseInt(localStorage.getItem("project"));
    this.projectService.getProjectById(id).subscribe(data => {
      this.project = data
    })
  }

  getCardByProject() {
    var id = parseInt(localStorage.getItem("project"));
    this.cardService.getCardByProject(id).subscribe(data => {
      this.cards = data
      if (this.cards[0]) {
        this.getTasksByCard(this.cards[0].id);
      }
    });

  }

  isManage: boolean;

  // checkRole(){
  //   this.userService.isManage(0).subscribe(data=>this.isManage=data);
  //   return this.isManage;
  // }
  isVisible = false;

  showModal(): void {
    this.isVisible = true;
  }

  handleCancel(): void {
    this.isVisible = false;
  }

  onSubmit() {
    this.submitted = true;
    if (this.requestForm.invalid) {
      this.isVisible = false;
      return;
    }
    let valueForm = this.requestForm.value
    var id = parseInt(localStorage.getItem("project"));
    this.cardService.addCard(valueForm, id).subscribe(card => this.cards = [...this.cards, card]);
    this.isVisible = false;
    this.requestForm.reset();
  }


  getTasksByCard(id: number) {
    localStorage.setItem("idCardCurrent", id + "");
    this.tasks = [];
    this.taskService.getTaskByCard(id).subscribe(data => {
      this.tasks = data
      this.tasks.forEach((eachTask, index) => {
        this.jobService.getProcess(eachTask.id).subscribe(process => {
          this.tasks[index] = {
            ...this.tasks[index],
            process
          }
        })
      })
    });

  }

  confirmDeleteTask(id:number){
    this.taskService.deleteTask(id).subscribe(data=>this.tasks=data)
  }

  currentTask:number=0;
  task:Task
  
  editTask(id:number){
    // this.taskService.editTask(id,task).subscribe(data=>this.task=data)
    this.currentTask=id;
  }

  saveTask(id:number,description:string){
    this.currentTask=0;
    this.taskService.editTask(id,description).subscribe(data=>this.task=data)

  }

  log(): void {
    console.log('click dropdown button');
  }

  isSuccess = false;

  setCard(idNew: number, idCard: number) {
    var idOld = parseInt(localStorage.getItem("idCardCurrent"));
    this.taskService.replaceTask(idOld, idNew, idCard).subscribe(data => {
      this.getTasksByCard(idOld);
      this.isSuccess = true;
    })
  }

  handleSuccess() {
    this.isSuccess = false;
  }

  isVisibleTask = false;

  showModalTask(): void {
    this.isVisibleTask = true;
  }

  handleCancelTask(): void {
    this.isVisibleTask = false;
  }

  onSubmitTask() {
    this.submittedTask = true;
    if (this.requestFormTask.invalid) {
      this.isVisibleTask = false;
      return;
    }
    let valueForm = this.requestFormTask.value
    var id = parseInt(localStorage.getItem("idCardCurrent"));
    this.taskService.addTask(valueForm, id).subscribe(data => this.tasks = [...this.tasks, data]);
    this.isVisibleTask = false;
    this.requestFormTask.reset();
  }


  //show job

  isVisibleJob = false;

  checked = true;

  jobs:Job[]=[];


  getCommentByTask(id:number){
    this.commentService.getCommentByTask(id).subscribe(data=>this.comments=data)
  }

  showModalJob(id: number): void {
    this.isVisibleJob = true;
    localStorage.setItem("idTaskCurrent", id + "");
    this.taskService.getTask(id).subscribe(task=>this.data=task)
    this.jobService.getJobByTask(id).subscribe(jobs=>this.jobs=jobs)
    this.getCommentByTask(id);
  }

  handleCancelJob() {
    this.isVisibleJob = false;
  }

  submitJob(){
    if (this.requestFormJob.invalid) {
      return;
    }
    let valueForm = this.requestFormJob.value
    var id = parseInt(localStorage.getItem("idTaskCurrent"));
    this.jobService.addJob(id,valueForm).subscribe(data => this.jobs = [...this.jobs, data]);
    this.requestFormJob.reset();
  }

  checkStatus(status:string){
    if(status=='PENDING'){
      return false;
    }else{
      return true;
    }
  }

  myVariable:number;

  process:number;

  public getProcess(id:number){
    var data = this.jobService.getProcess(id).toPromise();
    console.log(data);
    return data;
  }     

  logJob(id: number): void {
    var idTask = parseInt(localStorage.getItem("idTaskCurrent"));
    console.log("hihi"+id);
    this.jobService.changeJob(id).subscribe(data=>{
      let indexTask=this.tasks.findIndex(e=> e.id==idTask);
      this.jobService.getProcess(idTask).subscribe(value=>this.tasks[indexTask] = {
        ...this.tasks[indexTask],
        process: value
      })
    })
  }

  comments: any[] = [];
   comment:Comment
  submitting = false;
  inputValue = '';
  currentComment:number=0;
  

  editComment(id:number){
     this.currentComment=id;
     console.log(this.currentComment)
  }

  saveComment(id:number,content:string){
    this.commentService.updateComment(id,content).subscribe(data=>this.comment=data)
    this.currentComment=0;
    console.log(this.currentComment);
    
  }

  handleSubmit(): void {
    this.submitting = true;
    const content = this.inputValue;
    var idTask = parseInt(localStorage.getItem("idTaskCurrent"));
    this.commentService.addCommnet(idTask,content).subscribe(data=>this.comments=[...this.comments,data])
    this.inputValue = '';
    this.submitting = false;
    
  }

  //delete comment
  cancel(): void {
  }

  confirm(id:number): void {
    this.commentService.deleteComment(id).subscribe(data=>this.comments=data)
  }

 displayTime(date:Date){
   return distanceInWords(new Date(),date);
 }
}
//token pay load