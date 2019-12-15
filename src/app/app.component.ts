import { CommonService } from './pages/profile/service/common/common.service';
import { Profile } from './shared/models/profile';
import { ShowProfileService } from './pages/profile/service/show-profile/show-profile.service';
import {Component} from '@angular/core';
import {AuthService} from './core/services/auth.service';
import {Router} from '@angular/router';
import { LoadingBarService } from '@ngx-loading-bar/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  isCollapsed: boolean;
  isAdminLoggin: boolean;
  public profilee: Profile;
  constructor(private authService: AuthService, private router: Router,private showProfileService: ShowProfileService,public loader: LoadingBarService) {
  }
  ngOnInit() {
  }

  public isLogged(): boolean {
    this.isAdminLoggin = this.authService.isAdmin();
    return this.authService.isLoggedIn();
  }

  public logout(): void {

    localStorage.removeItem("currentUser");
    this.isAdminLoggin = false;
    this.router.navigate(["/login"]);
  }
  public profile(): void {
    this.authService.getProfileCurrent().subscribe(
      data => {
        this.router.navigate(["/profile/" + data.id]);
      },
      error => {}
    );
  }
  
}
