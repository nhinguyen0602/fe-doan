import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { Category } from "src/app/shared/models/category";
import { Skill } from "src/app/shared/models/skill";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root"
})
export class EditSkillsService {
  constructor(private http: HttpClient) {}

  getAllCategoriesForSkill(): Observable<Category[]> {
    let api = environment.apiUrl + "/categories";
    return this.http.get<Category[]>(api);
  }

  loadSkillsFollowIdCategories(idCategories: number): Observable<Skill[]> {
    let api =
      environment.apiUrl + "/skills/categories?idCategories=" + idCategories;
    return this.http.get<Skill[]>(api);
  }
}
