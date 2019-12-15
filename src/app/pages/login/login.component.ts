import { UserService } from 'src/app/core/services/user.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd';
import { ShowProfileService } from './../profile/service/show-profile/show-profile.service';
import { Component, OnInit, NgZone, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { AlertService } from 'src/app/core/services/alert.service';
import { first } from 'rxjs/operators';
import { element } from 'protractor';
import { TokenService } from 'src/app/core/services/token.service';

declare const gapi: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  submitted = false;
  loading: boolean = false;
  returnUrl: string;

  clientId: string = '10558520426-5epndmc1a1dgsjvffftbvn60rr6521hh.apps.googleusercontent.com';
  loginError: string;
  error: {};
  validateForm: FormGroup;

  private scope = [
    'profile',
    'email',
    'https://www.googleapis.com/auth/plus.me',
    'https://www.googleapis.com/auth/contacts.readonly',
    'https://www.googleapis.com/auth/admin.directory.user.readonly'
  ].join(' ');

  constructor(
    private token: TokenService,
    private router: Router,
    private authService: AuthService,
    private ngZone: NgZone,
    private element: ElementRef,
    private alertService: AlertService,
    private showProfileService: ShowProfileService,
    public message: NzMessageService,
    private fb: FormBuilder,
    private userService:UserService
  ) {

    // console.log('ElementRef: ', this.element);

    // //redirect to home if logged
    // if (this.authService.currentUser) {
    //   this.router.navigate[('/project')];
    // }
  }

  ngOnInit() {
    this.googleInit();
    this.validateForm = this.fb.group({
      email: [null, [Validators.required]],
      password: [null, [Validators.required]],
      remember: [true]
    });
  }

  get email() { return this.validateForm.get('email'); }
  get password() { return this.validateForm.get('password'); }

  submitForm(): void {
    if (this.validateForm.invalid) {
      return;
    }
    let valueForm = this.validateForm.value
    this.userService.login(this.email.value,this.password.value).subscribe(data => {
      this.ngZone.run(() => this.router.navigate(['/project'])).then();
       var token = data.accessToken;
      localStorage.setItem('currentUser', token);
    },
    error => {
      this.message.error('Login failed');
    }
    );
    this.validateForm.reset();
  }

  public auth2: any;

  public googleInit() {
    gapi.load('auth2', () => {
      this.auth2 = gapi.auth2.init({
        clientId: '10558520426-5epndmc1a1dgsjvffftbvn60rr6521hh.apps.googleusercontent.com',
        cookiepolicy: 'single_host_origin',
        scope: 'profile email'
      });
      this.attachSigin(document.getElementById('google-button'));
    });
  }

  public attachSigin(element) {
    this.auth2.attachClickHandler(element, {},
      (googleUser) => {
        let profile = googleUser.getBasicProfile();
        console.log('Token|| ' + googleUser.getAuthResponse().id_token);
        console.log('ID: ' + profile.getId());
        console.log('Name: ' + profile.getName());
        console.log('Email: ' + profile.getEmail());
        
        this.authService.loginGoogle(googleUser.getAuthResponse().id_token)
        .subscribe(data => {
          this.ngZone.run(() => this.router.navigate(['/project'])).then();
          let token = data.accessToken;
          localStorage.setItem('currentUser', token);
        },
        error => {
          if (error.status === 406) {
            this.message.error('Email is not Novahub email');
          } else {
            this.message.error(`${error.error}`);
          }
        }
        );
      
      });
      
  }

  ngAfterViewInit() {
    this.googleInit();
  }
}