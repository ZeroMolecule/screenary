import {
  createParamDecorator,
  ExecutionContext,
  InternalServerErrorException,
} from '@nestjs/common';
import { Project as DBProject } from '@prisma/client';

export const Project = createParamDecorator((_, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest();
  const { project } = request;
  if (!project) {
    throw new InternalServerErrorException();
  }
  return project;
});

export type Project = DBProject;
