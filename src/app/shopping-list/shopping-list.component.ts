import { Component, OnInit } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {
  ingredientList: Array<Ingredient>;
  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit() {
    this.ingredientList = this.shoppingListService.getIngedients();
  }

  // addIngredient(ingredient: Ingredient){
  //   this.ingredientList.push(ingredient);
  // }

  onEdit(index: number){
    this.shoppingListService.startedEditing.next(index);
  }

}
