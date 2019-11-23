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

@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.scss']
})

export class ProjectDetailComponent implements OnInit {

  constructor(
    private projectService: ProjectService,
    private cardService :CardService,
    private userService:UserService,
    private formBuilder: FormBuilder,
    private router:Router,
    private taskService:TaskService
  ) { }

  get f() {
    return this.requestForm.controls;
  }

  requestForm: FormGroup;
  requestFormTask:FormGroup;
  submitted = false;
  submittedTask=false;
  isLoading = false;
  project : Project;
  cards :any[];
  tasks:Task[]=[];

  ngOnInit() {
    this.getProjectById();
    this.getCardByProject();
    this.requestForm = this.formBuilder.group({
      name:['', [Validators.required]]
    });
    this.requestFormTask = this.formBuilder.group({
      name:['', [Validators.required]],
      description: ['', [Validators.required]]
    });
  }

  getProjectById(){
    var id=parseInt(localStorage.getItem("project"));
    this.projectService.getProjectById(id).subscribe(data=>{
      this.project=data
      console.log(data)
    })
  }

  getCardByProject(){
    var id=parseInt(localStorage.getItem("project"));
    this.cardService.getCardByProject(id).subscribe(data=>{
      this.cards=data
      if(this.cards[0]){
        this.getTasksByCard(this.cards[0].id); 
      }
    });

  }

  isManage:boolean;

  // checkRole(){
  //   this.userService.isManage(0).subscribe(data=>this.isManage=data);
  //   return this.isManage;
  // }
  isVisible=false;

  showModal(): void {
    this.isVisible = true;
  }

  handleCancel(): void {
    this.isVisible = false;
  }

  onSubmit() {
    console.log("vo day");
    this.submitted = true;
    if (this.requestForm.invalid) {
      this.isVisible = false;
      console.log("vo day1");
      return;
    }
    let valueForm = this.requestForm.value
    var id=parseInt(localStorage.getItem("project"));
    console.log(valueForm)
    this.cardService.addCard(valueForm,id).subscribe(card=>this.cards=[...this.cards,card]);
    console.log("errr")
    this.isVisible = false;
  }


  getTasksByCard(id:number){
    localStorage.setItem("idCardCurrent",id+"");
    this.tasks=[];
    this.taskService.getTaskByCard(id).subscribe(data=>{
      this.tasks=data
    });

  }

  log(): void {
    console.log('click dropdown button');
  }

  isSuccess=false;

  setCard(idNew:number,idCard:number){
    var idOld=parseInt(localStorage.getItem("idCardCurrent"));
    this.taskService.replaceTask(idOld,idNew,idCard).subscribe(data=>{
      this.getTasksByCard(idOld);
      this.isSuccess=true;
    })
  }

  handleSuccess(){
    this.isSuccess=false;
  }

  isVisibleTask=false;

  showModalTask(): void {
    this.isVisibleTask = true;
  }

  handleCancelTask(): void {
    this.isVisibleTask = false;
  }

  onSubmitTask() {
    console.log("vo day");
    this.submittedTask = true;
    if (this.requestFormTask.invalid) {
      this.isVisibleTask = false;
      console.log("vo day1");
      return;
    }
    let valueForm = this.requestFormTask.value
    console.log(valueForm)
    var id=parseInt(localStorage.getItem("idCardCurrent"));
    this.taskService.addTask(valueForm,id).subscribe(data=>this.tasks=[...this.tasks,data]);
    this.isVisibleTask = false;
  }


}
