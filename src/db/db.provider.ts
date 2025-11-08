import 'dotenv/config';
import { Inject, Global, Module } from '@nestjs/common';
import { drizzle } from 'drizzle-orm/mysql2';
import mysql from 'mysql2/promise';

const poolConnection = mysql.createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  port: Number(process.env.MYSQL_PORT),
});
export const db = drizzle({ client: poolConnection });
export type DB = typeof db;

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
