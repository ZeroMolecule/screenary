import { Injectable } from '@nestjs/common';
import { PrismaService } from '../shared/services/prisma.service';
import { CreateQuickLinkDto } from './dtos/create-quick-link.dto';
import { PaginationQuery } from '../shared/decorators/pagination-query.decorator';
import { UpdateQuickLinkDto } from './dtos/update-quick-link.dto';
import { FindManyQuickLinkDto } from './dtos/find-many-quick-link.dto';

@Injectable()
export class QuickLinksService {
  constructor(private prismaService: PrismaService) {}

  async create(dto: CreateQuickLinkDto, projectId: string, userId: string) {
    return this.prismaService.quickLink.create({
      data: {
        ...dto,
        projectId,
        userId,
      },
    });
  }

  async update(
    id: string,
    dto: UpdateQuickLinkDto,
    projectId: string,
    userId: string
  ) {
    return this.prismaService.quickLink.update({
      where: {
        id,
        projectId,
        userId,
      },
      data: dto,
    });
  }

  async findOne(id: string, projectId: string, userId: string) {
    return this.prismaService.quickLink.findFirst({
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
    whereDto: FindManyQuickLinkDto
  ) {
    const where = {
      projectId,
      userId,
      ...whereDto,
    };

    const [list, total] = await Promise.all([
      this.prismaService.quickLink.findMany({
        where,
        ...pagination,
      }),
      this.prismaService.quickLink.count({ where }),
    ]);

    return {
      list,
      total,
    };
  }

  async remove(id: string, projectId: string, userId: string) {
    return this.prismaService.quickLink.delete({
      where: {
        id,
        projectId,
        userId,
      },
    });
  }
}
