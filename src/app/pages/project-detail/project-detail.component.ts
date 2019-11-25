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
import { Task } from 'src/app/shared/models/task';
import { Job } from 'src/app/shared/models/job';

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
    private jobService:JobService
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
  }


  getTasksByCard(id: number) {
    localStorage.setItem("idCardCurrent", id + "");
    this.tasks = [];
    this.taskService.getTaskByCard(id).subscribe(data => {
      this.tasks = data
    });

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
  }


  //show job

  isVisibleJob = false;

  checked = true;

  jobs:Job[]=[];

  showModalJob(id: number): void {
    this.isVisibleJob = true;
    localStorage.setItem("idTaskCurrent", id + "");
    this.taskService.getTask(id).subscribe(task=>this.data=task)
    this.jobService.getJobByTask(id).subscribe(jobs=>this.jobs=jobs)
    
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
      // this.jobService.getJobByTask(idTask).subscribe(jobs=>this.jobs=jobs)
    })
  }

}
