import { Component, OnInit } from '@angular/core';

import { DayOff } from 'src/app/shared/models/day-off';
import { TypeDay } from 'src/app/shared/models/type-day';
import { DayoffService } from 'src/app/core/services/dayoff.service';
import { UserService } from 'src/app/core/services/user.service';
import { User } from 'src/app/shared/models/user';
import {Status} from 'src/app/shared/enum/status';
import { Router } from '@angular/router';
import { Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { from } from 'rxjs';

@Component({
  selector: 'app-dayoff',
  templateUrl: './dayoff.component.html',
  styleUrls: ['./dayoff.component.scss']
})
export class DayoffComponent implements OnInit {

  optionList = [{ label: '2019', value: '2019' }, { label: '2020', value: '2020' }];
  selectedValue = { label: '2019', value: '2019' };
  compareFn = (o1: any, o2: any) => (o1 && o2 ? o1.value === o2.value : o1 === o2);

  data: DayOff[];
  dayoff: DayOff;
  dayOffTypes: TypeDay[] = [];
  dayOffType: TypeDay;
  users: User[];
  year: number = 2019;
  idUser: number;

  constructor(
    private dayOffService: DayoffService,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.getUsers();
  }

  log(event) {
    this.year = event.value;
  }

  getUsers(): void {
    this.userService.getUsers().subscribe(users => this.users = users);
  }

  getDayOffByUser(id: number) {
    this.data = [];
    this.dayOffService.getDayOffByUser(id, this.year).subscribe(data => this.data = data);
  }

  isVisibleDayOff = false;

  showModalDayOff(id: number): void {
    this.isVisibleDayOff = true;
    this.dayOffService.getDayOff(id).subscribe(data => this.dayoff = data);
    console.log(id)
  }

  acceptDayOff(id: number): void {
    this.isVisibleDayOff = false;
    this.dayOffService.getDayOff(id).subscribe(data => this.dayoff = data);
    this.dayOffService.acceptDayOff(this.dayoff).subscribe(dayoff => this.dayoff = dayoff);
  }
  handleCancelDayOff(): void {
    this.isVisibleDayOff = false;
  }

  isVisibleDayOff1 = false;

  reject(id: number): void {
    this.isVisibleDayOff1 = true;
    // const id = +data.id;
    this.dayOffService.getDayOff(id).subscribe(data => this.dayoff = data);
  }

  rejectedDayOff(id: number): void {
    this.isVisibleDayOff1 = false;
    this.dayOffService.getDayOff(id).subscribe(data => this.dayoff = data);
    this.dayOffService.rejectDayOff(this.dayoff).subscribe(dayoff => this.dayoff = dayoff);
  }
  handleCancelDayOff1(): void {
    this.isVisibleDayOff1 = false;
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
