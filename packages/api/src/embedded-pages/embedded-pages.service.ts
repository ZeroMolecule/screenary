import { Injectable } from '@nestjs/common';
import { PrismaService } from '../shared/services/prisma.service';
import { CreateEmbeddedPageDto } from './dtos/create-embedded-page.dto';
import { UpdateEmbeddedPageDto } from './dtos/updated-embedded-page.dto';
import { PaginationQuery } from '../shared/decorators/pagination-query.decorator';

@Injectable()
export class EmbeddedPagesService {
  constructor(private prismaService: PrismaService) {}

  async create(dto: CreateEmbeddedPageDto, projectId: string, userId: string) {
    return this.prismaService.embeddedPage.create({
      data: {
        ...dto,
        projectId,
        userId,
      },
    });
  }

  async update(
    id: string,
    dto: UpdateEmbeddedPageDto,
    projectId: string,
    userId: string
  ) {
    return this.prismaService.embeddedPage.update({
      where: {
        id,
        projectId,
        userId,
      },
      data: dto,
    });
  }

  async findOne(id: string, projectId: string, userId: string) {
    return this.prismaService.embeddedPage.findFirst({
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
    pagination: PaginationQuery
  ) {
    const where = {
      projectId,
      userId,
    };

    const [list, total] = await Promise.all([
      this.prismaService.embeddedPage.findMany({
        where,
        ...pagination,
      }),
      this.prismaService.embeddedPage.count({ where }),
    ]);

    return {
      list,
      total,
    };
  }

  async remove(id: string, projectId: string, userId: string) {
    return this.prismaService.embeddedPage.delete({
      where: {
        id,
        projectId,
        userId,
      },
    });
  }
}
