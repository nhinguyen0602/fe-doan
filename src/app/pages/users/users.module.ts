import { UsersRoutingModule } from './users-routing.module';
import { SharedModule } from './../../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersComponent } from './users.component';



@NgModule({
  declarations: [UsersComponent],
  imports: [
    CommonModule,
    SharedModule,
    UsersRoutingModule,
  ]
})
export class UsersModule { }
