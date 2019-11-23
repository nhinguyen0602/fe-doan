import { Injectable } from '@angular/core';
import {AuthService} from '../services/auth.service';
import {CanActivate, CanLoad, Router} from '@angular/router';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NoGuardService implements CanActivate, CanLoad {

  constructor(
    private auth: AuthService,
    private router: Router
  ) { }

  canActivate() {
    if (!this.auth.isAuthenticated()) {
      return true;
    }
    this.router.navigate(['/welcome']);
    return false;
  }

  canLoad(): Observable<boolean> | Promise<boolean> | boolean {
    return this.canActivate();
  }
}
