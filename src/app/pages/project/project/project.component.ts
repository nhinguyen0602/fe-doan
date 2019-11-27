import { NzMessageService } from 'ng-zorro-antd';
import { User } from 'src/app/shared/models/user';
import { Component, OnInit } from '@angular/core';
import { Project } from 'src/app/shared/models/project';
import { ProjectService } from 'src/app/core/services/project.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AlertService } from 'src/app/core/services/alert.service';
import { Router } from '@angular/router';
import { UserService } from 'src/app/core/services/user.service';


@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})
export class ProjectComponent implements OnInit {

  get f() {
    return this.requestForm.controls;
  }

  projects: any[] = [];
  project:Project;
  requestForm: FormGroup;
  submitted = false;
  isLoading = false;
  isVisible =false;
  inputValue: string;
  suggestions :string[]=[];
  users:any[]=[]
  userOfProject : any[];

  constructor(
    private projectService: ProjectService,
    private formBuilder: FormBuilder,
    private alertService: AlertService,
    private router:Router, 
    private userService:UserService  ,
    private nzMessageService: NzMessageService
  ) {}

  ngOnInit() {
    this.getProjectsByUser();
    this.getUsers();
    this.requestForm = this.formBuilder.group({
      name:['', [Validators.required]],
      description: ['', [Validators.required]]
    });
  }

  getProjectsByUser(){
    this.projectService.getProjectByUser(0).subscribe(projects=>this.projects=projects);
  }

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
    this.projectService.addProject(valueForm).subscribe(project=>this.projects=[...this.projects,project]);
    this.isVisible = false;
  }

  idProjectCurrent:number;

  public getProject(idProject:number): void {
    localStorage.setItem("project",idProject+'');
    this.idProjectCurrent=parseInt(localStorage.getItem("project"));
  }

  isManage:boolean;

  // checkRole(){
  //   this.userService.isManage(0).subscribe(data=>this.isManage=data);
  //   return this.isManage;
  // }
  i:number;

  getUsers(): void {
    this.userService.getUsers().subscribe(users =>{ 
      this.users = users
      for( this.i=0 ;this.i<users.length;this.i++){
        this.suggestions[this.i]=users[this.i].email
      }

    });
  }


  onChange(value: string): void {
  }

  onSelect(suggestion: string): void {
    var id=parseInt(localStorage.getItem("project"));
    this.projectService.addUserForProject(suggestion,id).subscribe(data=>{
      this.userService.getUserByProject(id).subscribe(data=>this.userOfProject=data);
      this.inputValue="";     
    });
  }

  isVisibleMember=false;

  showModalMember(idProjectCurrent:number): void {
    this.isVisibleMember = true;
     localStorage.setItem("project",idProjectCurrent+'');
    this.userOfProject=[];  
    var id=parseInt(localStorage.getItem("project"));
    this.userService.getUserByProject(id).subscribe(data=>this.userOfProject=data);
  }

  removeUser(email:string){
    var id=parseInt(localStorage.getItem("project"));
    this.projectService.removeUserForProject(email,id).subscribe(data=>{
      this.userService.getUserByProject(id).subscribe(data=>this.userOfProject=data);
    })
  }

  memberCancel():void{
    this.isVisibleMember=false;
  }
  memberSubmit():void{
    this.isVisibleMember=false;
  }

  cancel(): void {
    this.nzMessageService.info('click cancel');
  }

}
