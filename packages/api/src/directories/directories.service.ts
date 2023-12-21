import { Injectable } from '@nestjs/common';
import { PrismaService } from '../shared/services/prisma.service';
import { CreateDirectoryDto } from './dtos/create-directory.dto';
import { UpdateDirectoryDto } from './dtos/update-directory.dto';
import { PaginationQuery } from '../shared/decorators/pagination-query.decorator';
import { FindManyDirectoryDto } from './dtos/find-many-directory.dto';

@Injectable()
export class DirectoriesService {
  constructor(private prismaService: PrismaService) {}

  async create(dto: CreateDirectoryDto, projectId: string, userId: string) {
    return this.prismaService.directory.create({
      data: {
        ...dto,
        projectId,
        userId,
      },
    });
  }

  async update(
    id: string,
    dto: UpdateDirectoryDto,
    projectId: string,
    userId: string
  ) {
    return this.prismaService.directory.update({
      where: {
        id,
        projectId,
        userId,
      },
      data: dto,
    });
  }

  async findOne(id: string, projectId: string, userId: string) {
    return this.prismaService.directory.findFirst({
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
    whereDto: FindManyDirectoryDto
  ) {
    const where = {
      projectId,
      userId,
      ...whereDto,
    };
    const [list, total] = await Promise.all([
      this.prismaService.directory.findMany({
        where,
        ...pagination,
        orderBy: {
          order: 'asc',
        },
      }),
      this.prismaService.directory.count({ where }),
    ]);

    return {
      list,
      total,
    };
  }

  async remove(id: string, projectId: string, userId: string) {
    return this.prismaService.directory.delete({
      where: {
        id,
        projectId,
        userId,
      },
    });
  }
}
