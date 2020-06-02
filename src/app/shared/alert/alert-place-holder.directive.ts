import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appAlertPlaceHolder]'
})
export class AlertPlaceHolderDirective {

  constructor(public viewContainerRef: ViewContainerRef) { }// made public so that we can access it in login.component.ts. Used for manually inserting app-alert component

}
