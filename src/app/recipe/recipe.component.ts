import { Component, OnInit } from '@angular/core';
import { Recipe } from './recipe.model';
import { RecipeService } from './recipe.sevice';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.css']
})
export class RecipeComponent implements OnInit {
  currentRecipeDetail: Recipe;
  recipeItemClicked = false;
  constructor(private recipeService: RecipeService) { }

  ngOnInit() {
    // programatically listen to this event rather than in template
    // this.recipeService.recipeItemClicked.subscribe( // expects an function, we are writing an arrow function in es6 style. The event($event in template) body contains recipe
    //   (recipe: Recipe) => {
    //     this.currentRecipeDetail = recipe;
    //     this.recipeItemClicked = true;
    //   }
    // )
  }
  
  // handleRecipeItemLoaded(recipe: Recipe){
  //   this.currentRecipeDetail = recipe;
  //   this.recipeItemClicked = true;
  // }

}
