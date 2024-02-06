import { Injectable } from '@nestjs/common';
import { TaskStatus, User } from '@prisma/client';
import { orderBy } from 'lodash';
import { PaginationQuery } from '../shared/decorators/pagination-query.decorator';
import { ReorderItemsDto } from '../shared/dtos/reorder-items.dto';
import { PrismaService } from '../shared/services/prisma.service';
import { CreateProjectDto } from './dtos/create-project.dto';
import { UpdateProjectDto } from './dtos/update-project.dto';

@Injectable()
export class ProjectsService {
  constructor(private prismaService: PrismaService) {}

  async create(dto: CreateProjectDto, user: User) {
    return this.prismaService.project.create({
      data: {
        ...dto,
        users: {
          connect: {
            id: user.id,
          },
        },
        projectUsers: {
          create: {
            userId: user.id,
          },
        },
      },
    });
  }

  async update(
    id: string,
    { projectUser, ...dto }: UpdateProjectDto,
    user: User
  ) {
    return this.prismaService.project.update({
      where: {
        id: id,
        users: {
          some: {
            id: user.id,
          },
        },
      },
      data: {
        ...dto,
        projectUsers: projectUser
          ? {
              upsert: {
                where: {
                  projectId_userId: {
                    projectId: id,
                    userId: user.id,
                  },
                },
                create: { userId: user.id, ...projectUser },
                update: projectUser,
              },
            }
          : undefined,
      },
      include: { projectUsers: true },
    });
  }

  async updateMany(data: ReorderItemsDto, user: User) {
    const ids = data.map((it) => it.id);

    const entries = await this.prismaService.projectUser.findMany({
      where: { projectId: { in: ids }, userId: user.id },
    });

    return this.prismaService.$transaction(async (tx) => {
      await tx.projectUser.deleteMany({
        where: { projectId: { in: ids }, userId: user.id },
      });

      const reordered = entries.map((entry) => ({
        ...entry,
        order:
          data.find((it) => it.id === entry.projectId)?.order ?? entry.order,
      }));

      await tx.projectUser.createMany({ data: reordered });

      return reordered;
    });
  }

  async findOne(id: string, user: User) {
    return this.prismaService.project.findFirst({
      where: {
        id: id,
        users: {
          some: {
            id: user.id,
          },
        },
      },
      include: { projectUsers: { where: { userId: user.id } } },
    });
  }

  async findMany(user: User, pagination: PaginationQuery) {
    const where = {
      users: {
        some: {
          id: user.id,
        },
      },
    };

    const [list, total] = await Promise.all([
      this.prismaService.project.findMany({
        where,
        ...pagination,
        orderBy: {
          createdAt: 'desc',
        },
        include: {
          projectUsers: { where: { userId: user.id } },
          _count: {
            select: {
              tasks: {
                where: {
                  status: {
                    not: TaskStatus.DONE,
                  },
                },
              },
            },
          },
        },
      }),
      this.prismaService.project.count({ where }),
    ]);

    return {
      list: orderBy(list, ['projectUsers[0].order'], ['asc']),
      total,
    };
  }

  async remove(id: string, user: User) {
    return this.prismaService.project.delete({
      where: {
        id: id,
        users: {
          some: {
            id: user.id,
          },
        },
      },
    });
  }
}
