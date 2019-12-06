import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SharedModule } from "src/app/shared/shared.module";

import { ProfileComponent } from "./profile.component";
import { ProfileRoutingModule } from "./profile-routing.module";

import { ShowProfileComponent } from "./components/show-profile/show-profile.component";
import { ShowSkillsComponent } from "./components/show-skills/show-skills.component";

import { NzCardModule } from "ng-zorro-antd/card";
import { NzButtonModule } from "ng-zorro-antd/button";
import { NzTagModule } from "ng-zorro-antd/tag";
import { NzToolTipModule } from "ng-zorro-antd/tooltip";
import { NzModalModule } from "ng-zorro-antd/modal";
import { EditProfileComponent } from "./components/edit-profile/edit-profile.component";
import { NzInputNumberModule } from "ng-zorro-antd/input-number";
import { NzSelectModule } from "ng-zorro-antd/select";
import { NzDatePickerModule } from "ng-zorro-antd/date-picker";
import { NzIconModule } from "ng-zorro-antd/icon";
import { EditSkillsComponent } from "./components/edit-skills/edit-skills.component";
import { NzRadioModule } from "ng-zorro-antd/radio";
import { NzUploadModule } from "ng-zorro-antd/upload";
import { NzNotificationModule } from "ng-zorro-antd/notification";
import { NzMessageModule } from "ng-zorro-antd/message";
@NgModule({
  declarations: [
    ProfileComponent,
    ShowProfileComponent,
    ShowSkillsComponent,
    EditProfileComponent,
    EditSkillsComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ProfileRoutingModule,
    NzCardModule,
    NzButtonModule,
    NzTagModule,
    NzToolTipModule,
    NzModalModule,
    NzInputNumberModule,
    NzSelectModule,
    NzDatePickerModule,
    NzIconModule,
    NzRadioModule,
    NzUploadModule,
    NzNotificationModule,
    NzMessageModule
  ],
  exports: [ProfileComponent]
})
export class ProfileModule {}
