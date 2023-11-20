import { FC, ReactNode } from 'react';
import { Card, Stack } from '@mantine/core';
import { Title } from './base/title';
import { Text } from './base/text';
import styles from '@/styles/components/empty-placeholder.module.scss';

type Props = {
  title: string;
  description: string;
  image: ReactNode;
};

export const EmptyPlaceholder: FC<Props> = ({ title, description, image }) => {
  return (
    <Card mx="auto" p={64} radius={24} className={styles.emptyPlaceholder}>
      <Stack align="center" maw={275}>
        {image}
        <Title order={3} ta="center">
          {title}
        </Title>
        <Text size="lg" c="neutral.5" ta="center">
          {description}
        </Text>
      </Stack>
    </Card>
  );
};
