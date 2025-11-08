import { Inject, Global, Module } from '@nestjs/common';
import { db } from './drizzle.config';

export const DB_PROVIDER = 'DbProvider';

const dbProvider = {
  provide: DB_PROVIDER,
  useValue: db,
};

export const InjectDb = () => Inject(DB_PROVIDER);

@Global()
@Module({
  providers: [dbProvider],
  exports: [dbProvider],
})
export class DbModule {}
