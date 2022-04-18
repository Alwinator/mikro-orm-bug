import { Module } from '@nestjs/common'
import { Recipe } from './recipe.entity'
import { RecipeService } from './recipe.service'
import { MikroOrmModule } from '@mikro-orm/nestjs'
import {RecipeIngredient} from "./recipe-ingredient.entity";
import {IngredientModule} from "../ingredient/ingredient.module";

@Module({
  imports: [
    MikroOrmModule.forFeature([Recipe]),
    MikroOrmModule.forFeature([RecipeIngredient]),
    IngredientModule,
  ],
  providers: [RecipeService],
  controllers: []
})
export class RecipeModule {}
