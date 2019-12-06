import { Component, OnInit } from '@angular/core';
import { DayofftypeService } from 'src/app/core/services/dayofftype.service';
import { TypeDay } from 'src/app/shared/models/type-day';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-dayofftype',
  templateUrl: './dayofftype.component.html',
  styleUrls: ['./dayofftype.component.scss']
})
export class DayofftypeComponent implements OnInit {

  data: TypeDay[] = []
  dayOffTypes: TypeDay[] = [];
  dayOffType: TypeDay;
  

  constructor(
    private location: Location,
    private dayOffTypeService: DayofftypeService,
    private router: ActivatedRoute
  ) { }

  ngOnInit() {
    this.getDayOffType();
  }

  getDayOffType(): void {
    this.dayOffTypeService.getDayOffType().subscribe(dayOffTypes => this.data = dayOffTypes);
  }

  isVisible = false;
  name: string;

  showModal(): void {
    this.isVisible = true;
  }

  handleOk(): void {
    this.isVisible = false;
    this.dayOffTypeService.addDayOffType(this.name)
      .subscribe(dayOffType => {
        this.data = [...this.data, dayOffType]
        this.name=''
      });
  }

  handleCancel(): void {
    this.isVisible = false;
  }

  isVisibleEdit = false;
  nameEdit: string;
  loading: boolean = false;

  showModalEdit(data: TypeDay): void {

    this.isVisibleEdit = true;
    const id = +data.id;
    this.dayOffTypeService.getTypeDay(id).subscribe(dayofftype => this.dayOffType = dayofftype);
  }

  handleOkEdit(dayOffType: TypeDay): void {
    this.isVisibleEdit = false;
    this.data=this.data.filter((value,key)=>{
      if(value.id == dayOffType.id){
        value.name = dayOffType.name;
        this.dayOffTypeService.updateDayOffType(dayOffType).subscribe(dayofftype => this.dayOffType = dayofftype);
      }
      return true;
    })
  }

  handleCancelEdit(): void {
    this.isVisibleEdit = false;
  }
  checkData(name:string){
    // name=name.trim();
    return name!='';
  }

}
