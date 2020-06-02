import { NgModule } from '@angular/core';

import { RecipeService } from './recipe/recipe.sevice';
import { ShoppingListService } from './shopping-list/shopping-list.service';
import { JwtInterceptorService } from './auth/jwt-interceptor.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

@NgModule({
    providers: [//need not export, as they are services, not components/modules/directives/pipes
        RecipeService,
        ShoppingListService, 
        {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptorService, multi: true}
    ]
})
export class CoreModule{}