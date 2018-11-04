import { Component, OnInit, EventEmitter, Output } from '@angular/core';

import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  @Output() recipeWasSelected = new EventEmitter<Recipe>();

  recipes: Recipe[] = [
    new Recipe('A Test Recipe',
      'This is simply a Test',
      'http://survival-mastery.com/wp-content/uploads/2015/03/Camping-Food-Idea-810x518.jpg'),
    new Recipe(
      'test recipe2',
      'test2',
      'http://survival-mastery.com/wp-content/uploads/2015/03/Camping-Food-Idea-810x518.jpg')
  ];
  constructor() { }

  ngOnInit() {
  }

  onRecipeSelected(recipe: Recipe){
    this.recipeWasSelected.emit(recipe);
  }
}
