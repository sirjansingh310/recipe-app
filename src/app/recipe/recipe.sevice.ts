import { Recipe } from './recipe.model';
import { EventEmitter } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { Subject } from 'rxjs/';
export class RecipeService{
  //  recipeItemClicked: EventEmitter<Recipe> = new EventEmitter<Recipe>();
  recipeListChanged: Subject<Array<Recipe>> = new Subject<Array<Recipe>>();
  isFetching: Subject<boolean> = new Subject<boolean>();
  //isFetching2: boolean = false; if we create a variable in recipecomponent ngoninit for this, it will have a copy and therefore values won't change, that's why use subject. For array/object, as a reference goes, using of subjects to listen for changes is not mandatory.
    // private recipeList: Array<Recipe> =   [
    //     new Recipe('Tandoori Chicken Pizza', 'Some test Description', 'https://food.fnr.sndimg.com/content/dam/images/food/fullset/2019/8/6/0/WU2301_Four-Cheese-Pepperoni-Pizzadilla_s4x3.jpg.rend.hgtvcom.826.620.suffix/1565115622965.jpeg',
    //     [
    //       new Ingredient('Chicken', 2),
    //       new Ingredient('Bun', 2)
    //     ])
    //     ,
    //     new Recipe('Cheese garlic bread', 'Some test Description', 'https://www.ambitiouskitchen.com/wp-content/uploads/2018/01/garlicbread-4-725x725.jpg',
    //     [
    //       new Ingredient('Garlic', 5),
    //       new Ingredient('Cheese', 1),
    //       new Ingredient('Bread', 1)
    //     ])
    
    //   ];
    private recipeList: Array<Recipe> = [];


      getRecipeList() : Array<Recipe>{ // return copy instead of reference
         // return this.recipeList.slice(); old style
         return [...this.recipeList]; // new style using spread operator
         //return this.recipeList;// returns a reference to this array, not a copy so without recipeListChangedSubject, it should work!
      }

      getRecipeById(id: number){
        return this.recipeList[id - 1]; // id route param is index + 1
      }

      addRecipe(recipe: Recipe): number{
        this.recipeList.push(recipe);
        // as we send back a copy to the recipelist component, we should notify it to changes
        this.recipeListChanged.next(this.recipeList);
        return this.recipeList.length;
      }

      updateRecipe(id: number, recipe: Recipe){
        this.recipeList[id - 1] = recipe;
        this.recipeListChanged.next(this.recipeList);
      }
      deleteRecipe(id: number){
        this.recipeList.splice(id - 1, 1);
        this.recipeListChanged.next(this.recipeList);
      }

      updateRecipeList(recipes: Recipe[]){
        this.recipeList = recipes;
        this.recipeListChanged.next(this.recipeList);
      }
}