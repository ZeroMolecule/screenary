import { FC } from 'react';
import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { FormTextInput } from '../base/form/text-input';
import { AddTaskData } from '@/domain/types/task-data';
import { FormDateTimeInput } from '../base/form/date-time-input';
import { PopoverMenuForm } from '../popover-menu-form';
import inputStyles from '@/styles/components/input.module.scss';

type Props = {
  onClose: () => void;
  onCreate: (task: Pick<AddTaskData, 'title' | 'dueDate'>) => Promise<void>;
};

export const TaskPopoverMenu: FC<Props> = (props) => {
  const { t, taskForm, isSubmitting, onClose, onSubmit } =
    useTaskPopoverMenu(props);

  return (
    <PopoverMenuForm
      title={t('title')}
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

function useTaskPopoverMenu({ onClose, onCreate }: Props) {
  const t = useTranslations('task.form');

  const taskForm = useForm<TaskFormValues>({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      title: '',
      dateTime: undefined,
    },
  });
  const {
    handleSubmit: formHandleSubmit,
    formState: { isSubmitting },
  } = taskForm;

  const handleSubmit = async ({ title, dateTime }: TaskFormValues) => {
    await onCreate({ title, dueDate: dateTime ?? null });
  };

  return {
    t,
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
