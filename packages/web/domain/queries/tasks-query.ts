import { Task as PrismaTask, TaskStatus } from '@prisma/client';
import { PROJECTS_QUERY_KEY } from './projects-query';

export type Task = PrismaTask;
type TaskParams = {
  status?: TaskStatus[] | TaskStatus;
};

const TASKS_QUERY_KEY = 'tasks';

export const tasksQuery = {
  key: (projectId: string, params: TaskParams = { status: [] }) => [
    `${PROJECTS_QUERY_KEY}/${projectId}/${TASKS_QUERY_KEY}`,
    params,
  ],
};
