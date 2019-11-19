import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { Profile } from "../../../../shared/models/profile";
import { TokenService } from "src/app/core/services/token.service";
import { environment } from "src/environments/environment";
@Injectable({
  providedIn: "root"
})
export class ShowUserService {
  constructor(private http: HttpClient, private tokenService: TokenService) {}

  getListProfile(): Observable<Profile[]> { 
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: "Bearer " + this.tokenService.getToken
      })
    };
    let api = environment.apiUrl + "/users";
    return this.http.get<Profile[]>(api, httpOptions);
  }
}
