import { FC } from 'react';
import { useTranslations } from 'next-intl';
import { Card } from '@mantine/core';
import styles from '@/styles/components/tasks.module.scss';

type Props = {
  projectId: string;
};

export const Tasks: FC<Props> = (props) => {
  const { t } = useTasks(props);

  return (
    <Card h="100%" radius={24} className={styles.tasks}>
      {t('title')}
    </Card>
  );
};

function useTasks({ projectId }: Props) {
  const t = useTranslations('project.tasks');

  return { t };
}
