import { NgModule } from '@angular/core';
import { RecipeComponent } from './recipe.component';
import { RecipeListComponent } from './recipe-list/recipe-list.component';
import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component';
import { RecipeStartComponent } from './recipe-start/recipe-start.component';
import { RecipeEditComponent } from './recipe-edit/recipe-edit.component';
import { RecipeItemComponent } from './recipe-list/recipe-item/recipe-item.component';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RecipeRoutingModule } from './recipe-routing.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
    declarations: [
        RecipeComponent,
        RecipeListComponent,
        RecipeDetailComponent,
        RecipeStartComponent,
        RecipeEditComponent,
        RecipeItemComponent,
    ],
    imports: [// we need to import modules which is used by the recipe module. its not like if we import recipe module in app module, everything app module has declared will be available, expect for services which work in different way(dependency injection)
     //   RouterModule,// to use router related directives(ex routerLink, router-outlet) in the components declared here. this way it will still work as app routing module has the routes configured in app module. or we can specifically configure recipe related routes outside app routing module
     //   ReactiveFormsModule, 
        RecipeRoutingModule,
        SharedModule
     //   CommonModule// browser module includes stuff like ngif and ngfor. but it should only be imported once, and we did that in appmodule. to access all these common features in this module, we need to import them here
    ],
    // things which are available to app module as it will import the recipemodule. We need not do this for services. If a service is declared in providers array of appmodule, then it is available everywhere.
    // exports: [
    //     RecipeComponent,
    //     RecipeListComponent,
    //     RecipeDetailComponent, // We need not export these as they are not used by app module, only used internally within the recipe module and using recipe routing module. Export if we care to use it outside. For example a layout module with header and footer component may be needed to be exported as it will be used in app.component.html of app module
    //     RecipeStartComponent,
    //     RecipeEditComponent,
    //     RecipeItemComponent
    // ]
})
export class RecipeModule{}