import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';

import { Recipe } from '../recipes/recipe.model';
import { RecipeService } from '../recipes/recipe.service';

Injectable({ providedIn: 'root' })
export class DataStorageService{
    constructor(private http: HttpClient,private service: RecipeService){}

    storeRecipe(){
        const recipes = this.service.getRecipes();
        this.http.
        put('https://myproject-ebbe8.firebaseio.com/recipes.json',
        recipes
        )
        .subscribe(response => {
            console.log(response);
        });
    }

    fetchData(){
        return this.http.
        get<Recipe[]>('https://myproject-ebbe8.firebaseio.com/recipes.json')
        .pipe(
            map(recipes => {
            return recipes.map(recipe => {
                return {
                    ...recipe,
                    ingredients : recipe.ingredients ? recipe.ingredients : []
                };
            });
        }),
        tap(recipes => {
            this.service.setRecipe(recipes);
        })
        )
    }
}