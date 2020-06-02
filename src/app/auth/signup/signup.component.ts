import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup = new FormGroup({});// to not get compile time erros in passwordsMatch custom validator
  isLoading: boolean = false;
  error: string = null;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.signupForm = new FormGroup({
      email:  new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(6)]),
      confirmPassword: new FormControl(null, [Validators.required, this.isPasswordMatch.bind(this)])
    })
  }

  onSubmit(){
    if(!this.signupForm.valid){
      return; // just in case if someone removes button disabled using inspect element.
    }
    this.isLoading = true;
    this.error = null;
    this.authService.signUp(this.signupForm.value.email, this.signupForm.value.password)
    .subscribe(resp => {
      this.isLoading = false;
      this.router.navigate(['/login'], {queryParams: {'signupSuccess': true}});
    },
    err => {
      this.isLoading = false;
      this.error = err;// a simple message. real error handling from firebase is done in authservice using catchError and throwError pipe operators
    })
  }

  isPasswordMatch(control: FormControl): {[key: string]: boolean} | null{
    if(this.signupForm.get('password') !== null && control.value === this.signupForm.get('password').value){
      return null;
    }
    return {'passwordsDontMatch': true};
  }

}
