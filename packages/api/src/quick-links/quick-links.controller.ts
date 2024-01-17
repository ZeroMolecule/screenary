import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { QuickLinksService } from './quick-links.service';
import { ProjectGuard } from '../shared/guards/project.guard';
import {
  CreateQuickLinkDto,
  createQuickLinkSchema,
} from './dtos/create-quick-link.dto';
import { ZodValidationPipe } from '../shared/pipes/zod-validation.pipe';
import { Project } from '../shared/decorators/project.decorator';
import { AuthUser } from '../shared/decorators/auth-user.decorator';
import { User } from '@prisma/client';
import {
  UpdateQuickLinkDto,
  updateQuickLinkSchema,
} from './dtos/update-quick-link.dto';
import { List } from '../shared/decorators/list.decorator';
import { PaginationQuery } from '../shared/decorators/pagination-query.decorator';
import {
  FindManyQuickLinkDto,
  findManyQuickLinkSchema,
} from './dtos/find-many-quick-link.dto';
import {
  ReorderItemsDto,
  reorderItemsSchema,
} from '../shared/dtos/reorder-items.dto';

@Controller('quick-links')
@UseGuards(ProjectGuard)
export class QuickLinksController {
  constructor(private quickLinksService: QuickLinksService) {}

  @Post()
  async create(
    @Body(new ZodValidationPipe(createQuickLinkSchema))
    data: CreateQuickLinkDto,
    @Project() project: Project,
    @AuthUser() user: User
  ) {
    return this.quickLinksService.create(data, project.id, user.id);
  }

  @Put(':id')
  async update(
    @Body(new ZodValidationPipe(updateQuickLinkSchema))
    data: UpdateQuickLinkDto,
    @Param('id') id: string,
    @Project() project: Project,
    @AuthUser() user: User
  ) {
    return this.quickLinksService.update(id, data, project.id, user.id);
  }

  @Put()
  async updateMany(
    @Body(new ZodValidationPipe(reorderItemsSchema)) data: ReorderItemsDto,
    @Project() project: Project,
    @AuthUser() user: User
  ) {
    return this.quickLinksService.updateMany(data, project.id, user.id);
  }

  @Get(':id')
  async findOne(
    @Param('id') id: string,
    @Project() project: Project,
    @AuthUser() user: User
  ) {
    return this.quickLinksService.findOne(id, project.id, user.id);
  }

  @Get()
  @List()
  async findMany(
    @Project() project: Project,
    @AuthUser() user: User,
    @PaginationQuery pagination: PaginationQuery,
    @Query(new ZodValidationPipe(findManyQuickLinkSchema))
    query: FindManyQuickLinkDto
  ) {
    const { list, total } = await this.quickLinksService.findMany(
      project.id,
      user.id,
      pagination,
      query
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
    return this.quickLinksService.remove(id, project.id, user.id);
  }
}
