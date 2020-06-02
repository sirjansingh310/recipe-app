import { Routes, RouterModule } from '@angular/router';
import { RecipeComponent } from './recipe.component';
import { AuthGuard } from '../auth/auth.guard';
import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component';
import { RecipeStartComponent } from './recipe-start/recipe-start.component';
import { RecipeEditComponent } from './recipe-edit/recipe-edit.component';
import { RecipeResolverService } from './recipe-resolver.service';
import { NgModule } from '@angular/core';



const routes: Routes = [
    {//path: 'recipes'// for lazy loading
    path: ''
    , component: RecipeComponent, resolve: {recipesResolved: RecipeResolverService}, canActivate: [AuthGuard]// will run once, store in recipe service. 
    , children: [
        {path: '', component: RecipeStartComponent,},
        {path: 'new', component: RecipeEditComponent},
        {path: ':id', component: RecipeDetailComponent,},
        {path: ':id/edit', component: RecipeEditComponent}
    ]},
]
@NgModule({
    imports: [
        RouterModule.forChild(routes)// configuring using forChild for a child routing module. app-routing.module will use forRoute
    ],
    exports:[
        RouterModule
    ]
})
export class RecipeRoutingModule {}