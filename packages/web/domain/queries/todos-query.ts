import { PROJECTS_QUERY_KEY } from './projects-query';

const TASKS_QUERY_KEY = 'tasks';

export const tasksQuery = {
  key: (projectId: string) => [
    `${PROJECTS_QUERY_KEY}/${projectId}/${TASKS_QUERY_KEY}`,
  ],
};
