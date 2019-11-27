import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatNativeDateModule } from '@angular/material/core';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzButtonModule } from 'ng-zorro-antd/button';
import {TableModule} from 'primeng/table';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzBadgeModule } from 'ng-zorro-antd/badge';
import { NzCollapseModule } from 'ng-zorro-antd/collapse';
import { NzEmptyModule } from 'ng-zorro-antd/empty';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { NzMentionModule } from 'ng-zorro-antd/mention';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzAlertModule } from 'ng-zorro-antd/alert';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzProgressModule } from 'ng-zorro-antd/progress';
import { NzPopoverModule } from 'ng-zorro-antd/popover';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { NzCommentModule } from 'ng-zorro-antd/comment';
import { NzListModule } from 'ng-zorro-antd/list';

@NgModule({
  declarations: [],
  imports: [CommonModule, MatNativeDateModule,FormsModule,NzFormModule,ReactiveFormsModule,NzBadgeModule,NzCollapseModule,NzEmptyModule],
  exports: [

    // Material
    NzModalModule,
    TableModule,
    NzInputModule,
    NzDatePickerModule,
    NzFormModule,
    NzTableModule,
    NzGridModule,
    NzButtonModule,
    NzDropDownModule,
    NzSelectModule,
    NzBadgeModule,
    ReactiveFormsModule,
    NzCollapseModule,
    NzEmptyModule,
    NzSpinModule,
    NzCardModule,
    NzIconModule,
    NzTabsModule,
    NzMentionModule,
    NzAvatarModule,
    NzAlertModule,
    NzCheckboxModule,
    NzProgressModule,
    NzPopoverModule,
    NzPopconfirmModule,
    NzCommentModule,
    NzListModule
  ]
})
export class AppMaterialModule {
}
