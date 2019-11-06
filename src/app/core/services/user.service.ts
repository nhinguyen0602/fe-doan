import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { User } from 'src/app/shared/models/user';
import { tap, map, catchError } from 'rxjs/operators';
import { AlertService } from './alert.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private serverUrl = "https://helpdesk-kunlez-novahub.herokuapp.com/api/users"

  httOptions={
    headers: new HttpHeaders({
      'Context-Type': 'application/json'
    })
  };
  constructor(
    private http: HttpClient,
    private alertService: AlertService
  ) {  }

  
  /** GET list items of user from server. Will 404 if id is not found */
  
  
}