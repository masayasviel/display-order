import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
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
  @HttpCode(200)
  list() {
    return this.service.list();
  }

  @Post()
  @UseGuards(AuthGuard)
  @HttpCode(201)
  create(
    @RequestUser() user: UserInterface,
    @Body(new ZodValidationPipe(createMemoSchema)) createCatDto: CreateMemoDto,
  ) {
    return this.service.register(user.id, createCatDto);
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  @HttpCode(200)
  detail(
    @RequestUser() user: UserInterface,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.service.detail(user.id, id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard)
  @HttpCode(201)
  async update(
    @RequestUser() user: UserInterface,
    @Param('id', ParseIntPipe) id: number,
    @Body(new ZodValidationPipe(updateMemoSchema)) updateCatDto: UpdateMemoDto,
  ) {
    await this.service.edit(user.id, id, updateCatDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  @HttpCode(204)
  async delete_(
    @RequestUser() user: UserInterface,
    @Param('id', ParseIntPipe) id: number,
  ) {
    await this.service.delete_(user.id, id).then();
  }
}
