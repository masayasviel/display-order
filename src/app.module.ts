import { Module } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';
import { DbModule } from '@/db/db.module';
import { MemoModule } from '@/memo/memo.module';

@Module({
  imports: [
    DbModule,
    MemoModule,
    RouterModule.register([
      {
        path: 'memo',
        module: MemoModule,
      },
    ]),
  ],
})
export class AppModule {}
