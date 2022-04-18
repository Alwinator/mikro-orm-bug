import { Module } from '@nestjs/common'
import { Ingredient } from './ingredient.entity'
import { IngredientService } from './ingredient.service'
import { MikroOrmModule } from '@mikro-orm/nestjs'

@Module({
  imports: [MikroOrmModule.forFeature([Ingredient])],
  providers: [IngredientService],
  controllers: [],
  exports: [IngredientService]
})
export class IngredientModule {}
