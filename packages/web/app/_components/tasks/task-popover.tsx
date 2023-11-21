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
import { DateInput, TimeInput } from '@mantine/dates';
import classNames from 'classnames';
import styles from '@/styles/components/task-popover.module.scss';

// TODO: date and time - zod-date, custom picker. remove string type validation

type Props = {
  onClose: () => void;
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
                <DateInput
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
                <TimeInput
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

function useTaskPopover({ onClose }: Props) {
  const t = useTranslations('task.form');

  const taskForm = useForm<TaskFormValues>({
    resolver: zodResolver(taskSchema),
    values: {
      title: '',
      date: undefined,
      time: undefined,
    },
  });
  const {
    handleSubmit: formHandleSubmit,
    formState: { isSubmitting },
  } = taskForm;

  const handleSubmit = (values: TaskFormValues) => {
    console.log(values);
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
  date: z.string().optional(),
  time: z.string().optional(),
});
