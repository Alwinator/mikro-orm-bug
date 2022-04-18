import { Recipe } from './recipe.entity'
import { Injectable } from '@nestjs/common'
import {EntityData, EntityRepository, wrap} from '@mikro-orm/core'
import { InjectRepository } from '@mikro-orm/nestjs'
import {IngredientService} from "../ingredient/ingredient.service";
import {Ingredient} from "../ingredient/ingredient.entity";
import {RecipeIngredient} from "./recipe-ingredient.entity";

@Injectable()
export class RecipeService{
  constructor(
    @InjectRepository(Recipe)
    private readonly recipeRepository: EntityRepository<Recipe>,

    private readonly ingredientService: IngredientService,
  ){
    setTimeout(() => this.addExampleData(), 500)
  }

  async addExampleData(){
    await this.deleteAll()
    await this.ingredientService.deleteAll()


    let ingredients: EntityData<Ingredient>[] = [
          {
            id: 1,
            name: 'Tomato',
          },
          {
            id: 2,
            name: 'Cheese',
          },
          {
            id: 3,
            name: 'Basil',
          },
        ]


    await this.ingredientService.createIngredients(ingredients)

    const recipe: EntityData<Recipe> = {
      id: 1,
      name: 'Pizza',
      ingredients: [
          {
          id: 1,
          quantity: 4,
          ingredient: ingredients[0],
        }
      ],
    }
    await this.createRecipe(recipe)

    const updatedRecipe: EntityData<Recipe> = {
      id: 1,
      name: 'Pizza',
      ingredients: [
        {
          id: 1,
          quantity: 2,
          ingredient: ingredients[1],
        }
      ],
    }

    await this.updateRecipe(updatedRecipe)

    const finalRecipe = wrap(await this.recipeRepository.findOne({id: 1})).toObject()

    delete finalRecipe.ingredients[0].recipe
    delete finalRecipe.ingredients[0].ingredient.recipeIngredients

    console.log("Actual:")
    console.dir(finalRecipe, {depth: null})

    console.log("Expected:")
    console.dir(updatedRecipe, {depth: null})
  }

  public async createRecipe(recipe: EntityData<Recipe>): Promise<void> {
    const e = this.recipeRepository.create(recipe)
    await this.recipeRepository.persistAndFlush(e)
  }
  public async updateRecipe(recipe: EntityData<Recipe>): Promise<void> {
    const e = await this.recipeRepository.findOne(recipe.id)
    wrap(e).assign(recipe, { mergeObjects: true })
    await this.recipeRepository.flush()
  }
  public async deleteAll(){
    const recipes = await this.recipeRepository.findAll({})
    for (let recipe of recipes) {
      await this.recipeRepository.remove(recipe)
    }
    await this.recipeRepository.flush()
  }
}
