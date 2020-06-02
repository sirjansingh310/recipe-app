import { NgModule } from '@angular/core';
import { ShoppingListComponent } from './shopping-list.component';
import { ShoppingEditComponent } from './shopping-edit/shopping-edit.component';
import { AuthGuard } from '../auth/auth.guard';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
@NgModule({
    declarations: [
        ShoppingListComponent,
        ShoppingEditComponent,
    ],
    imports: [
      //  CommonModule, moved to shared module
      //  FormsModule,
    //    ReactiveFormsModule,
        RouterModule.forChild([
           // {path: 'shopping-list', component: ShoppingListComponent, canActivate: [AuthGuard]}
           {path: '', component: ShoppingListComponent, canActivate: [AuthGuard]}// lazy loaded. check app-routing.module.ts
        ]),
        SharedModule
    ],
    //exports: [] no need as we are not using anything withing shopping list module in any other module. Services will anyways be available outside and shopping list component will be rendered as defined in router module
})
export class ShoppingListModule{}