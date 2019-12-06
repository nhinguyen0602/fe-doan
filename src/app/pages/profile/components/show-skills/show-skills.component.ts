import { Component, OnInit } from "@angular/core";
import { NzMessageService } from "ng-zorro-antd/message";
import { Skill } from "src/app/shared/models/skill";
import { CommonService } from "../../service/common/common.service";
import { TokenService } from "src/app/core/services/token.service";
import { AuthService } from "src/app/core/services/auth.service";
import { ShowProfileService } from "../../service/show-profile/show-profile.service";
import { Profile } from "src/app/shared/models/profile";

@Component({
  selector: "app-show-skills",
  templateUrl: "./show-skills.component.html",
  styleUrls: ["./show-skills.component.scss"]
})
export class ShowSkillsComponent implements OnInit {
  public skills: Skill[];
  public isUserLogin = false;
  public isEmptySkills: boolean = false;

  constructor(
    private commonService: CommonService,
    private authService: AuthService,
    private tokenService: TokenService,
    private showProfileService: ShowProfileService,
    private message: NzMessageService
  ) {}

  ngOnInit() {
    this.showProfileService
      .getProfileFollowId(this.commonService.getIdProfileInParams())
      .subscribe(
        data => {
          this.skills = data.skills;
          this.checkUserLogin(data);
          this.checkEmptySkill(data.skills);
        },
        error => {
          this.message.error("[ERROR] Show skill");
        }
      );
  }

  checkUserLogin(data: Profile) {
    if (
      this.tokenService
        .parseJwt(this.authService.getAuthentication())
        .scopes.includes("ROLE_ADMIN") ||
      this.tokenService.parseJwt(this.authService.getAuthentication()).sub ==
        data.email
    ) {
      this.isUserLogin = true;
    }
  }

  checkEmptySkill(data: Skill[]) {
    if (data.length === 0 || !data) {
      this.isEmptySkills = true;
    }
  }
}
