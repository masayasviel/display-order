import { Injectable } from '@nestjs/common';
import { type DB, InjectDb } from './db/db.provider';
import { User } from './db/schema';

@Injectable()
export class AppService {
  constructor(@InjectDb() private readonly db: DB) {}

  getUser() {
    return this.db.select().from(User);
  }
}
