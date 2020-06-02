import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, Subject, BehaviorSubject } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { User } from './user.model';
import { Router } from '@angular/router';

import { environment } from '../../environments/environment'; // swapped to environment.prod automatically in production mode
// API DOCS: https://firebase.google.com/docs/reference/rest/auth

interface AuthResponse{ // created from seeing the expected response in the docs
    idToken: string,
    email: string,
    refreshToken: string,
    expiresIn: string,
    localId: string,
    registered?: boolean//extra field in login response
}
@Injectable({
    providedIn: 'root'
})
export class AuthService{
    constructor(private httpClient: HttpClient, private router: Router){}
    userStateChanged: BehaviorSubject<User> = new BehaviorSubject<User>(null);// a variant of subject which takes one initial value and emits the current value whenever it is subscribed to 
    expirationDateDurationTimeout: any;
    signUp(email: string, password: string): Observable<AuthResponse>{
        const url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + environment.firebaseAPIKey;
        return this.httpClient.post<AuthResponse>(url, {
            email: email,
            password: password,
            returnSecureToken: true
        })
        .pipe(catchError(this.handleError)) // outsourcing error handling logic wrt error response from firebase. Now we modified error for component to handle to just a simple message in the UI
        
    }

    login(email: string, password: string): Observable<AuthResponse>{
        const url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + environment.firebaseAPIKey;
        return this.httpClient.post<AuthResponse>(url, {
            email: email,
            password: password,
            returnSecureToken: true
        }).pipe(catchError(this.handleError), tap(res => {
            this.initUserState(res.email, res.localId, res.idToken, +res.expiresIn)
        }));
    }
    logout(){
        this.userStateChanged.next(null);
        this.router.navigate(['/login']);
        localStorage.removeItem('loadedUser');
    }

    autoLogin(){// called in app.component.ts ngOnInit as it runs first
        const userObjLiteral = JSON.parse(localStorage.getItem('loadedUser'));
        if(userObjLiteral){
            let user: User = new User(userObjLiteral.email, userObjLiteral.id, userObjLiteral._token, new Date(userObjLiteral._tokenExpirationDate));
            if(user.token){// a getter function, we wrote the logic to also check if the token expired or not
                this.userStateChanged.next(user);
                let diff = new Date(userObjLiteral._tokenExpirationDate).getTime() - new Date().getTime();
                this.autoLogout(diff);
            }
        }
    }

    autoLogout(expirationDuration: number){
        //  console.log(expirationDuration);
        this.expirationDateDurationTimeout = setTimeout(() => {
            this.logout();
        }, expirationDuration)
    }
    private handleError(errResponse: HttpErrorResponse){// instead of passing annonymous function(which takes err as arg) as argument in catchError, we pass this named function reference
        let errorMessage = 'An unknown error occured';
            if(!(errResponse.error || errResponse.error.error)) // this is what firebase returns. we just check if firebase returned something, if it didn't, it means network error
                return throwError(errorMessage);
            switch(errResponse.error.error.message){
                case 'EMAIL_EXISTS':
                    errorMessage = 'This email already exists';// sign up 
                    break;
                case 'EMAIL_NOT_FOUND':
                case 'INVALID_PASSWORD':
                    errorMessage = 'The email or password is wrong'
                    break;
            }
            return throwError(errorMessage);
    }

    private initUserState(email: string, id: string, token: string, tokenExpiration: number){
        const expirationDate = new Date(new Date().getTime() + tokenExpiration * 1000);
        const user = new User(email, id, token, expirationDate);
        this.userStateChanged.next(user);
        localStorage.setItem('loadedUser', JSON.stringify(user));
        let diff = expirationDate.getTime() - new Date().getTime();
        this.autoLogout(diff);

    }
}