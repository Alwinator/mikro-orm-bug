import {Cascade, Collection, Entity, OneToMany, PrimaryKey, Property} from '@mikro-orm/core'
import {RecipeIngredient} from "./recipe-ingredient.entity";


@Entity()
export class Recipe{
  @PrimaryKey()
  id: number

  @Property()
  name: string

  @OneToMany(() => RecipeIngredient,
      recipeIngredient => recipeIngredient.recipe,
      {cascade: [Cascade.ALL], eager: true, orphanRemoval: true})
  ingredients: Collection<RecipeIngredient> = new Collection<RecipeIngredient>(this)
}
