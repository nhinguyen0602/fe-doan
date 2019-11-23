import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { AlertService } from './alert.service';
import { DayOff } from 'src/app/shared/models/day-off';
import { catchError } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { Project } from 'src/app/shared/models/project';



@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  private projectUrl = environment.apiUrl + "/projects"

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

  getProjects():Observable<Project[]>{
    return this.http.get<Project[]>(this.projectUrl, this.httpOptions).pipe(
      catchError(this.handleError<Project[]>('getProjects'))
    );
   }


   getProjectByUser(id:number):Observable<Project[]>{
    const url = `${this.projectUrl}/user/${id}`;
    return this.http.get<Project[]>(url, this.httpOptions).pipe(
      catchError(this.handleError<Project[]>('getProjectByUser'))
    );
   }

   addProject(project: Project) {
    return this.http.post(this.projectUrl, project).pipe(
      catchError(this.handleError<Project>('addProject'))
    );
  }

  getProjectById(id:number):Observable<Project>{
    const url = `${this.projectUrl}/${id}`;
    console.log(url);
    return this.http.get<Project>(url, this.httpOptions).pipe(
      catchError(this.handleError<Project>('getProjectById'))
    );
  }
  
  addUserForProject(email:string,id:number){
    const url = `${this.projectUrl}/add_user/${id}?email=${email}`;
    console.log(url);
    return this.http.put(url,this.httpOptions).pipe(
      catchError(this.handleError<string>('addUserForProject'))
    )
  }
  
  removeUserForProject(email:string,id:number){
    const url = `${this.projectUrl}/remove_user/${id}?email=${email}`;
    console.log(url);
    return this.http.put(url,this.httpOptions).pipe(
      catchError(this.handleError<string>('removeUserForProject'))
    )
  }

  acceptProject(id:number){
    const url = `${this.projectUrl}/accept/${id}`;
    return this.http.put(url,this.httpOptions).pipe(
      catchError(this.handleError<Project>('acceptProject'))
    )
  }

  rejectProject(id:number){
    const url = `${this.projectUrl}/reject/${id}`;
    return this.http.put(url,this.httpOptions).pipe(
      catchError(this.handleError<Project>('rejectProject'))
    )
  }


}
