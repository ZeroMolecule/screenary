import { FC } from 'react';
import { Card } from '@mantine/core';
import overflowStyles from '@/styles/utils/overflow.module.scss';
import styles from '@/styles/components/calendar.module.scss';

type Props = {
  url: string;
};

export const Calendar: FC<Props> = ({ url }) => {
  return (
    <Card h="100%" radius={24} className={overflowStyles['overflow-auto']}>
      <iframe src={url} className={styles.iframe} />
    </Card>
  );
};
