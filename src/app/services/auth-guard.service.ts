import { Injectable } from '@angular/core';
import { AuthService } from './auth/auth.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {

  constructor(private authService: AuthService, private router: Router) { }
  canActivate(): boolean {
    console.log(document.cookie.includes("token"))
    if (this.authService.isAuthenticated()) {
      return true
    } else {
      this.router.navigate(["/log-in"])
      return false
    }
  }
}
