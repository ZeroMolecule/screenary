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
import { ZodValidationPipe } from '../shared/pipes/zod-validation.pipe';
import { CreateTaskDto, createTaskSchema } from './dtos/create-task.dto';
import { Project } from '../shared/decorators/project.decorator';
import { AuthUser } from '../shared/decorators/auth-user.decorator';
import { User } from '@prisma/client';
import { TasksService } from './tasks.service';
import { updateTaskSchema } from './dtos/update-task.dto';
import { List } from '../shared/decorators/list.decorator';
import { PaginationQuery } from '../shared/decorators/pagination-query.decorator';
import { ProjectGuard } from '../shared/guards/project.guard';

@Controller('tasks')
@UseGuards(ProjectGuard)
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  async create(
    @Body(new ZodValidationPipe(createTaskSchema)) data: CreateTaskDto,
    @Project() project: Project,
    @AuthUser() user: User
  ) {
    return this.tasksService.create(data, project.id, user.id);
  }

  @Put(':id')
  async update(
    @Body(new ZodValidationPipe(updateTaskSchema)) data: CreateTaskDto,
    @Param('id') id: string,
    @Project() project: Project,
    @AuthUser() user: User
  ) {
    return this.tasksService.update(id, data, project.id, user.id);
  }

  @Get(':id')
  async findOne(
    @Param('id') id: string,
    @Project() project: Project,
    @AuthUser() user: User
  ) {
    return this.tasksService.findOne(id, project.id, user.id);
  }

  @Get()
  @List()
  async findMany(
    @Project() project: Project,
    @AuthUser() user: User,
    @PaginationQuery pagination: PaginationQuery
  ) {
    const { list, count } = await this.tasksService.findMany(
      project.id,
      user.id,
      pagination
    );
    return {
      data: list,
      pagination: {
        ...pagination,
        count,
      },
    };
  }

  @Delete(':id')
  async remove(
    @Param('id') id: string,
    @Project() project: Project,
    @AuthUser() user: User
  ) {
    return this.tasksService.remove(id, project.id, user.id);
  }
}
