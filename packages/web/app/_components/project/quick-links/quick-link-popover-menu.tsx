import styles from '@/styles/components/input.module.scss';
import { zodUrlField } from '@/utils/zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { QuickLink } from '@prisma/client';
import { useTranslations } from 'next-intl';
import { FC } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { FormTextInput } from '../../base/form/text-input';
import { PopoverMenuForm } from '../../popover-menu-form';

type Props = {
  title: string;
  titleLabel: string;
  linkLabel: string;
  onClose: () => void;
  onSubmit: (values: QuickLinkFormValues) => Promise<void>;
  item?: QuickLink;
};

export const QuickLinkPopoverMenu: FC<Props> = (props) => {
  const {
    t,
    title,
    titleLabel,
    linkLabel,
    quickLinkForm,
    isSubmitting,
    onClose,
    onSubmit,
  } = useQuickLinkPopoverMenu(props);

  return (
    <PopoverMenuForm
      title={title}
      form={quickLinkForm}
      isSubmitting={isSubmitting}
      onClose={onClose}
      onSubmit={onSubmit}
      stackProps={{ w: '100%', h: '100%' }}
    >
      <FormTextInput
        name="title"
        label={titleLabel}
        c="white"
        classNames={{ input: styles.inputDark }}
      />
      <FormTextInput
        name="url"
        label={linkLabel}
        placeholder={t('urlPlaceholder')}
        c="white"
        classNames={{ input: styles.inputDark }}
      />
    </PopoverMenuForm>
  );
};

function useQuickLinkPopoverMenu({
  title,
  titleLabel,
  linkLabel,
  onClose,
  onSubmit,
  item,
}: Props) {
  const t = useTranslations('project.quickLinks.form.link');

  const quickLinkForm = useForm<QuickLinkFormValues>({
    resolver: zodResolver(quickLinkSchema),
    defaultValues: {
      url: item?.url ?? '',
      title: item?.title ?? '',
    },
  });
  const {
    handleSubmit,
    formState: { isSubmitting },
  } = quickLinkForm;

  return {
    t,
    title,
    linkLabel,
    titleLabel,
    quickLinkForm,
    isSubmitting,
    onClose,
    onSubmit: handleSubmit(onSubmit),
  };
}

export type QuickLinkFormValues = z.infer<typeof quickLinkSchema>;
const quickLinkSchema = z.object({
  title: z
    .string()
    .transform((value) => (value !== '' ? value : undefined))
    .optional(),
  url: zodUrlField,
});
