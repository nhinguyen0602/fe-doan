import { UserService } from 'src/app/core/services/user.service';
import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/shared/models/user';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  constructor(
    private userService:UserService
  ) { }

  users :User[]=[]

  ngOnInit() {
    this.getAllUser();
  }

  getAllUser(){
    this.userService.getUsers().subscribe(data=>this.users=data)
  }

  updateManage(id:number){
    this.userService.updateRole(id,"ROLE_MANAGE").subscribe(data=>{
      this.getAllUser();
    })
  }

  updateAdmin(id:number){
    this.userService.updateRole(id,"ROLE_ADMIN").subscribe(data=>{
      this.getAllUser();
    })
  }

}
