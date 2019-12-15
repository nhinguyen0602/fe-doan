import { Component, OnInit } from '@angular/core';
import { DayOff } from 'src/app/shared/models/day-off';
import { TypeDay } from 'src/app/shared/models/type-day';
import { DayoffService } from 'src/app/core/services/dayoff.service';
import { UserService } from 'src/app/core/services/user.service';
import { Status } from 'src/app/shared/enum/status';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-dayoff',
  templateUrl: './dayoff.component.html',
  styleUrls: ['./dayoff.component.scss']
})
export class DayoffComponent implements OnInit {
  readonly YEAR_START: number = 2000;

  compareFn = (o1: any, o2: any) =>
    o1 && o2 ? o1.value === o2.value : o1 === o2;

  data: DayOff[];
  dayOffTypes: TypeDay[] = [];
  dayOffType: TypeDay;
  year: number;
  panelUser = [];
  selectedValue = null;
  optionList = [];
  idUserActiveCurrent: number;
  isChangeYearDayOff : boolean = false;

  constructor(
    private dayOffService: DayoffService,
    private userService: UserService,
    private message: NzMessageService
  ) {}

  ngOnInit() {
    this.getUsers();
    this.initOptionListYear();
  }

  changeYearDayOff(event) {
    this.year = event.value;
    this.isChangeYearDayOff = true;
    this.getDayOffByIdUser(this.idUserActiveCurrent);
  }

  initOptionListYear() {
    this.initCurrentYear();
    const END_YEAR = this.year;
    for (let i = this.YEAR_START; i <= END_YEAR; ++i) {
      this.optionList.push({
        label: i.toString(),
        value: i.toString()
      });
    }
  }

  initCurrentYear() {
    this.year = new Date().getFullYear();
    this.selectedValue = {
      label: this.year.toString(),
      value: this.year.toString()
    };
  }

  getUsers(): void {
    this.userService.getUsers().subscribe(users => {
      users.forEach(element => {
        this.panelUser.push({
          active: false,
          user: element
        });
      });
    });
  }

  resetPanelUser(id: number): void {
    let panelUserTemp = this.panelUser;
    this.activePanelFollowIdUser(panelUserTemp, id);
    this.panelUser = panelUserTemp;
  }

  activePanelFollowIdUser(panelUser: any, id: number) {
    panelUser.forEach(element => {
      element.active = false;
      if (element.user.id === id) {
        element.active = true;
      }
    });
  }

  getDayOffByIdUser(id: number) {
    //=> purpose if command is avoid event click of nz-collapse-panel for table data dayoff
    if (id != this.idUserActiveCurrent || this.isChangeYearDayOff == true) {
      this.message.loading('Data loading...');
      this.data = [];
      this.idUserActiveCurrent = id;
      this.resetPanelUser(id);
      this.dayOffService.getDayOffByUser(id, this.year).subscribe(data => {
        this.data = data;
        this.isChangeYearDayOff = false;
      });
    }
  }

  acceptDayOff(data: DayOff): void {
    const id = +data.id;
    this.dayOffService.acceptDayOff(id).subscribe(dayoff => {
      this.setStatusDayOffFollowIdStatus(id, Status.approved);
    });
  }

  rejectDayOff(data: DayOff): void {
    const id = +data.id;
    this.dayOffService.rejectDayOff(id).subscribe(dayoff => {
      this.setStatusDayOffFollowIdStatus(id, Status.rejected);
    });
  }

  setStatusDayOffFollowIdStatus(id: number, nameStatus: string) {
    this.data.forEach(element => {
      if (element.id == id) {
        element.status.name = nameStatus;
        this.checkStatus(element.status.name.toString());
      }
      return;
    });
  }

  checkStatus(status: string) {
    if (status == Status.pending) {
      return true;
    } else {
      return false;
    }
  }

  checkData(data: DayOff[]) {
    return !data || !data.length;
  }
}