import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { take, map} from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router){}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    // her we can return an observable, so lets leverage that.
    // we take userStateChange observable, map the data of user to boolean or UrlTree using pipe and return the new observable
    // as return value of canActivate

    return this.authService.userStateChanged.pipe(
      take(1),// since our observable is user defined and we just return the observable here, same with interceptor,
      // angular may not unsubscribe it. To avoid mem leaks, we use take operator to unsubscribe to all userStateChanged
      // observables and consider only the latest one for this operation
      map(user => {
        const loadedGlobalUser = JSON.parse(localStorage.getItem('loadedUser'));// for avoiding access to routes in tab2 when user logs out in tab1
        if(user && loadedGlobalUser)
         return true; // transformed to Observable<boolean> from Observable<User>
        else{
          this.authService.logout();// log out happend from someother tab, lets log out here also
          return this.router.createUrlTree(['/login']);// we can use router.navigate also
        }
      })
      
    )
  }
  
}
