import { Prisma } from '@prisma/client';

export type Project = Prisma.ProjectGetPayload<{
  include: { _count: { select: { tasks: true } }; projectUsers: true };
}>;

export const PROJECTS_QUERY_KEY = 'projects';

export const projectsQuery = {
  key: [PROJECTS_QUERY_KEY],
};
