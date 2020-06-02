import { Component, OnInit, ViewChild, ComponentFactoryResolver, ComponentFactory} from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { AlertComponent } from 'src/app/shared/alert/alert.component';
import { AlertPlaceHolderDirective } from 'src/app/shared/alert/alert-place-holder.directive';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  signUpSuccess = false;
  isLoading = false;
  error: string = null;
  constructor(private activeRoute: ActivatedRoute, private authService: AuthService, private router: Router, private componentFactoryResolver: ComponentFactoryResolver) { }
  @ViewChild('loginForm', {static: false}) loginForm: NgForm;

  @ViewChild(AlertPlaceHolderDirective, {static: false}) alertHost: AlertPlaceHolderDirective;
  // we could give a name and accessed here with the name in viewchild but we pass the type, i.e AlertPlaceHolderDirective. This will pick the first one from the template
  
  alertCloseSub: Subscription;
  ngOnInit() {
    this.activeRoute.queryParams.subscribe((queryParams: Params) => {
      if(queryParams['signupSuccess'] && queryParams['signupSuccess'] === 'true'){
        this.signUpSuccess = true;
      }
    })
  }

  onSubmit(){
    if(!this.loginForm.valid){
      return;
    }
    this.isLoading = true;
    this.error = null;
    this.authService.login(this.loginForm.value.email, this.loginForm.value.password)
    .subscribe(resp => {
      this.router.navigate(['/recipes']);
      
    },
    err => {
      this.error = err;// outsourced error handling in authservice and just taking the error message here
      this.showAlertComponent();
      this.isLoading = false;
    })
  }

  onAlertClose(){
    this.error = null;
  }
  // manually showing the alert component when error occurs.
  // step 1, create a directive for placeholder and add it in ng-template or any div in login.component.html(the parent of the manually injected component)
  // step2, create a componentfactory for that component using componentfactoryresolver(inject this service in constructor)
  // step 3 call create component on public viewContainerRef property of our custom directive
  //step 4(only angular < 9) add the component which you'd like to manually inject in entryComponents list of app.module.ts
  showAlertComponent(){//step 2and 3, along with input output to the component as it expects
    let alertCompFactory: ComponentFactory<AlertComponent> = this.componentFactoryResolver.resolveComponentFactory(AlertComponent);
    const componentRef = this.alertHost.viewContainerRef.createComponent(alertCompFactory);
    componentRef.instance.message = this.error;// @Input
    this.alertCloseSub = componentRef.instance.close.subscribe(() => { // @Output. since we are dont have app-alert in the template, we listen to the event using subscribe
      this.alertCloseSub.unsubscribe();
      this.alertHost.viewContainerRef.clear();
      this.error = null;
    })
  }

  ngOnDestroy(){
    if(this.alertCloseSub){
      this.alertCloseSub.unsubscribe();
    }
  }

}
