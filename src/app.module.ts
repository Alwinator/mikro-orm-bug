import { Module } from '@nestjs/common';
import {MikroOrmModule} from "@mikro-orm/nestjs";
import {TsMorphMetadataProvider} from "@mikro-orm/reflection";
import {Options} from "@mikro-orm/core";
import {RecipeModule} from "./recipe/recipe.module";
import {IngredientModule} from "./ingredient/ingredient.module";

@Module({
  imports: [
    MikroOrmModule.forRoot({
      type: 'sqlite',
      dbName: './test.sqlite3',
      entities: [__dirname + '/**/*.entity{.ts}'],
      metadataProvider: TsMorphMetadataProvider,
      autoLoadEntities: true,
      allowGlobalContext: true,
      debug: true
    } as Options),
      IngredientModule,
      RecipeModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
