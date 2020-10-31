import { Injectable } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';

import { Recipe } from './recipe.model';

@Injectable()
export class RecipeService{
    private recipes: Recipe[] = [
        new Recipe('A Test Recipe',
         'This is simply a test',
          'https://upload.wikimedia.org/wikipedia/commons/1/15/Recipe_logo.jpeg',
          [
              new Ingredient("Salt",23),
              new Ingredient("Sugar",34)
          ]),
        new Recipe('Another Test Recipe', 
        'This is simply a test', 
        'https://upload.wikimedia.org/wikipedia/commons/1/15/Recipe_logo.jpeg',
        [
            new Ingredient("Turminal",223),
            new Ingredient("Sugarcane",334)
        ])
      ];

      constructor(private slService: ShoppingListService){}

      getRecipes()
      {
         return this.recipes.slice();
      }

      getRecipe(index:number)
      {
        return this.recipes[index];
      }

      addIngredientToShoppingList(ingredients: Ingredient[])
      {
        this.slService.addIngredients(ingredients);
      }
}