import { FC } from 'react';
import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { EmbeddedPage } from '@prisma/client';
import { PopoverMenuForm } from '../../popover-menu-form';
import { FormTextInput } from '../../base/form/text-input';
import { ActionIcon } from '@mantine/core';
import { IconTrash } from '@tabler/icons-react';
import inputStyles from '@/styles/components/input.module.scss';

type Props = {
  title: string;
  onClose: () => void;
  onSubmit: (values: EmbeddedPageFormValues) => Promise<void>;
  onOpenDelete?: () => void;
  item?: EmbeddedPage;
};

export const EmbeddedPagePopover: FC<Props> = (props) => {
  const {
    t,
    item,
    title,
    embeddedPageForm,
    isSubmitting,
    onClose,
    onSubmit,
    onOpenDelete,
  } = useEmbeddedPagePopover(props);

  return (
    <PopoverMenuForm
      title={title}
      form={embeddedPageForm}
      isSubmitting={isSubmitting}
      onClose={onClose}
      onSubmit={onSubmit}
      stackProps={{ pos: 'static' }}
      headerActions={
        item ? (
          <ActionIcon
            variant="transparent"
            color="white"
            onClick={onOpenDelete}
          >
            <IconTrash size={20} />
          </ActionIcon>
        ) : null
      }
    >
      <FormTextInput
        name="url"
        label={t('urlLabel')}
        placeholder={t('urlPlaceholder')}
        c="white"
        classNames={{ input: inputStyles.inputTransparent }}
      />
    </PopoverMenuForm>
  );
};

function useEmbeddedPagePopover({
  title,
  onClose,
  onSubmit,
  onOpenDelete,
  item,
}: Props) {
  const t = useTranslations('project.embeddedPages.form');

  const embeddedPageForm = useForm<EmbeddedPageFormValues>({
    resolver: zodResolver(embeddedPageSchema),
    defaultValues: {
      url: item?.url ?? '',
    },
  });
  const {
    handleSubmit,
    formState: { isSubmitting },
  } = embeddedPageForm;

  return {
    t,
    item,
    title,
    embeddedPageForm,
    isSubmitting,
    onClose,
    onSubmit: handleSubmit(onSubmit),
    onOpenDelete,
  };
}

export type EmbeddedPageFormValues = z.infer<typeof embeddedPageSchema>;
const embeddedPageSchema = z.object({
  url: z.string().url().min(1),
});
