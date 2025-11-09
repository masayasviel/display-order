import { Module } from '@nestjs/common';

import { DbModule } from '@/db/db.module';

import { MemoController } from './memo.controller';
import { MemoService } from './memo.service';

@Module({
  imports: [DbModule],
  controllers: [MemoController],
  providers: [MemoService],
})
export class MemoModule {}
