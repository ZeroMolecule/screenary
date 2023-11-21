import { Task } from '@prisma/client';

export type EditTaskData = Pick<Task, 'id' | 'projectId' | 'title' | 'status'>;

export type DeleteTaskData = Pick<Task, 'id' | 'projectId'>;
