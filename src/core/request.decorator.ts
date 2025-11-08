import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { UserInterface } from '@/db/schema';

export const RequestUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): UserInterface => {
    const request = ctx.switchToHttp().getRequest();
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return,@typescript-eslint/no-unsafe-member-access
    return request.user;
  },
);
