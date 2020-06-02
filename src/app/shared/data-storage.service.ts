import { Injectable } from "@angular/core";
import { RecipeService } from '../recipe/recipe.sevice';
import { Recipe } from '../recipe/recipe.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
@Injectable({
    providedIn: 'root'
})
export class DataStorageService {
    constructor(private recipeService: RecipeService, private httpClient: HttpClient){}

    saveData(): Observable<Recipe[]>{
        const recipes: Recipe[] = this.recipeService.getRecipeList();
        const url = 'https://angularcourse-sirjansingh310.firebaseio.com/recipe.json';
        return this.httpClient.put<Recipe[]>(url, recipes);
    }

    fetchData(): Observable<Recipe[]>{
        const url = 'https://angularcourse-sirjansingh310.firebaseio.com/recipe.json';
        return this.httpClient.get<Recipe[]>(url)
        .pipe(map((recipes: Recipe[]) => { // this map is rxjs operator which returns an observable
            recipes.map(recipe => {
                // spread the recipe class members and override the ingredients member variable, basically assingning empty if not present
                return {...recipe, ingredients: recipe.ingredients? recipe.ingredients : []}
            }) // this map is from js to modify array
            return recipes;
        }));
    }
}