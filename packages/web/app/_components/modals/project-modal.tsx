import { FC } from 'react';
import { useTranslations } from 'next-intl';
import { Button, Group, Stack, Title } from '@mantine/core';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Project } from '@prisma/client';
import { z } from 'zod';
import { FormTextInput } from '../base/form/text-input';
import { Modal } from './modal';

type Props = {
  opened: boolean;
  onClose: () => void;
  onSubmit: SubmitHandler<ProjectFormValues>;
  project?: Project;
};

export const ProjectModal: FC<Props> = (props) => {
  const {
    t,
    opened,
    projectForm,
    isSubmitting,
    onSubmit,
    onClose,
    handleAfterClose,
  } = useProjectModal(props);

  return (
    <Modal opened={opened} onClose={onClose} afterClose={handleAfterClose}>
      <FormProvider {...projectForm}>
        <form onSubmit={onSubmit}>
          <Stack gap="lg">
            <Title size="h3">{t('title')}</Title>
            <FormTextInput
              name="name"
              label={t('nameLabel')}
              placeholder={t('namePlaceholder')}
            />
            <FormTextInput
              name="emailUrl"
              label={t('emailLabel')}
              placeholder={t('emailPlaceholder')}
            />
            <FormTextInput
              name="calendarUrl"
              label={t('calendarLabel')}
              placeholder={t('calendarPlaceholder')}
            />
            <Group grow gap="xs">
              <Button bg="neutral.7" fw={500} onClick={onClose}>
                {t('cancelAction')}
              </Button>
              <Button
                type="submit"
                bg="primary.7"
                fw={500}
                loading={isSubmitting}
              >
                {t('saveAction')}
              </Button>
            </Group>
          </Stack>
        </form>
      </FormProvider>
    </Modal>
  );
};

function useProjectModal({ opened, onClose, onSubmit, project }: Props) {
  const t = useTranslations('modal.project');

  const projectForm = useForm<ProjectFormValues>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      name: project?.name ?? '',
      emailUrl: project?.emailUrl ?? '',
      calendarUrl: project?.calendarUrl ?? '',
    },
  });
  const {
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = projectForm;

  const handleAfterClose = () => reset();

  return {
    t,
    opened,
    projectForm,
    isSubmitting,
    onClose,
    handleAfterClose,
    onSubmit: handleSubmit(onSubmit),
  };
}

export type ProjectFormValues = z.infer<typeof projectSchema>;
const projectSchema = z.object({
  name: z.string().min(1),
  emailUrl: z.string().url().min(1),
  calendarUrl: z.string().url().min(1),
});
