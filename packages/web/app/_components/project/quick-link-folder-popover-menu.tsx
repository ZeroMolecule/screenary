import { FC } from 'react';
import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Directory } from '@prisma/client';
import { PopoverMenuForm } from '../popover-menu-form';
import { FormTextInput } from '../base/form/text-input';
import styles from '@/styles/components/input.module.scss';

type Props = {
  onClose: () => void;
  onSubmit: (values: FolderFormValues) => Promise<void>;
  item?: Directory;
};

export const QuickLinkFolderPopoverMenu: FC<Props> = (props) => {
  const { t, formType, folderForm, isSubmitting, onClose, onSubmit } =
    useQuickLinkFolderPopoverMenu(props);

  return (
    <PopoverMenuForm
      title={t(`${formType}.title`)}
      form={folderForm}
      isSubmitting={isSubmitting}
      onClose={onClose}
      onSubmit={onSubmit}
      stackProps={{ w: '100%', h: '100%' }}
    >
      <FormTextInput
        name="name"
        label={t(`${formType}.nameLabel`)}
        placeholder={t('namePlaceholder')}
        c="white"
        classNames={{ input: styles.inputDark }}
      />
    </PopoverMenuForm>
  );
};

function useQuickLinkFolderPopoverMenu({ onClose, onSubmit, item }: Props) {
  const t = useTranslations('project.quickLinks.form.folder');
  const formType = item ? 'edit' : 'create';

  const folderForm = useForm<FolderFormValues>({
    resolver: zodResolver(folderSchema),
    defaultValues: {
      name: item?.name ?? '',
    },
  });
  const {
    handleSubmit,
    formState: { isSubmitting },
  } = folderForm;

  return {
    t,
    formType,
    folderForm,
    isSubmitting,
    onClose,
    onSubmit: handleSubmit(onSubmit),
  };
}

export type FolderFormValues = z.infer<typeof folderSchema>;
const folderSchema = z.object({
  name: z.string().min(1),
});
