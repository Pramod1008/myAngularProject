import { Subject } from 'rxjs';
import { Ingredient } from '../shared/ingredient.model';

export class ShoppingListService{
    ingredientsChanged=new Subject<Ingredient[]>();

    private ingredients: Ingredient[]=[
        new Ingredient("Apple",5),
        new Ingredient("Tomates",10)
      ];

      getIngredient(){
          return this.ingredients.slice();
      }

      addIngredient(ingredient:Ingredient){
        this.ingredients.push(ingredient);
        this.ingredientsChanged.next(this.ingredients.slice());
      }

      addIngredients(ingredients: Ingredient[]){
          this.ingredients.push(...ingredients);
          this.ingredientsChanged.next(this.ingredients.slice());
      }
}