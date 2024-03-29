import { Task } from '@prisma/client';

export type AddTaskData = Pick<Task, 'projectId' | 'title'> & {
  dueDate: Date | string | null;
};

export type EditTaskData = Pick<
  Task,
  'id' | 'projectId' | 'title' | 'status' | 'dueDate'
>;

export type DeleteTaskData = Pick<Task, 'id' | 'projectId'>;
