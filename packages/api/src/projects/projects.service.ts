import { Injectable } from '@nestjs/common';
import { PrismaService } from '../shared/services/prisma.service';
import { User } from '@prisma/client';
import { CreateProjectDto } from './dtos/create-project.dto';
import { UpdateProjectDto } from './dtos/update-project.dto';
import { PaginationQuery } from '../shared/decorators/pagination-query.decorator';

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
      },
    });
  }

  async update(id: string, dto: UpdateProjectDto, user: User) {
    return this.prismaService.project.update({
      where: {
        id: id,
        users: {
          some: {
            id: user.id,
          },
        },
      },
      data: dto,
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

    const [list, count] = await Promise.all([
      this.prismaService.project.findMany({
        where,
        ...pagination,
      }),
      this.prismaService.project.count({ where }),
    ]);
    return { list, count };
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
