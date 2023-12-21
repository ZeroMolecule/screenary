import { Injectable } from '@nestjs/common';
import { PrismaService } from '../shared/services/prisma.service';
import { CreateTaskDto } from './dtos/create-task.dto';
import { UpdateTaskDto } from './dtos/update-task.dto';
import { PaginationQuery } from '../shared/decorators/pagination-query.decorator';
import { TaskStatus } from '@prisma/client';
import { flattenDeep, uniq } from 'lodash';
import { ReorderItemsDto } from '../shared/dtos/reorder-items.dto';

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

  async updateMany(dto: ReorderItemsDto, projectId: string, userId: string) {
    const ids = dto.map((el) => el.id);

    return this.prismaService.$transaction(async (tx) => {
      const tasks = await tx.task.findMany({
        where: { id: { in: ids }, projectId, userId },
      });

      await tx.task.deleteMany({
        where: { id: { in: ids }, projectId, userId },
      });

      const reorderedTasks = tasks.map((task) => ({
        ...task,
        order: dto.find((el) => el.id === task.id)?.order ?? task.order,
      }));
      await tx.task.createMany({ data: reorderedTasks });

      return reorderedTasks;
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
