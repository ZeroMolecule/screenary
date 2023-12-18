import { FC, useState } from 'react';
import { Box } from '@mantine/core';
import {
  DragDropContext,
  Draggable,
  DropResult,
  Droppable,
} from '@hello-pangea/dnd';
import { Task } from '@/domain/queries/tasks-query';
import { Text } from '../base/text';
import { TaskItem } from './task-item';
import { ReorderTaskData } from '@/domain/types/task-data';

type Props = {
  tasks: Task[];
  onEdit: (task: Task) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
  onReorder: (data: Pick<ReorderTaskData, 'data'>) => Promise<void>;
  title?: string;
};

export const TasksList: FC<Props> = (props) => {
  const { title, tasks, onEdit, onDelete, handleOnDragEnd } =
    useTasksList(props);

  const renderTask = (task: Task, index: number) => (
    <Draggable key={task.id} draggableId={task.id} index={index}>
      {({ innerRef, dragHandleProps, draggableProps }) => (
        <div {...dragHandleProps} {...draggableProps} ref={innerRef}>
          <TaskItem task={task} onEdit={onEdit} onDelete={onDelete} />
        </div>
      )}
    </Draggable>
  );

  return (
    <Box>
      <Text size="lg" fw={600}>
        {title}
      </Text>
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Droppable droppableId="tasks">
          {({ droppableProps, innerRef, placeholder }) => (
            <div {...droppableProps} ref={innerRef}>
              {tasks.map(renderTask)}
              {placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </Box>
  );
};

function useTasksList({ title, tasks, onEdit, onDelete, onReorder }: Props) {
  const [items, setItems] = useState(tasks ?? []);

  const handleOnDragEnd = async (result: DropResult) => {
    if (!result.destination) {
      return;
    }

    const orderObject = Object.fromEntries(
      tasks.map((task, index) => [index, task.order])
    );

    const reorderedTasks = [...tasks];
    const [reorderedTask] = reorderedTasks.splice(result.source.index, 1);
    reorderedTasks.splice(result.destination.index, 0, reorderedTask);

    const updatedTasks = reorderedTasks.map((task, index) => ({
      ...task,
      order: orderObject[index],
    }));
    setItems(updatedTasks);

    await onReorder({
      data: updatedTasks.map(({ id, order }) => ({ id, order: order })),
    }).catch(() => setItems(tasks));
  };

  return { title, tasks: items, onEdit, onDelete, handleOnDragEnd };
}
