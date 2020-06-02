import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormControl, FormArray, Validators, AbstractControl } from '@angular/forms';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.sevice';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  isEditMode: boolean = false;
  recipeId: number;
  recipeForm: FormGroup;
  constructor(private activeRoute: ActivatedRoute, private recipeService: RecipeService, private router: Router) { }

  ngOnInit() {
    this.activeRoute.params.subscribe(
      (params: Params) => {
        this.recipeId = +params['id'];
        if(this.recipeId)
            this.isEditMode = true;
        this.initForm(); // whenever params change, means we are in the same component but we have subcribed to changes,
        // init the form again as stuff changed as another recipe was clicked/ new recipe was clicked
      }
    )
  }

  initForm(){
    let name = '';
    let imagePath = '';
    let description = '';
    let ingredients = [];
    if(this.isEditMode){
      const recipe: Recipe = this.recipeService.getRecipeById(this.recipeId);
      name = recipe.name;
      imagePath = recipe.imagePath;
      description = recipe.description;
      if(recipe.ingredients){
        for(let ingredient of recipe.ingredients){
          ingredients.push(
            new FormGroup({//In our form array, each element has 2 inputs, name and amount, so our formarray(ingredients) will be an array pf formgroup
              'name': new FormControl(ingredient.name, Validators.required),
              'amount': new FormControl(ingredient.amount, [Validators.required, Validators.pattern(/[1-9]\d*$/)]), // passing regex using / regex /. Alternate is to use : new Regex("regex in string")
            })
          )
        }
      }
    }
    this.recipeForm = new FormGroup({
      'name': new FormControl(name, Validators.required),
      'imagePath': new FormControl(imagePath, Validators.required),
      'description': new FormControl(description, Validators.required),
      'ingredients': new FormArray(ingredients)
    });
  }

  getIngredientControls(){
    return (<FormArray>this.recipeForm.get('ingredients')).controls;
  }
  addNewIngredientControl(){
    (<FormArray>this.recipeForm.get('ingredients')).push(
      new FormGroup({
        'name': new FormControl(null, Validators.required),
        'amount': new FormControl(null, [Validators.required, Validators.pattern(new RegExp("^[1-9]\\d*$"))])// another way of using regex, using \\ as we pass string
      })
    )
  }

  onDeleteIngredient(index: number){
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(index);
  }

  onSubmit(){
    //recipeForm.value is the exact object of type recipe as the key names are same, so we can directly pass it
    if(this.isEditMode){
      this.recipeService.updateRecipe(this.recipeId, this.recipeForm.value);
      this.router.navigate(['/recipes', this.recipeId]);
    }
    else{
      const newRecipeId = this.recipeService.addRecipe(this.recipeForm.value);
      this.router.navigate(['../', newRecipeId], {relativeTo: this.activeRoute})
    }
    
  }

  getAbstractControl(str : string): AbstractControl{
    return this.recipeForm.get(str);
  }
  onCancel(){
    this.router.navigate(['']);
  }
  deleteAllIngredients(){
    (<FormArray>this.recipeForm.get('ingredients')).clear();
  }
}
