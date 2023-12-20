import { Task } from '@prisma/client';

export type AddTaskData = Pick<Task, 'projectId' | 'title'> & {
  dueDate: Date | string | null;
};

export type EditTaskData = Pick<Task, 'id' | 'projectId' | 'title' | 'status'>;

export type DeleteTaskData = Pick<Task, 'id' | 'projectId'>;

export type ReorderTaskData = Pick<Task, 'projectId'> & {
  data: Array<Pick<Task, 'id' | 'order'>>;
};
