import {Injectable} from '@angular/core';
import {HttpHeaders, HttpClient} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {User} from 'src/app/shared/models/user';
import {tap, map, catchError} from 'rxjs/operators';
import {AlertService} from './alert.service';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private serverUrl = environment.apiUrl + '/users';

  httOptions = {
    headers: new HttpHeaders({
      'Context-Type': 'application/json'
    })
  };

  constructor(
    private http: HttpClient,
    private alertService: AlertService
  ) {
  }


  private handleError<T> (operation ='operation', result?:T){
    return (error: any): Observable<T> => {
       console.error(error);
       this.alertService.error(`${operation} failed: ${error.alertService}`);
      return of(result as T);
    }
  }

  getUsers(): Observable<User[]>{
    return this.http.get<User[]>(this.serverUrl).pipe(
     catchError(this.handleError<User[]>('getUsers'))
    )
  }

  isManage(id:number):Observable<boolean>{
    const url = `${this.serverUrl}/is_manage/${id}`;
    return this.http.get<boolean>(url,this.httOptions).pipe(
      catchError(this.handleError<boolean>('isManage'))
    )
    }

    getUserByProject(id:number):Observable<User[]>{
      const url=`${this.serverUrl}/project/${id}`;
      return this.http.get<User[]>(url).pipe(
        catchError(this.handleError<User[]>('getUsers'))
       )
    }
  /** GET list items of user from server. Will 404 if id is not found */


}
