import { Injectable } from '@nestjs/common';
import { PrismaService } from '../shared/services/prisma.service';
import { CreateQuickLinkDto } from './dtos/create-quick-link.dto';
import { PaginationQuery } from '../shared/decorators/pagination-query.decorator';
import { UpdateQuickLinkDto } from './dtos/update-quick-link.dto';
import { FindManyQuickLinkDto } from './dtos/find-many-quick-link.dto';
import { WebpageInfoService } from '../shared/services/webpage-info.service';

@Injectable()
export class QuickLinksService {
  constructor(
    private prismaService: PrismaService,
    private webpageInfoService: WebpageInfoService
  ) {}

  async create(dto: CreateQuickLinkDto, projectId: string, userId: string) {
    let pageInfo;
    if (!dto.name || !dto.icon) {
      pageInfo = await this.webpageInfoService.find(dto.url);
    }

    return this.prismaService.quickLink.create({
      data: {
        ...pageInfo,
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
    let pageInfo;
    if (!dto.name || !dto.icon) {
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
      },
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
