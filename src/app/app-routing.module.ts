import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';


const routes: Routes = [
  {path: '', redirectTo: '/recipes', pathMatch: 'full'},//exact match only
 // {path: 'recipes', loadChildren: './recipes/recipe.module#RecipeModule'}, lazy loading old syntax
 // New syntax below. we give a function as value of loadChildren which returns a promise
 
  {path: 'recipes', loadChildren: () => import('./recipe/recipe.module').then(m => m.RecipeModule)}, //recipe routing module main route changed from recipes to '' and we configure it here for lazy loading.
  {path: 'shopping-list', loadChildren: () => import('./shopping-list/shopping-list.module').then(m => m.ShoppingListModule)},
  {path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})],// preload all lazy loaded modules, makes app download modules before the route is even clicked 
  exports: [RouterModule]
})
export class AppRoutingModule { }
