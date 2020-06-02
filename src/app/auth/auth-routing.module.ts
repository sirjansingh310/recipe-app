import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { SignupGuard } from './signup.guard';

const routes: Routes = [
    {path: 'login', component: LoginComponent, canActivate: [SignupGuard]},
    {path: 'signup', component: SignupComponent, canActivate: [SignupGuard]},
]
@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [
        RouterModule
    ]
})
export class AuthRoutingModule{}