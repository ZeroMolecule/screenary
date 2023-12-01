import { Injectable } from '@nestjs/common';
import { PrismaService } from '../shared/services/prisma.service';
import { CreateTaskDto } from './dtos/create-task.dto';
import { UpdateTaskDto } from './dtos/update-task.dto';
import { PaginationQuery } from '../shared/decorators/pagination-query.decorator';
import { TaskStatus } from '@prisma/client';
import { flattenDeep, isArray, uniq } from 'lodash';

@Injectable()
export class TasksService {
  constructor(private prismaService: PrismaService) {}

  async create(dto: CreateTaskDto, projectId: string, userId: string) {
    return this.prismaService.task.create({
      data: {
        ...dto,
        project: {
          connect: {
            id: projectId,
          },
        },
        user: {
          connect: {
            id: userId,
          },
        },
      },
    });
  }

  async update(
    id: string,
    dto: UpdateTaskDto,
    projectId: string,
    userId: string
  ) {
    return this.prismaService.task.update({
      where: {
        id,
        projectId,
        userId,
      },
      data: dto,
    });
  }

  async findOne(id: string, projectId: string, userId: string) {
    return this.prismaService.task.findFirst({
      where: {
        id,
        projectId,
        userId,
      },
    });
  }

  async findMany(
    projectId: string,
    userId: string,
    pagination: PaginationQuery,
    status?: TaskStatus[]
  ) {
    const statuses = status ? uniq(flattenDeep([status])) : undefined;
    // todo: include DTOs for constructing where clause later on
    const where = {
      projectId,
      userId,
      status: {
        in: statuses,
      },
    };

    const [list, total] = await Promise.all([
      this.prismaService.task.findMany({
        where,
        ...pagination,
        orderBy: {
          order: 'asc',
        },
      }),
      this.prismaService.task.count({ where }),
    ]);

    return {
      list,
      total,
    };
  }

  async remove(id: string, projectId: string, userId: string) {
    return this.prismaService.task.delete({
      where: {
        id,
        projectId,
        userId,
      },
    });
  }
}
