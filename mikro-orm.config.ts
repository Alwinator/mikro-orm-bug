import { TsMorphMetadataProvider } from '@mikro-orm/reflection'
import { Options } from '@mikro-orm/core'
import {SqliteDriver} from "@mikro-orm/sqlite";

const config = {
  entities: [__dirname + '/**/*.entity{.ts,.js}'],
  dbName: './test.sqlite3',
  type: 'sqlite',
  allowGlobalContext: false,
  metadataProvider: TsMorphMetadataProvider,
} as Options<SqliteDriver>

export default config