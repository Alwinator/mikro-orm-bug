import { Recipe } from './recipe.entity'
import { Injectable } from '@nestjs/common'
import {EntityRepository, wrap} from '@mikro-orm/core'
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


    let ingredients: {id: number, name: string}[] = [
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

    for (let ingredient of ingredients as unknown as Ingredient[]) {
      await this.ingredientService.createIngredient(ingredient)
    }

    const recipe: Recipe = {
      id: 1,
      name: 'Pizza',
      // @ts-ignore
      ingredients: [
          {
          id: 1,
          quantity: 4,
          ingredient: ingredients[0],
        } as RecipeIngredient
      ],
    }
    await this.createRecipe(recipe)

    const updatedRecipe: Recipe = {
      id: 1,
      name: 'Pizza',
      // @ts-ignore
      ingredients: [
        {
          id: 1,
          quantity: 2,
          ingredient: ingredients[1],
        } as RecipeIngredient
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

  public async createRecipe(recipe: Recipe): Promise<number> {
    const e = this.recipeRepository.create(recipe)
    await this.recipeRepository.persistAndFlush(e)
    return e.id
  }
  public async updateRecipe(recipe: Recipe): Promise<void> {
    const newRecipe = {...recipe}

    const id = newRecipe.id
    delete newRecipe['id']

    const e = await this.recipeRepository.findOne({id})

    const result = wrap(e).assign(newRecipe, { mergeObjects: true })
    await this.recipeRepository.persistAndFlush(result)
  }
  public async deleteAll(){
    const recipes = await this.recipeRepository.findAll({})
    for (let recipe of recipes) {
      await this.recipeRepository.remove(recipe)
    }
    await this.recipeRepository.flush()
  }
}
