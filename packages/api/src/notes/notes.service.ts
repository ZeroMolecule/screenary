import { Injectable } from '@nestjs/common';
import { PrismaService } from '../shared/services/prisma.service';
import { User } from '@prisma/client';
import { CreateNoteDto } from './dtos/create-note.dto';
import { UpdateNoteDto } from './dtos/update-note.dto';
import { PaginationQuery } from '../shared/decorators/pagination-query.decorator';

@Injectable()
export class NotesService {
  constructor(private prismaService: PrismaService) {}

  async create(dto: CreateNoteDto, projectId: string, user: User) {
    return this.prismaService.note.create({
      data: {
        ...dto,
        project: {
          connect: {
            id: projectId,
          },
        },
        user: {
          connect: {
            id: user.id,
          },
        },
      },
    });
  }

  async update(id: string, projectId: string, dto: UpdateNoteDto, user: User) {
    return this.prismaService.note.update({
      where: {
        id,
        projectId,
        userId: user.id,
      },
      data: dto,
    });
  }

  async findOne(id: string, projectId: string, user: User) {
    return this.prismaService.note.findFirst({
      where: {
        id,
        projectId,
        userId: user.id,
      },
    });
  }

  async findMany(projectId: string, user: User, pagination: PaginationQuery) {
    const where = {
      projectId,
      userId: user.id,
    };

    const [list, count] = await Promise.all([
      this.prismaService.note.findMany({
        where,
        ...pagination,
        orderBy: {
          createdAt: 'desc',
        },
      }),
      this.prismaService.note.count({ where }),
    ]);

    return { list, count };
  }

  async remove(id: string, projectId: string, user: User) {
    return this.prismaService.note.delete({
      where: {
        id,
        projectId,
        userId: user.id,
      },
    });
  }
}
