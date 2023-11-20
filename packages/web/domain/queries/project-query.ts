import { Project as PrismaProject } from '@prisma/client';
import { PROJECTS_QUERY_KEY } from './projects-query';

export type Project = PrismaProject;

export const projectQuery = {
  key: (id: string) => [`${PROJECTS_QUERY_KEY}/${id}`],
};
