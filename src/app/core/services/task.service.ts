import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { AlertService } from './alert.service';
import { catchError } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { Task } from 'src/app/shared/models/task';



@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private taskUrl = environment.apiUrl + "/tasks"

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

  getTask(id:number):Observable<Task>{
    const url=`${this.taskUrl}/${id}`;
    return this.http.get<Task>(url,this.httpOptions).pipe(
      catchError(this.handleError<Task>('getTask'))                              
    )
  }

  getTaskByCard(id:number):Observable<Task[]>{
    const url=`${this.taskUrl}/card/${id}`;
    return this.http.get<Task[]>(url,this.httpOptions).pipe(
      catchError(this.handleError<Task[]>('getTasksByCard'))                              
    )
  }
  replaceTask(idOld:number,idNew:number,idCard:number):Observable<Task>{
    const url=`${this.taskUrl}/replace_task/${idOld}/new_task/${idNew}/task/${idCard}`;
    return this.http.put<Task>(url,this.httpOptions).pipe(
      catchError(this.handleError<Task>('replaceTask'))
    )
  }

  addTask(task:Task,id:number):Observable<Task>{
    const url=`${this.taskUrl}/${id}`;
    return this.http.post<Task>(url,task).pipe(
      catchError(this.handleError<Task>('addTask'))
    )
  }

  editTask(id:number,description:string):Observable<Task>{
    const url=`${this.taskUrl}/${id}`;
    return this.http.put<Task>(url,{description}).pipe(
      catchError(this.handleError<Task>('editTask'))
    )
  }

  deleteTask(id:number):Observable<Task[]>{
    const url=`${this.taskUrl}/${id}`;
    return this.http.delete<Task[]>(url).pipe(
      catchError(this.handleError<Task[]>('deleteTask'))
    )
  }


}
