import { Task as PrismaTask } from '@prisma/client';
import { PROJECTS_QUERY_KEY } from './projects-query';

export type Task = PrismaTask;

const TASKS_QUERY_KEY = 'tasks';

export const tasksQuery = {
  key: (projectId: string) => [
    `${PROJECTS_QUERY_KEY}/${projectId}/${TASKS_QUERY_KEY}`,
  ],
};
