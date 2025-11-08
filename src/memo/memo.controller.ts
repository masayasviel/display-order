import { Body, Controller, Get, Post, UsePipes } from '@nestjs/common';
import { ZodValidationPipe } from '@/core/zod-validation.pipe';
import { MemoService } from './memo.service';
import { type CreateMemoDto, createMemoSchema } from './memo.zod';

@Controller()
export class MemoController {
  constructor(private readonly service: MemoService) {}

  @Get()
  list() {
    return this.service.list();
  }

  @Post()
  @UsePipes(new ZodValidationPipe(createMemoSchema))
  create(@Body() createCatDto: CreateMemoDto) {
    this.service.register(1, createCatDto).then();
  }
}
