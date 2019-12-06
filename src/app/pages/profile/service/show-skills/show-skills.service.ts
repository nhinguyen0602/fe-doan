import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { Skill } from "src/app/shared/models/skill";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root"
})
export class ShowSkillsService {
  constructor(private http: HttpClient) {}

  getSkillFollowIdUser(idUser: number): Observable<Skill[]> {
    let api = environment.apiUrl + "/skills/user?idUser=" + idUser;
    return this.http.get<Skill[]>(api);
  }
}
