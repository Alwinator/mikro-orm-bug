import { Ingredient } from './ingredient.entity'
import {EntityData, EntityRepository} from '@mikro-orm/core'
import { InjectRepository } from '@mikro-orm/nestjs'


export class IngredientService{
  constructor(
    @InjectRepository(Ingredient)
    private readonly ingredientRepository: EntityRepository<Ingredient>
  ){}

  public async createIngredients(ingredients: EntityData<Ingredient>[]): Promise<void> {
    for (let ingredient of ingredients) {
      const e = this.ingredientRepository.create(ingredient)
      this.ingredientRepository.persist(e)
    }
    await this.ingredientRepository.flush()
  }
  public async deleteAll(){
    const ingredients = await this.ingredientRepository.findAll({})
    for (let ingredient of ingredients) {
      await this.ingredientRepository.remove(ingredient)
    }
    await this.ingredientRepository.flush()
  }
}
