import { Component, OnInit } from '@angular/core';
import { ProjectService } from 'src/app/core/services/project.service';
import { Project } from 'src/app/shared/models/project';

@Component({
  selector: 'app-project-admin',
  templateUrl: './project-admin.component.html',
  styleUrls: ['./project-admin.component.scss']
})
export class ProjectAdminComponent implements OnInit {

  constructor(
    private projectService:ProjectService
  ) { }
  
  data:Project[]=[];
  ngOnInit() {
    this.getProjects();
  }
  getProjects(){
    this.projectService.getProjects().subscribe(data=>this.data=data);
  }

  checkStatus(status: string) {
    if (status == 'PENDING') {
      return true;
    } else {
      return false;
    }
  }

  isVisibleDayOff = false;

  showModalDayOff(id:number): void {
    this.isVisibleDayOff = true;
    localStorage.setItem("idProject",id+'');
  }

  acceptDayOff(): void {
    this.isVisibleDayOff = false;
    var id=parseInt(localStorage.getItem("idProject"));
    this.projectService.acceptProject(id).subscribe(data=>{
      this.getProjects();
    })
  }
  handleCancelDayOff(): void {
    this.isVisibleDayOff = false;
  }

  isVisibleDayOff1 = false;

  reject(id:number): void {
    this.isVisibleDayOff1 = true;
    localStorage.setItem("idProject",id+'');
  }

  rejectedDayOff(): void {
    this.isVisibleDayOff1 = false;
    var id=parseInt(localStorage.getItem("idProject"));
    this.projectService.rejectProject(id).subscribe(data=>{
      this.getProjects();
    })
  }
  handleCancelDayOff1(): void {
    this.isVisibleDayOff1 = false;
  }

}
