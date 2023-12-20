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
import { ZodValidationPipe } from '../shared/pipes/zod-validation.pipe';
import { CreateTaskDto, createTaskSchema } from './dtos/create-task.dto';
import { Project } from '../shared/decorators/project.decorator';
import { AuthUser } from '../shared/decorators/auth-user.decorator';
import { TaskStatus, User } from '@prisma/client';
import { TasksService } from './tasks.service';
import { UpdateTaskDto, updateTaskSchema } from './dtos/update-task.dto';
import { List } from '../shared/decorators/list.decorator';
import { PaginationQuery } from '../shared/decorators/pagination-query.decorator';
import { ProjectGuard } from '../shared/guards/project.guard';
import { UpdateTasksDto, updateTasksSchema } from './dtos/update-tasks.dto';

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
    @Body(new ZodValidationPipe(updateTaskSchema)) data: UpdateTaskDto,
    @Param('id') id: string,
    @Project() project: Project,
    @AuthUser() user: User
  ) {
    return this.tasksService.update(id, data, project.id, user.id);
  }

  @Put()
  async updateMany(
    @Body(new ZodValidationPipe(updateTasksSchema)) data: UpdateTasksDto,
    @Project() project: Project,
    @AuthUser() user: User
  ) {
    return this.tasksService.updateMany(data, project.id, user.id);
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
    @PaginationQuery pagination: PaginationQuery,
    @Query() query: { status: TaskStatus[] }
  ) {
    const { list, total } = await this.tasksService.findMany(
      project.id,
      user.id,
      pagination,
      query.status
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
    return this.tasksService.remove(id, project.id, user.id);
  }
}
