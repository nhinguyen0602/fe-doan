import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ProjectAdminComponent} from './project-admin.component';

const routes: Routes = [
   { path: '', component: ProjectAdminComponent },
  ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectAdminRoutingModule { }
