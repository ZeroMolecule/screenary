import { FC } from 'react';
import { Box } from '@mantine/core';
import { DragDropContext, Draggable, Droppable } from '@hello-pangea/dnd';
import { Task } from '@/domain/queries/tasks-query';
import { Text } from '../base/text';
import { TaskItem } from './task-item';

type Props = {
  tasks: Task[];
  onEdit: (task: Task) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
  title?: string;
};

export const TasksList: FC<Props> = ({ title, tasks, onEdit, onDelete }) => {
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
      <DragDropContext onDragEnd={(result) => console.log(result)}>
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
