import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { User } from '@prisma/client';
import {
  CreateProjectDto,
  createProjectSchema,
} from './dtos/create-project.dto';
import { AuthUser } from '../shared/decorators/auth-user.decorator';
import { ProjectsService } from './projects.service';
import {
  UpdateProjectDto,
  updateProjectSchema,
} from './dtos/update-project.dto';
import { ZodValidationPipe } from '../shared/pipes/zod-validation.pipe';
import { PaginationQuery } from '../shared/decorators/pagination-query.decorator';
import { List } from '../shared/decorators/list.decorator';

@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectService: ProjectsService) {}

  @Post()
  async create(
    @Body(new ZodValidationPipe(createProjectSchema)) data: CreateProjectDto,
    @AuthUser() user: User
  ) {
    return this.projectService.create(data, user);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body(new ZodValidationPipe(updateProjectSchema)) data: UpdateProjectDto,
    @AuthUser() user: User
  ) {
    return this.projectService.update(id, data, user);
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @AuthUser() user: User) {
    return this.projectService.findOne(id, user);
  }

  @Get()
  @List()
  async findMany(
    @AuthUser() user: User,
    @PaginationQuery pagination: PaginationQuery
  ) {
    const { list, count } = await this.projectService.findMany(
      user,
      pagination
    );
    return {
      data: list,
      pagination: {
        ...pagination,
        total: count,
      },
    };
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @AuthUser() user: User) {
    return this.projectService.remove(id, user);
  }
}
