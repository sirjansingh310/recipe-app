import { Ingredient } from '../shared/ingredient.model';
import { NumberValueAccessor } from '@angular/forms';

export class Recipe{
    public name: string;
    private static count: number = 1;
    public description: string;
    public imagePath: string;
    public ingredients: Array<Ingredient>;
    constructor(name: string, description: string, imagePath: string, ingredients: Array<Ingredient>){
        this.name = name;
        this.description = description;
        this.imagePath = imagePath;
        this.ingredients = ingredients;
    }
}