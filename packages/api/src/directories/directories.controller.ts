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
import { DirectoriesService } from './directories.service';
import { ZodValidationPipe } from '../shared/pipes/zod-validation.pipe';
import {
  CreateDirectoryDto,
  createDirectorySchema,
} from './dtos/create-directory.dto';
import { Project } from '../shared/decorators/project.decorator';
import { User } from '@prisma/client';
import { AuthUser } from '../shared/decorators/auth-user.decorator';
import {
  UpdateDirectoryDto,
  updateDirectorySchema,
} from './dtos/update-directory.dto';
import { List } from '../shared/decorators/list.decorator';
import { PaginationQuery } from '../shared/decorators/pagination-query.decorator';

@Controller('directories')
@UseGuards(ProjectGuard)
export class DirectoriesController {
  constructor(private readonly directoriesService: DirectoriesService) {}

  @Post()
  async create(
    @Body(new ZodValidationPipe(createDirectorySchema))
    data: CreateDirectoryDto,
    @Project() project: Project,
    @AuthUser() user: User
  ) {
    return this.directoriesService.create(data, project.id, user.id);
  }

  @Put(':id')
  async update(
    @Body(new ZodValidationPipe(updateDirectorySchema))
    data: UpdateDirectoryDto,
    @Param('id') id: string,
    @Project() project: Project,
    @AuthUser() user: User
  ) {
    return this.directoriesService.update(id, data, project.id, user.id);
  }

  @Get(':id')
  async findOne(
    @Param('id') id: string,
    @Project() project: Project,
    @AuthUser() user: User
  ) {
    return this.directoriesService.findOne(id, project.id, user.id);
  }

  @Get()
  @List()
  async findMany(
    @Project() project: Project,
    @AuthUser() user: User,
    @PaginationQuery pagination: PaginationQuery
  ) {
    const { list, total } = await this.directoriesService.findMany(
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
    return this.directoriesService.remove(id, project.id, user.id);
  }
}
