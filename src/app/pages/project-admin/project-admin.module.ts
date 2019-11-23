import { ProjectAdminRoutingModule } from './project-admin-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectAdminComponent } from './project-admin.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [ProjectAdminComponent],
  imports: [
    CommonModule,
    ProjectAdminRoutingModule,
    SharedModule
  ],
  exports:[ProjectAdminComponent]
    
})
export class ProjectAdminModule { }
