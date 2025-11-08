import { Injectable } from '@nestjs/common';
import { eq, and } from 'drizzle-orm';
import { type DB, InjectDb } from '@/db/db';
import { Memo } from '@/db/schema';
import { CreateMemoDto, UpdateMemoDto } from './memo.zod';

@Injectable()
export class MemoService {
  constructor(@InjectDb() private readonly db: DB) {}

  list() {
    return this.db.select().from(Memo);
  }

  detail(userId: number, memoId: number) {
    return this.db
      .select()
      .from(Memo)
      .where(and(eq(Memo.id, memoId), eq(Memo.userId, userId)));
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

  async edit(userId: number, memoId: number, updateCatDto: UpdateMemoDto) {
    await this.db
      .update(Memo)
      .set({ title: updateCatDto.title, content: updateCatDto.content })
      .where(and(eq(Memo.id, memoId), eq(Memo.userId, userId)));
  }

  async delete_(userId: number, memoId: number) {
    await this.db
      .delete(Memo)
      .where(and(eq(Memo.id, memoId), eq(Memo.userId, userId)));
  }
}
