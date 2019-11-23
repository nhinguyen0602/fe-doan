import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { AlertService } from './alert.service';
import { DayOff } from 'src/app/shared/models/day-off';
import { catchError } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { Project } from 'src/app/shared/models/project';
import { Card } from 'src/app/shared/models/card';



@Injectable({
  providedIn: 'root'
})
export class CardService {

  private cardUrl = environment.apiUrl + "/cards"

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

  getCardByProject(id:number):Observable<Card[]>{
    const url = `${this.cardUrl}/project/${id}`;
    return this.http.get<Card[]>(url,this.httpOptions).pipe(
      catchError(this.handleError<Card[]>('getCardByProject'))
    )
  }

  addCard(card:Card,id:number){
    const url=`${this.cardUrl}/${id}`
    console.log(url)
    return this.http.post(url,card).pipe(
      catchError(this.handleError<Card>('addCard'))
    )
  }
}
