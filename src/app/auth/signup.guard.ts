import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { take, map} from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class SignupGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router){}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    // if already logged in and user tries to access /login or /signup
    // basically opposite of auth.guard.ts
    return this.authService.userStateChanged.pipe(
      take(1),
      map(user => {
        if(user === null)
           return true;
        else
            return this.router.createUrlTree(['/']);
      })
    )
    
  }
  
}
