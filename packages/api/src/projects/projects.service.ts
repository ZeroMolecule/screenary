import { Injectable } from '@nestjs/common';
import { PrismaService } from '../shared/services/prisma.service';
import { Project, User } from '@prisma/client';
import { CreateProjectDto } from './dtos/create-project.dto';
import { UpdateProjectDto } from './dtos/update-project.dto';

@Injectable()
export class ProjectsService {
  constructor(private prismaService: PrismaService) {}

  async create(dto: CreateProjectDto, user: User): Promise<Project> {
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

  async update(
    id: string,
    dto: UpdateProjectDto,
    user: User
  ): Promise<Project | null> {
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
      },
    });
  }

  async findOne(id: string, user: User): Promise<Project | null> {
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

  async findMany(user: User): Promise<Project[]> {
    return this.prismaService.project.findMany({
      where: {
        users: {
          some: {
            id: user.id,
          },
        },
      },
    });
  }

  async remove(id: string, user: User): Promise<Project> {
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
