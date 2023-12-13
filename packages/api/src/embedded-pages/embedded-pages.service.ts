import { Injectable } from '@nestjs/common';
import { PrismaService } from '../shared/services/prisma.service';
import { CreateEmbeddedPageDto } from './dtos/create-embedded-page.dto';
import { UpdateEmbeddedPageDto } from './dtos/updated-embedded-page.dto';
import { PaginationQuery } from '../shared/decorators/pagination-query.decorator';
import { WebpageInfoService } from '../shared/services/webpage-info.service';

@Injectable()
export class EmbeddedPagesService {
  constructor(
    private prismaService: PrismaService,
    private webpageInfoService: WebpageInfoService
  ) {}

  async create(dto: CreateEmbeddedPageDto, projectId: string, userId: string) {
    let pageInfo;
    if (!dto.name || !dto.icon) {
      pageInfo = await this.webpageInfoService.find(dto.url);
    }
    return this.prismaService.embeddedPage.create({
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
    dto: UpdateEmbeddedPageDto,
    projectId: string,
    userId: string
  ) {
    let pageInfo;
    if (!dto.name || !dto.icon) {
      let url = dto.url;
      if (!url) {
        const embeddedPage = await this.findOne(id, projectId, userId);
        if (embeddedPage) {
          url = embeddedPage.url;
        }
      }
      if (url) {
        pageInfo = await this.webpageInfoService.find(url);
      }
    }

    return this.prismaService.embeddedPage.update({
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
