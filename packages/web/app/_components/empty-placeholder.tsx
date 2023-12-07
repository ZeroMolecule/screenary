import { FC, ReactNode } from 'react';
import { Card, Stack } from '@mantine/core';
import { Title } from './base/title';
import { Text } from './base/text';
import classNames from 'classnames';
import styles from '@/styles/components/empty-placeholder.module.scss';

type Props = {
  title: string;
  description: string;
  image: ReactNode;
  maxWidth?: number;
  dark?: boolean;
};

export const EmptyPlaceholder: FC<Props> = ({
  title,
  description,
  image,
  maxWidth,
  dark,
}) => {
  return (
    <Card
      mx="auto"
      p={64}
      radius={24}
      bg={dark ? 'transparent' : 'white'}
      className={classNames({ [styles.emptyPlaceholder]: !dark })}
    >
      <Stack align="center" maw={maxWidth ?? 275} gap="lg">
        {image}
        <Title
          order={3}
          ta="center"
          fw={600}
          className={classNames({ [styles.titleDark]: dark })}
        >
          {title}
        </Title>
        <Text size="lg" c="neutral.5" ta="center">
          {description}
        </Text>
      </Stack>
    </Card>
  );
};
