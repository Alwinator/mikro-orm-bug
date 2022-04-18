import { Ingredient } from './ingredient.entity'
import { EntityRepository } from '@mikro-orm/core'
import { InjectRepository } from '@mikro-orm/nestjs'


export class IngredientService{
  constructor(
    @InjectRepository(Ingredient)
    private readonly ingredientRepository: EntityRepository<Ingredient>
  ){}

  public async createIngredient(ingredient: Ingredient): Promise<number> {
    const e = this.ingredientRepository.create(ingredient)
    await this.ingredientRepository.persistAndFlush(e)
    return e.id
  }
  public async deleteAll(){
    const ingredients = await this.ingredientRepository.findAll({})
    for (let ingredient of ingredients) {
      await this.ingredientRepository.remove(ingredient)
    }
    await this.ingredientRepository.flush()
  }
}
