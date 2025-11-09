import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { eq } from 'drizzle-orm';
import { Request } from 'express';

import { type DB, InjectDb } from '@/db/db';
import { User } from '@/db/schema';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(@InjectDb() private readonly db: DB) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: Request = context.switchToHttp().getRequest();
    const userCode = request.headers['user-code'];
    if (!userCode || typeof userCode !== 'string') {
      throw new UnauthorizedException();
    }
    const user = await this.findByUserCode(userCode);
    if (user.length === 0) {
      throw new UnauthorizedException();
    }
    request['user'] = user;
    return true;
  }

  private findByUserCode(userCode: string) {
    return this.db.select().from(User).where(eq(User.code, userCode));
  }
}
