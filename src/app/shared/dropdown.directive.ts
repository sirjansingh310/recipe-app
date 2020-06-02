import { Directive, ElementRef, HostListener, Renderer2, ViewChild } from '@angular/core';

@Directive({
  selector: '[appDropdown]'
})
export class DropdownDirective {
  private isOpen: boolean = false;
  constructor(private elemRef: ElementRef, private renderer: Renderer2) { }
  @ViewChild('theDropdownMenu', {static: false}) menu: ElementRef;
  @HostListener('click') manageClick(){
    let ul = document.querySelector('#theDropdownMenu');
    if(!this.isOpen){
      this.isOpen = true;      
      this.renderer.setStyle(ul, 'display', 'block'); // bootstrap class which manages open/close is open and it is in bootstrap 3
                                                      // bootstrap 4 does it using its own js but we did something of our own using directives
    }
    else{
      this.isOpen = false;
      this.renderer.setStyle(ul, 'display', 'none');
    }
  }
}
