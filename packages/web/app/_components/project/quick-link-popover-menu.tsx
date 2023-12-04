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
        name="title"
        label={t('linkLabel')}
        placeholder={t('linkPlaceholder')}
        c="white"
        classNames={{ input: styles.inputDark }}
      />
    </PopoverMenuForm>
  );
};

function useQuickLinksPopoverMenu({ onClose }: Props) {
  const t = useTranslations('project.quickLinks.form');

  const quickLinkForm = useForm<QuickLinkFormValues>({
    resolver: zodResolver(quickLinkSchema),
    defaultValues: {
      title: '',
    },
  });
  const {
    handleSubmit: formHandleSubmit,
    formState: { isSubmitting },
  } = quickLinkForm;

  const handleSubmit = async ({ title }: QuickLinkFormValues) => {
    console.log(title);
  };

  return {
    t,
    quickLinkForm,
    isSubmitting,
    onClose,
    onSubmit: formHandleSubmit(handleSubmit),
  };
}

export type QuickLinkFormValues = z.infer<typeof quickLinkSchema>;
const quickLinkSchema = z.object({
  title: z.string().url().min(1),
});
