import { HttpInterceptor, HttpRequest, HttpHandler, HttpParams, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { take, exhaustMap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { User } from './user.model';
@Injectable() // don't put providedIn: root here as it is an interceptor and needs to be specifically configured in providers array in app.module.ts file
export class JwtInterceptorService implements HttpInterceptor{
    constructor(private authService: AuthService){}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<any>{
        return this.authService.userStateChanged.pipe(
            take(1), // take the latest value from userStateChanged observable
            exhaustMap(user => { // we need to return next.handle(req), which is an observable. userStateChanged is also an observable and we need it for token
                                // we use exhaustMap to pipe together both the observables to create one big observable
                if(!user){// if login or signup req 
                    return next.handle(req);// if login didn't happen, our userStateChanged behavior subject's initial value is null
                }
                if(!JSON.parse(localStorage.getItem('loadedUser'))){
                    return next.handle(req);// if user logged out from 2nd tab, we don't allow requests with token to go to server
                }
                const modifiedReq = req.clone({
                    'params': new HttpParams().set('auth', user.token)
                })
                return next.handle(modifiedReq);
            })
        )// logic of instructor.
        
        //my own logic. what if unsubscribe is called before subscribe as subscribe is async. so not recomm.We do need 
        //to unsubscibe to avoid mem leaks

        // let loadedUser: User;
        // const userStateChangeSubscription = this.authService.userStateChanged.subscribe(user => {
        //     loadedUser = user;
        // });
        // userStateChangeSubscription.unsubscribe();
        // if(!loadedUser){
        //     return next.handle(req);
        // }
        // else{
        //     const modifiedReq = req.clone({
        //         params: new HttpParams().set('auth', loadedUser.token)
        //     })
        //     return next.handle(modifiedReq);
        // }
    }
}