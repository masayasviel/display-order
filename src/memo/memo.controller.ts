import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';

import { AuthGuard } from '@/core/auth.guard';
import { RequestUser } from '@/core/request.decorator';
import { ZodValidationPipe } from '@/core/zod-validation.pipe';
import { type UserInterface } from '@/db/schema';

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
  @UseGuards(AuthGuard)
  list() {
    return this.service.list();
  }

  @Post()
  @UseGuards(AuthGuard)
  create(
    @RequestUser() user: UserInterface,
    @Body(new ZodValidationPipe(createMemoSchema)) createCatDto: CreateMemoDto,
  ) {
    this.service.register(user.id, createCatDto).then();
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  detail(
    @RequestUser() user: UserInterface,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.service.detail(user.id, id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard)
  update(
    @RequestUser() user: UserInterface,
    @Param('id', ParseIntPipe) id: number,
    @Body(new ZodValidationPipe(updateMemoSchema)) updateCatDto: UpdateMemoDto,
  ) {
    this.service.edit(user.id, id, updateCatDto).then();
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  delete_(
    @RequestUser() user: UserInterface,
    @Param('id', ParseIntPipe) id: number,
  ) {
    this.service.delete_(user.id, id).then();
  }
}
