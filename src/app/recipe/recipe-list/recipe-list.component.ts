import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.sevice';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit, OnDestroy {
 // @Output() recipeItemClicked: EventEmitter<Recipe> = new EventEmitter<Recipe>();
  recipeList: Array<Recipe>;
  recipeListChangedSubscription: Subscription;
  isFetchingSubscription: Subscription;
  isFetching: boolean = false;
  //recipeList: Recipe[] = []; also works
  constructor(private recipeService: RecipeService, private activeRoute: ActivatedRoute) { }

  ngOnInit() {
    this.recipeList = this.recipeService.getRecipeList();
    this.activeRoute.data.subscribe(data => {
      const resolvedList = data.recipesResolved;
      console.log(data);
      this.recipeService.updateRecipeList(resolvedList);
      this.recipeList = resolvedList;
    })
    this.recipeListChangedSubscription = this.recipeService.recipeListChanged.subscribe(
      (recipeList: Array<Recipe>) => {
        this.recipeList = recipeList;
      }
    );
    this.isFetchingSubscription = this.recipeService.isFetching.subscribe(isFetching => {
      this.isFetching = isFetching;
    })
   // this.isFetching = this.recipeService.isFetching2; value won't change if it changes in the service, therefore use subject
   // not req in case of recipelist as it returns a ptr to the array, same case with any object/array
  }
  // handleRecipeItemComponentClick(currentItem: Recipe){
  //  this.recipeItemClicked.emit(currentItem);
  // }

  ngOnDestroy(){
    this.recipeListChangedSubscription.unsubscribe();
    this.isFetchingSubscription.unsubscribe();
  }
}
