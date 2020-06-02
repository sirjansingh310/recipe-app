import { Component, OnInit, ViewChild, Output, EventEmitter, ElementRef, OnDestroy} from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
 // @ViewChild('nameInput', {static: false}) nameInput: ElementRef;// view child is ElementRef
 // @ViewChild('amountInput', {static: false}) amountInput: ElementRef;// static is false because we are not accessing it in ngOnInit
 // @Output() ingredientAdded: EventEmitter<Ingredient> = new EventEmitter<Ingredient>();
 startedEditingSubscription: Subscription;
 editingIngredientIndex: number;
 editingIngredient: Ingredient;
 editMode: boolean = false;
 @ViewChild('f', {static: false}) form: NgForm;
  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit() {
    this.startedEditingSubscription = this.shoppingListService.startedEditing.subscribe(
      (index: number) => {
        this.editingIngredientIndex = index;
        this.editMode = true;
        this.editingIngredient = this.shoppingListService.getIngredient(index);
        this.form.setValue({
          'name': this.editingIngredient.name,
          'amount': this.editingIngredient.amount 
        })
      }
    );
  }

  // onAdd(amount: HTMLInputElement){// directly passing to function is HTMLInputElement
  //   // this.ingredientAdded.emit(
  //   //   new Ingredient(this.nameInput.nativeElement.value, amount.valueAsNumber)
  //   // )
  //   this.shoppingListService.addIngredient(this.nameInput.nativeElement.value, amount.valueAsNumber);
 // }

 onAdd(form: NgForm){
   console.log(this.editingIngredient);
   const name = form.value.name;//directly accessing form group values 
   const amount = form.form.get('amount').value; // form.form returns FormGroup which has get function. like we used in reactive app
   if(this.editMode){
    this.shoppingListService.getIngedients()[this.editingIngredientIndex].name = name;
    // or as we have the obj ref, we could directly do this
    this.editingIngredient.amount = amount; 
   }
   else{
    this.shoppingListService.addIngredient(name, amount);
   }
   this.editMode = false; // reset
   form.reset();   
 }
 onClear(){
   this.editMode = false;
   this.form.reset();
 }
 onDelete(){
   this.shoppingListService.getIngedients().splice(this.editingIngredientIndex, 1);
   this.onClear();
 }
ngOnDestroy(){
  this.startedEditingSubscription.unsubscribe();
}
}
