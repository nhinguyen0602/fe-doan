import { NgModule } from '@angular/core';

import { ProjectRoutingModule } from './project-routing.module';

import { ProjectComponent } from './project.component';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import {NzTimePickerModule} from 'ng-zorro-antd';



@NgModule({
  imports: [CommonModule, SharedModule, ProjectRoutingModule, NzTimePickerModule],
  declarations: [ ProjectComponent],
  exports: [ProjectComponent]
})
export class ProjectModule { }
