import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

import { Profile } from "../../../../shared/models/profile";
import { environment } from "src/environments/environment";
@Injectable({
  providedIn: "root"
})
export class ShowProfileService {
  constructor(private http: HttpClient) {}

  getProfileFollowId(id: number): Observable<Profile> {
    let api = environment.apiUrl + "/profiles/user?idUser=" + id;
    return this.http.get<Profile>(api);
  }
}
