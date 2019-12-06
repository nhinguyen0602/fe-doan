import { Component, OnInit, TemplateRef, OnDestroy } from "@angular/core";
import { Skill } from "src/app/shared/models/skill";
import { ShowSkillsService } from "../../service/show-skills/show-skills.service";
import { Category } from "src/app/shared/models/category";
import { EditSkillsService } from "../../service/edit-skills/edit-skills.service";
import { ShowProfileService } from "../../service/show-profile/show-profile.service";
import { EditProfileService } from "../../service/edit-profile/edit-profile.service";
import { NzModalService } from "ng-zorro-antd/modal";
import { CommonService } from "../../service/common/common.service";
import { NzNotificationService } from "ng-zorro-antd/notification";
import { NzMessageService } from "ng-zorro-antd/message";

@Component({
  selector: "app-edit-skills",
  templateUrl: "./edit-skills.component.html",
  styleUrls: ["./edit-skills.component.scss"]
})
export class EditSkillsComponent implements OnInit {
  public listOfTagOptions: Skill[];
  public validateForm = false;
  private idUrl = this.commonService.getIdProfileInParams();
  public skills: Skill[];
  public categories: Category[];
  private skillFollowCategories: Skill[];
  public selectedCategory: Category = null;
  public listSkillFollowCategories: Skill[];
  public notifitionText: string;
  value: string;

  constructor(
    private showSkillService: ShowSkillsService,
    private editSkillService: EditSkillsService,
    private showProfileService: ShowProfileService,
    private editProfileService: EditProfileService,
    private modalService: NzModalService,
    private commonService: CommonService,
    private notification: NzNotificationService,
    private message: NzMessageService
  ) {}

  ngOnInit() {
    this.loadSkills();
    this.loadAllCategories();
  }

  public loadAllCategories() {
    this.editSkillService.getAllCategoriesForSkill().subscribe(
      data => {
        this.categories = data;
      },
      error => {
        this.message.error("[ERROR] load list categories of skill");
      }
    );
  }

  public loadSkills() {
    this.showSkillService.getSkillFollowIdUser(this.idUrl).subscribe(
      data => {
        this.skills = data;
      },
      error => {
        this.message.error("[ERORR] load list skill");
      }
    );
  }

  public loadSkillsFollowIdCategories(idCategories: number) {
    this.editSkillService.loadSkillsFollowIdCategories(idCategories).subscribe(
      data => {
        this.skillFollowCategories = data;
      },
      error => {
        this.message.error("[ERROR] load skills follow categories");
      }
    );
  }

  public changeCategories(value: {
    label: string;
    value: Category;
    age: number;
  }): void {
    this.editSkillService
      .loadSkillsFollowIdCategories(this.selectedCategory.id)
      .subscribe(
        data => {
          this.listSkillFollowCategories = data;
        },
        error => {
          this.message.error("[ERROR] change categories");
        }
      );
  }

  public onClickUpSkills(template: TemplateRef<{}>) {
    for (let i = 0; i < this.listOfTagOptions.length; i++) {
      if (this.listOfTagOptions[i].id != null) {
        this.skills.push(this.listOfTagOptions[i]);
      } else {
        let nameSkill = this.listOfTagOptions[i] + "";

        if (nameSkill.length > 70) {
          this.notifitionText = "data lager";
          this.notification.template(template);
        } else {
          if (!this.skillIsExistFollowName(nameSkill)) {
            if (this.selectedCategory == null) {
              if (this.selectedCategory == null) {
              }
            }
            this.skills.push(
              new Skill({
                id: 0,
                name: nameSkill,
                categories: this.selectedCategory
              })
            );
          }
        }
      }
    }
  }

  public onSaveSkills() {
    const modal = this.modalService.success({
      nzTitle: "Skills saving",
      nzContent: "Waiting................"
    });
    setTimeout(() => modal.destroy(), 2000);
    this.showProfileService.getProfileFollowId(this.idUrl).subscribe(
      data => {
        data.skills = this.skills;
        this.editProfileService.editProfile(data).subscribe(
          data => {
            const modal = this.modalService.success({
              nzTitle: "SUSCESS",
              nzContent: "Save skills is suscess"
            });
            setTimeout(() => modal.destroy(), 1000);
          },
          error => {
            this.message.error("[ERROR] Edit profile");
          }
        );
      },
      error => {
        this.message.error("[ERROR] Save skill for user");
      }
    );
  }
  public skillIsExistFollowName(nameSkill: string): boolean {
    for (let i = 0; i < this.skills.length; ++i) {
      if (this.skills[i].name.toLowerCase() == nameSkill.toLowerCase()) {
        return true;
      }
    }
    return false;
  }
  public onCloseTagSkill(skill: Skill) {
    let indexDelete = this.getIndexSkillsFollowName(skill.name);
    this.skills.splice(indexDelete, indexDelete + 1);
  }

  public getIndexSkillsFollowName(name: String): number {
    for (let i = 0; i < this.skills.length; ++i) {
      if (name === this.skills[i].name) {
        return i;
      }
    }
    return -1;
  }

  public onChangeValidate(value: string) {
    if (
      this.selectedCategory != null &&
      this.listOfTagOptions != null &&
      this.listOfTagOptions.length != 0
    ) {
      if (this.isMaxValue(value[value.length - 1], 70)) {
        this.validateForm = false;
        this.message.error(
          "The skill is less than 70 characters long!!! Thank"
        );
      } else {
        this.validateForm = true;
      }
    } else {
      this.validateForm = false;
    }
  }

  public isMaxValue(value: string, count: number): boolean {
    if (value.length > count) {
      return true;
    }
    return false;
  }

}
