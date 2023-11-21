import { Task } from '@prisma/client';

export type DeleteTaskData = Pick<Task, 'id' | 'projectId'>;
