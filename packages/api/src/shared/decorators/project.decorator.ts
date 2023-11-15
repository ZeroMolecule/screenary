import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Project as DBProject } from '@prisma/client';

export const Project = createParamDecorator((_, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest();
  return request.project;
});

export type Project = DBProject;
