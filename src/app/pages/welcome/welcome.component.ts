import { Component, OnInit, Input } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DayOff } from 'src/app/shared/models/day-off';
import { AuthService } from 'src/app/core/services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { DayOffService } from 'src/app/core/services/day-off.service';
import { TypeDayOffService } from 'src/app/core/services/type-day-off.service';
import { TypeDay } from 'src/app/shared/models/type-day';
import { AlertService } from 'src/app/core/services/alert.service';
import { DatePipe } from '@angular/common';
import { NzMessageService } from 'ng-zorro-antd/message';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {
  isVisible = false;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private dayOffService: DayOffService,
    private typeService: TypeDayOffService,
    private alertService: AlertService,
    private message: NzMessageService
  ) {}

  get f() {
    return this.requestForm.controls;
  }

  requestForm: FormGroup;

  submitted = false;

  isLoading = false;

  authService: AuthService;
  router: Router;
  data: DayOff[];
  types: TypeDay[];
  type: TypeDay;
  id: number;
  year: number;
  suffixIconButton: any;

  ngOnInit(): void {
    this.getDays();
    this.getAllTypes();

    this.requestForm = this.formBuilder.group({
      dayEndOff: ['', [Validators.required]],
      dayOffType: ['', [Validators.required]],
      dayStartOff: ['', [Validators.required]],
      description: ['', [Validators.required]]
    });
  }

  isLogged(): boolean {
    if (this.authService.isLoggedIn()) {
      return true;
    } else {
      this.router.navigate(['/login']);
    }
  }

  showModal(): void {
    this.isVisible = true;
  }

  handleCancel(): void {
    this.isVisible = false;
  }

  getDays(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.dayOffService.getDayOffs(id).subscribe(data => (this.data = data));
  }

  getAllTypes(): void {
    this.isLoading = true;
    this.typeService.getAllTypes().subscribe(types => {
      this.isLoading = false;
      this.types = types;
    });
  }

  onSubmit() {
    this.submitted = true;
    if (this.isPassValidateForm()) {
      let valueForm = this.getFormatDateTimeForValueForm(
        this.requestForm.value
      );
      this.dayOffService
        .addDayOff(valueForm)
        .pipe(first())
        .subscribe(
          data => {
            this.message.success('Create new day off successful');
            this.getDays();
            this.resetForm(this.requestForm);
          },
          error => {
            this.message.error(`[ERROR] ${error.error.message}`);
          }
        );
      this.isVisible = false;
      return;
    }
    this.message.warning('Please enter full the infomation!');
  }

  isPassValidateForm(): boolean {
    for (const i in this.requestForm.controls) {
      this.requestForm.controls[i].markAsDirty();
      this.requestForm.controls[i].updateValueAndValidity();
    }
    if (this.requestForm.invalid) {
      return false;
    }
    return true;
  }

  getFormatDateTimeForValueForm(valueForm: any) {
    valueForm = {
      ...valueForm,
      dayStartOff: new DatePipe('en-US').transform(
        valueForm.dayStartOff,
        'yyyy-MM-ddTHH:mm:ss'
      ),
      dayEndOff: new DatePipe('en-US').transform(
        valueForm.dayEndOff,
        'yyyy-MM-ddTHH:mm:ss'
      )
    };
    return valueForm;
  }

  getByYear(year: number): void {
    const id = +this.route.snapshot.paramMap.get('id');
    if (!year) {
      this.dayOffService.getDayOffs(id).subscribe(data => (this.data = data));
    } else {
      this.dayOffService
        .getDayOffsByYear(year)
        .subscribe(data => (this.data = [...data]));
    }
  }

  resetForm(form : FormGroup){
    form.reset();
  }

  onChange(result: Date): void {}

  onOk(result: Date): void {}
}