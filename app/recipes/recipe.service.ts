import { Injectable, EventEmitter } from '@angular/core';

import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';

@Injectable()
export class RecipeService {
  recipeSelected = new EventEmitter<Recipe>();

  private recipes: Recipe[] = [
    new Recipe('A Test Recipe',
      'This is simply a Test',
      'http://survival-mastery.com/wp-content/uploads/2015/03/Camping-Food-Idea-810x518.jpg',
      [ 
        new Ingredient('Meat', 10),
        new Ingredient('Cucumber', 5)
      ]
    ),
    new Recipe(
      'test recipe2',
      'test2',
      'http://survival-mastery.com/wp-content/uploads/2015/03/Camping-Food-Idea-810x518.jpg',
      [ 
        new Ingredient('Bread', 10),
        new Ingredient('Butter', 5)
      ]
    )
  ];
  constructor(private shoppingListService: ShoppingListService) { }

  getRecipe(){
    return this.recipes.slice();
  }

  addIngredientsToSL(ingredients: Ingredient[]){
    this.shoppingListService.addIngredients(ingredients);
  }

  getRecipeById(id: number){
    return this.recipes[id];
  }
}
