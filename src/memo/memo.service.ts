import { Injectable } from '@nestjs/common';
import { type DB, InjectDb } from '@/db/db.provider';
import { Memo } from '@/db/schema';
import { CreateMemoDto } from './memo.zod';

@Injectable()
export class MemoService {
  constructor(@InjectDb() private readonly db: DB) {}

  list() {
    return this.db.select().from(Memo);
  }

  async register(userId: number, createCatDto: CreateMemoDto) {
    await this.db.insert(Memo).values([
      {
        userId,
        title: createCatDto.title,
        content: createCatDto.content,
      },
    ]);
  }
}
