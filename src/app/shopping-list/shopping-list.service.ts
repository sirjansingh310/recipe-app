import { Ingredient } from '../shared/ingredient.model';
import { Subject } from 'rxjs';

export class ShoppingListService{
    startedEditing: Subject<number> = new Subject<number>();
    private ingredientList: Array<Ingredient> =  [
        new Ingredient('Apple', 10),
        new Ingredient('Mango', 20)
      ];

     getIngedients(): Array<Ingredient>{
        return this.ingredientList;// ref so that any change to list here from shopping edit reflects in shopping list
    }
    getIngredient(index: number){
        return this.ingredientList[index];
    }
    addIngredient(name: string, amount: number){
        this.ingredientList.push(
            new Ingredient(name, amount)
        )
    }

    addMultipleIngredients(newIngredients: Array<Ingredient>){
        this.ingredientList = [...this.ingredientList, ...newIngredients];
        // this.ingredientsList.push(...newIngredients); also works as push method can take multiple objects
    }
}