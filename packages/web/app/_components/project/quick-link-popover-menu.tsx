import { FC } from 'react';
import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { PopoverMenuForm } from '../popover-menu-form';
import { FormTextInput } from '../base/form/text-input';
import styles from '@/styles/components/input.module.scss';

type Props = {
  onClose: () => void;
  onCreate: (values: QuickLinkFormValues) => Promise<void>;
};

export const QuickLinksPopoverMenu: FC<Props> = (props) => {
  const { t, quickLinkForm, isSubmitting, onClose, onSubmit } =
    useQuickLinksPopoverMenu(props);

  return (
    <PopoverMenuForm
      title={t('title')}
      form={quickLinkForm}
      isSubmitting={isSubmitting}
      onClose={onClose}
      onSubmit={onSubmit}
      stackProps={{ w: '100%', h: '100%' }}
    >
      <FormTextInput
        name="url"
        label={t('linkLabel')}
        placeholder={t('linkPlaceholder')}
        c="white"
        classNames={{ input: styles.inputDark }}
      />
    </PopoverMenuForm>
  );
};

function useQuickLinksPopoverMenu({ onClose, onCreate }: Props) {
  const t = useTranslations('project.quickLinks.form');

  const quickLinkForm = useForm<QuickLinkFormValues>({
    resolver: zodResolver(quickLinkSchema),
    defaultValues: {
      url: '',
    },
  });
  const {
    handleSubmit,
    formState: { isSubmitting },
  } = quickLinkForm;

  return {
    t,
    quickLinkForm,
    isSubmitting,
    onClose,
    onSubmit: handleSubmit(onCreate),
  };
}

export type QuickLinkFormValues = z.infer<typeof quickLinkSchema>;
const quickLinkSchema = z.object({
  url: z.string().url().min(1),
});
