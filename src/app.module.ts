import { Module } from '@nestjs/common';
import { APP_GUARD, RouterModule } from '@nestjs/core';

import { AuthGuard } from '@/core/auth.guard';
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
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AppModule {}
