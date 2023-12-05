import { FC } from 'react';
import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { PopoverMenuForm } from '../popover-menu-form';
import { FormTextInput } from '../base/form/text-input';
import { QuickLink } from '@prisma/client';
import styles from '@/styles/components/input.module.scss';

type Props = {
  onClose: () => void;
  onSubmit: (values: QuickLinkFormValues) => Promise<void>;
  item?: QuickLink;
};

export const QuickLinksPopoverMenu: FC<Props> = (props) => {
  const { t, formType, quickLinkForm, isSubmitting, onClose, onSubmit } =
    useQuickLinksPopoverMenu(props);

  return (
    <PopoverMenuForm
      title={t(`${formType}.title`)}
      form={quickLinkForm}
      isSubmitting={isSubmitting}
      onClose={onClose}
      onSubmit={onSubmit}
      stackProps={{ w: '100%', h: '100%' }}
    >
      <FormTextInput
        name="url"
        label={t(`${formType}.linkLabel`)}
        placeholder={t('linkPlaceholder')}
        c="white"
        classNames={{ input: styles.inputDark }}
      />
    </PopoverMenuForm>
  );
};

function useQuickLinksPopoverMenu({ onClose, onSubmit, item }: Props) {
  const t = useTranslations('project.quickLinks.form');
  const formType = item ? 'edit' : 'create';

  const quickLinkForm = useForm<QuickLinkFormValues>({
    resolver: zodResolver(quickLinkSchema),
    defaultValues: {
      url: item?.url ?? '',
    },
  });
  const {
    handleSubmit,
    formState: { isSubmitting },
  } = quickLinkForm;

  return {
    t,
    formType,
    quickLinkForm,
    isSubmitting,
    onClose,
    onSubmit: handleSubmit(onSubmit),
  };
}

export type QuickLinkFormValues = z.infer<typeof quickLinkSchema>;
const quickLinkSchema = z.object({
  url: z.string().url().min(1),
});
