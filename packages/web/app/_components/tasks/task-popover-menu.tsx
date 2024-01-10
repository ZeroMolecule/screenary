import { FC } from 'react';
import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Task } from '@prisma/client';
import { FormTextInput } from '../base/form/text-input';
import { FormDateTimeInput } from '../base/form/date-time-input';
import { PopoverMenuForm } from '../popover-menu-form';
import inputStyles from '@/styles/components/input.module.scss';

type Props = {
  title: string;
  onClose: () => void;
  onSubmit: (task: Pick<Task, 'title' | 'dueDate'>) => Promise<void>;
  task?: Task;
};

export const TaskPopoverMenu: FC<Props> = (props) => {
  const { t, title, taskForm, isSubmitting, onClose, onSubmit } =
    useTaskPopoverMenu(props);

  return (
    <PopoverMenuForm
      title={title}
      form={taskForm}
      isSubmitting={isSubmitting}
      onClose={onClose}
      onSubmit={onSubmit}
      stackProps={{ miw: 375 }}
    >
      <FormTextInput
        name="title"
        placeholder={t('titlePlaceholder')}
        classNames={{ input: inputStyles.inputTransparent }}
      />
      <FormDateTimeInput name="dateTime" label={t('dateTimeLabel')} />
    </PopoverMenuForm>
  );
};

function useTaskPopoverMenu({ title, onClose, onSubmit, task }: Props) {
  const t = useTranslations('task.form');

  const taskForm = useForm<TaskFormValues>({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      title: task?.title ?? '',
      dateTime: task?.dueDate ? new Date(task.dueDate) : undefined,
    },
  });
  const {
    handleSubmit: formHandleSubmit,
    formState: { isSubmitting },
  } = taskForm;

  const handleSubmit = async ({ title, dateTime }: TaskFormValues) => {
    await onSubmit({ title, dueDate: dateTime ?? null });
  };

  return {
    t,
    title,
    taskForm,
    isSubmitting,
    onClose,
    onSubmit: formHandleSubmit(handleSubmit),
  };
}

export type TaskFormValues = z.infer<typeof taskSchema>;
const taskSchema = z.object({
  title: z.string().min(1),
  dateTime: z.date().optional(),
});
