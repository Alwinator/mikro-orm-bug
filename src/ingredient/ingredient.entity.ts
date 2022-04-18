import { RecipeIngredient } from '../recipe/recipe-ingredient.entity'
import {Collection, Entity, OneToMany, PrimaryKey, Property} from '@mikro-orm/core'

@Entity()
export class Ingredient{
  @PrimaryKey()
  id: number

  @Property()
  name: string

  @OneToMany(() => RecipeIngredient, recipeIngredients => recipeIngredients.ingredient, {cascade: []})
  recipeIngredients: Collection<RecipeIngredient> = new Collection<RecipeIngredient>(this)
}
