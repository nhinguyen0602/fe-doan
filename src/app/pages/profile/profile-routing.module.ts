import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ProfileComponent } from "./profile.component";
import { ShowSkillsComponent } from "./components/show-skills/show-skills.component";
import { EditSkillsComponent } from "./components/edit-skills/edit-skills.component";
const routes: Routes = [
  {
    path: "",
    component: ProfileComponent,
    children: [
      {
        path: "",
        component: ShowSkillsComponent
      },
      {
        path: "edit",
        component: EditSkillsComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule {}
