import { Injectable } from '@angular/core';
import {AuthService} from '../services/auth.service';
import {CanActivate, CanLoad, Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate, CanLoad {

  constructor(
    public auth: AuthService,
    public router: Router
  ) {
  }

  canActivate(): boolean {
    if (!this.auth.isAuthenticated()) {
      this.router.navigate(['login']);
      return false;
    }
    return true;
  }

  canLoad(): boolean {
    return this.canActivate();
  }
}
