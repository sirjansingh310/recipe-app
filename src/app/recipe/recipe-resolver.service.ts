import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Recipe } from './recipe.model';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
@Injectable({
    providedIn: 'root'
})
export class RecipeResolverService implements Resolve<Recipe[]> {
    constructor(private httpClient: HttpClient){}
    resolve(activatedRouteSnapshot : ActivatedRouteSnapshot, state: RouterStateSnapshot): Recipe[] | Observable<Recipe[]> | Promise<Recipe[]>{
        //https://dzone.com/articles/understanding-angular-route-resolvers-by-example

        // we can directly interact with fetchData form data storage service, which indeed changes recipes in recipes list(see udemy tutorial video 283)
        // or we can do a new http call here and catch the data in the recipe parent component using this resolver(using data.subscribe, like params.subscribe), where we change 
        console.log('resolving from server...');
        const url = 'https://angularcourse-sirjansingh310.firebaseio.com/recipe.json';
        return this.httpClient.get<Recipe[]>(url)
        .pipe(map(recipes => { //adding ingredients if empty to avoid errors. this map is from rxjs operators
            recipes.map(recipe => {
                return {...recipe, ingredients: recipe.ingredients ? recipe.ingredients : []}// this map is from js
            })
            return recipes;
        }));// return the observable, now see recipelist component and recipe detail component
    }
}