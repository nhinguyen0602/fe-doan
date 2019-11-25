import { Job } from './../../shared/models/job';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { AlertService } from './alert.service';
import { catchError } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class JobService {

  private jobUrl = environment.apiUrl + "/jobs"

  httpOptions = {
    headers: new HttpHeaders({
      'Context-Type': 'application/json',
      'Authorization': 'Bearer '
    })
  };

  constructor(
    private http: HttpClient,
    private alertService: AlertService
  ) {
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      this.alertService.error(`${operation} failed: ${error.alertService}`);
      return of(result as T);
    }
  }

  getJobByTask(id:number):Observable<Job[]>{
    const url=`${this.jobUrl}/task/${id}`;
    return this.http.get<Job[]>(url,this.httpOptions).pipe(
      catchError(this.handleError<Job[]>('getJobBytask'))
    )
  }

  addJob(id:number,job:Job){
    const url=`${this.jobUrl}/task/${id}`;
    return this.http.post<Job>(url,job).pipe(
      catchError(this.handleError<Job>('addJob'))
    )
  }

  deleteJob(id:number){
    const url=`${this.jobUrl}/${id}`;
    return this.http.delete<Job>(url,this.httpOptions).pipe(
      catchError(this.handleError<Job>('deleteJob'))
    )
  }

  changeJob(id:number){
    const url=`${this.jobUrl}/change_status/${id}`;
    return this.http.put<Job>(url,this.httpOptions).pipe(
      catchError(this.handleError<Job>('changeJob'))
    )
  }

  rejectJob(id:number){
    const url=`${this.jobUrl}/reject/${id}`;
    return this.http.put<Job>(url,this.httpOptions).pipe(
      catchError(this.handleError<Job>('rejectJob'))
    )
  }

  getProcess(id:number):Observable<number>{
    const url=`${this.jobUrl}/process/${id}`;
    return this.http.get<number>(url).pipe(
      catchError(this.handleError<number>('getProcess'))
    )
  }

}
