import { FC } from 'react';
import { useTranslations } from 'next-intl';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { ActionIcon, Button, Group, Stack } from '@mantine/core';
import { IconX } from '@tabler/icons-react';
import { Title } from '../base/title';
import { FormTextInput } from '../base/form/text-input';
import { AddTaskData } from '@/domain/types/task-data';
import { FormDateTimeInput } from '../base/form/date-time-input';
import inputStyles from '@/styles/components/input.module.scss';
import styles from '@/styles/components/task-popover.module.scss';

type Props = {
  onClose: () => void;
  onCreate: (task: Pick<AddTaskData, 'title' | 'dueDate'>) => Promise<void>;
};

export const TaskPopover: FC<Props> = (props) => {
  const { t, taskForm, isSubmitting, onClose, onSubmit } =
    useTaskPopover(props);

  return (
    <Stack
      miw={375}
      pos="absolute"
      right={0}
      top={0}
      p={0}
      bg="var(--mantine-glass-color)"
      className={styles.popover}
    >
      <FormProvider {...taskForm}>
        <form onSubmit={onSubmit}>
          <Group
            p="lg"
            justify="space-between"
            className={styles.popoverHeader}
          >
            <Title order={6} fw={600} c="white">
              {t('title')}
            </Title>
            <ActionIcon variant="transparent" color="white" onClick={onClose}>
              <IconX size={20} />
            </ActionIcon>
          </Group>
          <Stack p="md" pb="lg">
            <FormTextInput
              name="title"
              placeholder={t('titlePlaceholder')}
              classNames={{ input: inputStyles.input }}
            />
            <FormDateTimeInput name="dateTime" />
          </Stack>
          <Group p="lg" justify="center" grow className={styles.popoverActions}>
            <Button bg="neutral.5" fw={500} onClick={onClose}>
              {t('cancelAction')}
            </Button>
            <Button
              type="submit"
              bg="primary.7"
              fw={500}
              loading={isSubmitting}
            >
              {t('applyAction')}
            </Button>
          </Group>
        </form>
      </FormProvider>
    </Stack>
  );
};

function useTaskPopover({ onClose, onCreate }: Props) {
  const t = useTranslations('task.form');

  const taskForm = useForm<TaskFormValues>({
    resolver: zodResolver(taskSchema),
    values: {
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
