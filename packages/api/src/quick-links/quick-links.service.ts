import { Injectable } from '@nestjs/common';
import { PaginationQuery } from '../shared/decorators/pagination-query.decorator';
import { ReorderItemsDto } from '../shared/dtos/reorder-items.dto';
import { PrismaService } from '../shared/services/prisma.service';
import { WebpageInfoService } from '../shared/services/webpage-info.service';
import { CreateQuickLinkDto } from './dtos/create-quick-link.dto';
import { FindManyQuickLinkDto } from './dtos/find-many-quick-link.dto';
import { UpdateQuickLinkDto } from './dtos/update-quick-link.dto';

@Injectable()
export class QuickLinksService {
  constructor(
    private prismaService: PrismaService,
    private webpageInfoService: WebpageInfoService
  ) {}

  async create(dto: CreateQuickLinkDto, projectId: string, userId: string) {
    let pageInfo;
    if (!dto.title || !dto.icon) {
      pageInfo = await this.webpageInfoService.find(dto.url);
    }

    return this.prismaService.quickLink.create({
      data: {
        ...pageInfo,
        ...dto,
        projectId,
        userId,
        title: dto.title ?? pageInfo?.title,
      },
    });
  }

  async update(
    id: string,
    dto: UpdateQuickLinkDto,
    projectId: string,
    userId: string
  ) {
    let pageInfo;
    if (!dto.title || !dto.icon) {
      let url = dto.url;
      if (!url) {
        const quickLink = await this.findOne(id, projectId, userId);
        if (quickLink) {
          url = quickLink.url;
        }
      }
      if (url) {
        pageInfo = await this.webpageInfoService.find(url);
      }
    }

    return this.prismaService.quickLink.update({
      where: {
        id,
        projectId,
        userId,
      },
      data: {
        ...pageInfo,
        ...dto,
        title: dto.title ?? pageInfo?.title,
      },
    });
  }

  async updateMany(dto: ReorderItemsDto, projectId: string, userId: string) {
    const ids = dto.map((el) => el.id);

    return this.prismaService.$transaction(async (tx) => {
      const quickLinks = await tx.quickLink.findMany({
        where: { id: { in: ids }, projectId, userId },
      });

      await tx.quickLink.deleteMany({
        where: { id: { in: ids }, projectId, userId },
      });

      const reorderedQuickLinks = quickLinks.map((link) => ({
        ...link,
        order: dto.find((el) => el.id === link.id)?.order ?? link.order,
      }));
      await tx.quickLink.createMany({ data: reorderedQuickLinks });

      return reorderedQuickLinks;
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
        orderBy: {
          order: 'asc',
        },
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
