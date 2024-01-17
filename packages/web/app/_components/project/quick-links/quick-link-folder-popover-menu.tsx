import { FC } from 'react';
import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Directory } from '@prisma/client';
import { PopoverMenuForm } from '../../popover-menu-form';
import { FormTextInput } from '../../base/form/text-input';
import styles from '@/styles/components/input.module.scss';

type Props = {
  title: string;
  label: string;
  onClose: () => void;
  onSubmit: (values: FolderFormValues) => Promise<void>;
  item?: Directory;
};

export const QuickLinkFolderPopoverMenu: FC<Props> = (props) => {
  const { t, title, label, folderForm, isSubmitting, onClose, onSubmit } =
    useQuickLinkFolderPopoverMenu(props);

  return (
    <PopoverMenuForm
      title={title}
      form={folderForm}
      isSubmitting={isSubmitting}
      onClose={onClose}
      onSubmit={onSubmit}
      stackProps={{ w: '100%', h: '100%' }}
    >
      <FormTextInput
        name="name"
        label={label}
        placeholder={t('namePlaceholder')}
        c="white"
        classNames={{ input: styles.inputDark }}
      />
    </PopoverMenuForm>
  );
};

function useQuickLinkFolderPopoverMenu({
  title,
  label,
  onClose,
  onSubmit,
  item,
}: Props) {
  const t = useTranslations('project.quickLinks.form.folder');

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
    title,
    label,
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
