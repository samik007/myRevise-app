import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/internal/Subject';

import { Recipe } from '../recipes/recipe.model';
import { Ingredient } from '../shared/ingredient.model';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  recipeChanged = new Subject<Recipe[]>();

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

  getRecipes(){
    return this.recipes.slice();
  }

  getRecipeByID(id: number){
    return this.recipes[id];
  }

  addRecipe(recipe: Recipe){
    this.recipes.push(recipe);
    this.recipeChanged.next(this.recipes.slice());
  }

  updateRecipe(index: number, recipe: Recipe){
    this.recipes[index] = recipe;
    this.recipeChanged.next(this.recipes.slice());
  }

  deleteRecipe(index: number){
    this.recipes.splice(index, 1);
    this.recipeChanged.next(this.recipes.slice());
  }

  constructor() { }
}
