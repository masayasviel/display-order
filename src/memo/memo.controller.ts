import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UsePipes,
} from '@nestjs/common';
import { ZodValidationPipe } from '@/core/zod-validation.pipe';
import { MemoService } from './memo.service';
import {
  type CreateMemoDto,
  createMemoSchema,
  type UpdateMemoDto,
  updateMemoSchema,
} from './memo.zod';

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

  @Get(':id')
  detail(@Param('id', ParseIntPipe) id: number) {
    return this.service.detail(1, id);
  }

  @Patch(':id')
  @UsePipes(new ZodValidationPipe(updateMemoSchema))
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateCatDto: UpdateMemoDto,
  ) {
    this.service.edit(1, id, updateCatDto).then();
  }

  @Delete(':id')
  delete_(@Param('id', ParseIntPipe) id: number) {
    this.service.delete_(1, id).then();
  }
}
