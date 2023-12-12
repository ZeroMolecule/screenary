import { FormEventHandler, ReactNode } from 'react';
import { useTranslations } from 'next-intl';
import { ActionIcon, Button, Group, Stack, StackProps } from '@mantine/core';
import { FieldValues, FormProvider, UseFormReturn } from 'react-hook-form';
import { IconX } from '@tabler/icons-react';
import { Title } from './base/title';
import styles from '@/styles/components/popover-menu-form.module.scss';

type Props<T extends FieldValues> = {
  title: string;
  form: UseFormReturn<T>;
  onClose: () => void;
  onSubmit: FormEventHandler<HTMLFormElement>;
  isSubmitting: boolean;
  children: ReactNode;
  stackProps?: StackProps;
};

export function PopoverMenuForm<T extends FieldValues>(props: Props<T>) {
  const {
    t,
    title,
    form,
    onClose,
    onSubmit,
    isSubmitting,
    children,
    stackProps,
  } = usePopoverMenuForm(props);

  return (
    <Stack
      pos="absolute"
      right={0}
      top={0}
      p={0}
      bg="var(--mantine-glass-color)"
      className={styles.popover}
      {...stackProps}
    >
      <FormProvider {...form}>
        <form onSubmit={onSubmit} className={styles.popoverForm}>
          <Group
            p="lg"
            justify="space-between"
            className={styles.popoverHeader}
          >
            <Title order={6} fw={600} c="white">
              {title}
            </Title>
            <ActionIcon variant="transparent" color="white" onClick={onClose}>
              <IconX size={20} />
            </ActionIcon>
          </Group>
          <Stack p="md" pb="lg" className={styles.popoverContent}>
            {children}
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
}

function usePopoverMenuForm<T extends FieldValues>({
  title,
  form,
  onClose,
  onSubmit,
  isSubmitting,
  children,
  stackProps,
}: Props<T>) {
  const t = useTranslations('shared.component.formPopover');

  return {
    t,
    title,
    form,
    onClose,
    onSubmit,
    isSubmitting,
    children,
    stackProps,
  };
}
