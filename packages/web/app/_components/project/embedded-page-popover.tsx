import { FC } from 'react';
import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { EmbeddedPage } from '@prisma/client';
import { PopoverMenuForm } from '../popover-menu-form';
import { FormTextInput } from '../base/form/text-input';
import inputStyles from '@/styles/components/input.module.scss';

type Props = {
  onClose: () => void;
  onSubmit: (values: EmbeddedPageFormValues) => Promise<void>;
  item?: EmbeddedPage;
};

export const EmbeddedPagePopover: FC<Props> = (props) => {
  const { t, embeddedPageForm, isSubmitting, onClose, onSubmit } =
    useEmbeddedPagePopover(props);

  return (
    <PopoverMenuForm
      title={t('createTitle')}
      form={embeddedPageForm}
      isSubmitting={isSubmitting}
      onClose={onClose}
      onSubmit={onSubmit}
      stackProps={{ pos: 'static' }}
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

function useEmbeddedPagePopover({ onClose, onSubmit, item }: Props) {
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
    embeddedPageForm,
    isSubmitting,
    onClose,
    onSubmit: handleSubmit(onSubmit),
  };
}

export type EmbeddedPageFormValues = z.infer<typeof embeddedPageSchema>;
const embeddedPageSchema = z.object({
  url: z.string().url().min(1),
});
