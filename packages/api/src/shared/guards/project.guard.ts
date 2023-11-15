import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from '../services/prisma.service';

@Injectable()
export class ProjectGuard implements CanActivate {
  constructor(private prismaService: PrismaService) {}

  async canActivate(context: ExecutionContext) {
    const req = context.switchToHttp().getRequest();
    const user = req.user;
    if (!user) {
      throw new UnauthorizedException();
    }

    const projectId = req.params.projectId;
    if (!projectId) {
      throw new BadRequestException();
    }

    const project = await this.prismaService.project.findFirst({
      where: { id: projectId, users: { some: { id: user.id } } },
    });

    if (!project) {
      throw new NotFoundException();
    }

    req.project = project;

    return true;
  }
}
