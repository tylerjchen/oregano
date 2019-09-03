import { Recipe } from './recipe.model';
import { EventEmitter, Injectable } from '@angular/core';
import { Ingredient } from '../shared/ingredient-model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Subject } from 'rxjs';

@Injectable()
export class RecipeService {
    recipesChanged = new Subject<Recipe[]>();


    private recipes: Recipe[] = [
        // new Recipe(
        //     'The Big Mac Lite',
        //     'Perfect for those looking for fewer calories! A regular Big Mac without the lettuce.',
        //     'https://s3-media2.fl.yelpcdn.com/bphoto/VO4rOgZXn36S-S4sfLCOMQ/o.jpg',
        //     [
        //         new Ingredient('Big Mac', 1),
        //         new Ingredient('Lettuce', 0),
        //     ]),
        // new Recipe(
        //     'The Big Mac Zero',
        //     'Our healthiest option yet! Zero the calories, zero the shame!',
        //     'http://www.biopakshopau.com/Images/BB-BURGER%20BOX$media$big$01.png',
        //     [
        //         new Ingredient('Big Mac', 0)
        //     ])
    ];

    constructor(private shoppingListService: ShoppingListService) { }

    setRecipes(recipes: Recipe[]) {
        this.recipes = recipes;
        this.recipesChanged.next(this.recipes.slice());
    }
    getRecipes() {
        return this.recipes.slice();
    }

    getRecipe(id: number) {
        return this.recipes[id];
    }

    addIngredientsToShoppingList(ingredients: Ingredient[]) {
        this.shoppingListService.addIngredients(ingredients);
    }

    addRecipe(recipe: Recipe) {
        this.recipes.push(recipe);
        this.recipesChanged.next(this.recipes.slice());
    }

    updateRecipe(index: number, newRecipe: Recipe) {
        this.recipes[index] = newRecipe;
        this.recipesChanged.next(this.recipes.slice());
    }

    deleteRecipe(index: number) {
        this.recipes.splice(index, 1);
        this.recipesChanged.next(this.recipes.slice());
    }
}