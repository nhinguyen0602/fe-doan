import { NgModule } from '@angular/core';

import { LoginRoutingModule } from './login-routing.module';

import { LoginComponent } from './login.component';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import {NzTimePickerModule} from 'ng-zorro-antd';


@NgModule({
  imports: [CommonModule, SharedModule, LoginRoutingModule, NzTimePickerModule],
  declarations: [ LoginComponent],
  exports: [LoginComponent]
})
export class LoginModule { }
