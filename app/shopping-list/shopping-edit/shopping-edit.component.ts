import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs/internal/Subscription';

import { Ingredient } from '../../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  editedIndex: number;
  editMode = false;
  editedIngredient: Ingredient;
  @ViewChild('f') slForm: NgForm;
  subscription: Subscription

  constructor(private sLService: ShoppingListService) { }

  ngOnInit() {
    this.subscription = this.sLService.onEdited
      .subscribe(
      (index: number) => {
        this.editedIndex = index;
        this.editMode = true;
        this.editedIngredient = this.sLService.getIngredientById(index);
        this.slForm.setValue({
          name: this.editedIngredient.name,
          amount: this.editedIngredient.amount
        })
      }
      )
  }

  onAddItem(form: NgForm) {
    const value = form.value;
    const newIngredient = new Ingredient(value.name, value.amount);
    if (this.editMode) {
      this.sLService.updateIngredient(this.editedIndex, newIngredient);
    } else {
      this.sLService.addIngredient(newIngredient);
    }
    this.editMode = false;
    form.reset();
  }

  onDelete(){
    this.sLService.deleteIngredient(this.editedIndex);
    this.onClear();
  }

  onClear(){
    this.editMode = false;
    this.slForm.reset();
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

}
