import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';
import { ExceptionHandler } from './core/exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new ExceptionHandler());
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap().then();
