import { Router } from '@angular/router';
import { AuthService } from './../../core/services/auth.service';
import { Profile } from './../../shared/models/profile';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.scss']
})
export class MyProfileComponent implements OnInit {

  public profile: Profile;
  isAdminLoggin: boolean;
  constructor(
    private authService: AuthService,
    private router: Router
  ) { }
  

  ngOnInit() {
    this.loadProfile();
  }

  loadProfile() {
    this.authService.getProfileCurrent().subscribe(data=>{
      this.profile=data;
      console.log("hhhhaaaa:"+data);
    });
  }

  public profilee(): void {
    this.authService.getProfileCurrent().subscribe(
      data => {
        this.router.navigate(["/profile/" + data.id]);
      },
      error => {}
    );
  }

  public logout(): void {

    localStorage.removeItem("currentUser");
    // this.isAdminLoggin = false;
    this.router.navigate(["/login"]);
  }

}
