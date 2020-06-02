import  { NgModule } from '@angular/core';
import { AlertComponent } from './alert/alert.component';
import { AlertPlaceHolderDirective } from './alert/alert-place-holder.directive';
import { DropdownDirective } from './dropdown.directive';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
@NgModule({
    declarations: [
        AlertPlaceHolderDirective,
        AlertComponent,
        DropdownDirective,
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule
    ],
    exports: [// things which will be available to other modules importing the shared module
        AlertComponent,
        AlertPlaceHolderDirective,
        DropdownDirective,
        CommonModule,
        FormsModule,
        ReactiveFormsModule
    ]
})
export class SharedModule{}