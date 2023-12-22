import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ProjectGuard } from '../shared/guards/project.guard';
import { EmbeddedPagesService } from './embedded-pages.service';
import { ZodValidationPipe } from '../shared/pipes/zod-validation.pipe';
import {
  CreateEmbeddedPageDto,
  createEmbeddedPageSchema,
} from './dtos/create-embedded-page.dto';
import { Project } from '../shared/decorators/project.decorator';
import { AuthUser } from '../shared/decorators/auth-user.decorator';
import { User } from '@prisma/client';
import {
  UpdateEmbeddedPageDto,
  updateEmbeddedPageSchema,
} from './dtos/updated-embedded-page.dto';
import { List } from '../shared/decorators/list.decorator';
import { PaginationQuery } from '../shared/decorators/pagination-query.decorator';
import {
  ReorderItemsDto,
  reorderItemsSchema,
} from '../shared/dtos/reorder-items.dto';

@Controller('embedded-pages')
@UseGuards(ProjectGuard)
export class EmbeddedPagesController {
  constructor(private embeddedPagesService: EmbeddedPagesService) {}

  @Post()
  async create(
    @Body(new ZodValidationPipe(createEmbeddedPageSchema))
    data: CreateEmbeddedPageDto,
    @Project() project: Project,
    @AuthUser() user: User
  ) {
    return this.embeddedPagesService.create(data, project.id, user.id);
  }

  @Put(':id')
  async update(
    @Body(new ZodValidationPipe(updateEmbeddedPageSchema))
    data: UpdateEmbeddedPageDto,
    @Param('id') id: string,
    @Project() project: Project,
    @AuthUser() user: User
  ) {
    return this.embeddedPagesService.update(id, data, project.id, user.id);
  }

  @Put()
  async updateMany(
    @Body(new ZodValidationPipe(reorderItemsSchema)) data: ReorderItemsDto,
    @Project() project: Project,
    @AuthUser() user: User
  ) {
    return this.embeddedPagesService.updateMany(data, project.id, user.id);
  }

  @Get(':id')
  async findOne(
    @Param('id') id: string,
    @Project() project: Project,
    @AuthUser() user: User
  ) {
    return this.embeddedPagesService.findOne(id, project.id, user.id);
  }

  @Get()
  @List()
  async findMany(
    @Project() project: Project,
    @AuthUser() user: User,
    @PaginationQuery pagination: PaginationQuery
  ) {
    const { list, total } = await this.embeddedPagesService.findMany(
      project.id,
      user.id,
      pagination
    );

    return {
      data: list,
      pagination: {
        ...pagination,
        total,
      },
    };
  }

  @Delete(':id')
  async remove(
    @Param('id') id: string,
    @Project() project: Project,
    @AuthUser() user: User
  ) {
    return this.embeddedPagesService.remove(id, project.id, user.id);
  }
}
