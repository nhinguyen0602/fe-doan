import {Component} from '@angular/core';
import {AuthService} from './core/services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  isCollapsed: boolean;
  isAdminLoggin: boolean;
  constructor(private authService: AuthService, private router: Router) {
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
