import { Component, OnInit, Input } from '@angular/core';
import { Recipe } from '../recipe.model';
import { ShoppingListService} from '../../shopping-list/shopping-list.service';
import { RecipeService } from '../recipe.sevice';
import { ActivatedRoute, Params, Router } from '@angular/router';
@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
 // @Input() recipe: Recipe;
 recipe: Recipe;
 id: number;
  constructor(private shoppingListService: ShoppingListService, private recipeService: RecipeService, private activeRoute: ActivatedRoute, private router: Router) { 
    
  }

  ngOnInit() {
    this.activeRoute.params.subscribe(
      (params: Params) => {
        this.id = +params.id;
        this.recipe = this.recipeService.getRecipeById(+params['id']);
      }
    )
  }

  addToShoppingList(){
    this.shoppingListService.addMultipleIngredients(this.recipe.ingredients);
  }

  openEditSection(){
    this.router.navigate(['edit'], {relativeTo: this.activeRoute});
  }

  onDelete(){
    this.recipeService.deleteRecipe(this.id);
    this.router.navigate(['']);
  }

}
