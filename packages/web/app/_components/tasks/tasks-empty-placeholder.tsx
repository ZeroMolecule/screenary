import { FC } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { EmptyPlaceholder } from '../empty-placeholder';
import emptyIcon from '@/public/images/check-icon.svg';

export const TasksEmptyPlaceholder: FC = () => {
  const { t } = useTasksEmptyPlaceholder();

  return (
    <EmptyPlaceholder
      title={t('title')}
      description={t('description')}
      image={<Image src={emptyIcon} width={140} height={140} alt="" />}
    />
  );
};

function useTasksEmptyPlaceholder() {
  const t = useTranslations('tasks.empty');

  return { t };
}
