import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { User } from 'src/app/shared/models/user';
import { HttpClient, HttpErrorResponse, HttpHandler, HttpHeaders } from '@angular/common/http';
import { Token } from '../../shared/models/token';
import { templateJitUrl } from '@angular/compiler';
import { stringify } from 'querystring';
import { NzAffixComponent, responsiveMap } from 'ng-zorro-antd';
import { Profile } from 'src/app/shared/models/profile';
import { environment } from 'src/environments/environment';
import {JwtHelperService} from '@auth0/angular-jwt';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  serverUrl = environment.apiUrl + '/auth';
  errorData: {};
  redirectUrl: string;

  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  constructor(
    private http: HttpClient,
    public jwtHelper: JwtHelperService,
    private tokenService : TokenService
  ) {  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occured: ', error.error.message);
    } else {
      console.log(error);
    }
    this.errorData = {
      errorTitle: 'Request failed',
    };
    return throwError(this.errorData);
  }

  loginGoogle(token: string): Observable<Token> {
    const httpOptions = {
      headers: new HttpHeaders({
        'token-google': token
      })
    };

    return this.http.get<any>(`${environment.apiUrl}/auth`, httpOptions);
  }

  isLoggedIn(): boolean {
    if (localStorage.getItem('currentUser')) {
      return true;
    }
    return false;
  }

  getAuthentication() {
    const currentUser = localStorage.getItem('currentUser');
    return currentUser;
  }

  getToken(): string {
    const temp = localStorage.getItem('currentUser').split(' ');
    return temp[1];
  }

  getTokenGoogle() {
    const tokenValue = JSON.parse(this.getToken());
    return tokenValue.token;
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  getProfileCurrent(): Observable<Profile> {
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + this.getAuthentication()
      })
    };

    return this.http.get<Profile>(`${environment.apiUrl}/profiles`, httpOptions);
  }

  public isAuthenticated(): boolean {
    const token = localStorage.getItem('currentUser');
    return !this.jwtHelper.isTokenExpired(token);
  }

  public isAdmin() : boolean {
    if (
      this.getAuthentication() !== null &&
      this.tokenService
        .parseJwt(this.getAuthentication())
        .scopes.includes("ROLE_ADMIN")
    ) {
      return true;
    }
    return false;
  }
}
