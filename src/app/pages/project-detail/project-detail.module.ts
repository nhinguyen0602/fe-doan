import { NgModule } from '@angular/core';

import { ProjectRoutingModule } from './project-detail-routing.module';

import { ProjectDetailComponent } from './project-detail.component';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import {NzTimePickerModule} from 'ng-zorro-antd';



@NgModule({
  imports: [CommonModule, SharedModule, ProjectRoutingModule, NzTimePickerModule],
  declarations: [ ProjectDetailComponent],
  exports: [ProjectDetailComponent]
})
export class ProjectDetailModule { }
