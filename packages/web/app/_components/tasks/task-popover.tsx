import { FC } from 'react';
import { ActionIcon, Button, Group, Stack } from '@mantine/core';
import { IconCalendar, IconClock, IconX } from '@tabler/icons-react';
import { Title } from '../base/title';
import { FormTextInput } from '../base/form/text-input';
import { z } from 'zod';
import { useTranslations } from 'next-intl';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Text } from '../base/text';
import { FormDateInput } from '../base/form/date-input';
import { FormTimeInput } from '../base/form/time-input';
import classNames from 'classnames';
import styles from '@/styles/components/task-popover.module.scss';
import dayjs from 'dayjs';
import { DATE_TIME_FORMAT } from '@/utils/datetime';
import { AddTaskData } from '@/domain/types/task-data';

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
              classNames={{ input: styles.input }}
            />
            <Stack gap={0}>
              <Text size="sm" c="white" fw={500}>
                {t('dateTime')}
              </Text>
              <Group gap="xs" grow>
                <FormDateInput
                  name="date"
                  placeholder={t('datePlaceholder')}
                  leftSection={
                    <IconCalendar
                      size={20}
                      color="var(--mantine-color-primary-3)"
                    />
                  }
                  classNames={{
                    input: classNames(styles.input, styles.inputDateTime),
                    section: styles.sectionDateTime,
                  }}
                />
                <FormTimeInput
                  name="time"
                  leftSection={
                    <IconClock
                      size={20}
                      color="var(--mantine-color-primary-3)"
                    />
                  }
                  classNames={{
                    input: classNames(styles.input, styles.inputDateTime),
                    section: styles.sectionDateTime,
                  }}
                />
              </Group>
            </Stack>
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
      date: undefined,
      time: '',
    },
  });
  const {
    handleSubmit: formHandleSubmit,
    formState: { isSubmitting },
  } = taskForm;

  const handleSubmit = async ({ title, date, time }: TaskFormValues) => {
    const [hour, minute] = time?.split(':') ?? [];
    const parsedDate = dayjs(date)
      .hour(Number(hour ?? 0))
      .minute(Number(minute ?? 0));

    const dueDate = date
      ? parsedDate.format(DATE_TIME_FORMAT.dueDateTime)
      : null;

    await onCreate({ title, dueDate });
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
  date: z.date().optional(),
  time: z.string().optional(),
});
