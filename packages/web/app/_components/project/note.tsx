import { FC } from 'react';
import { ActionIcon, Box, Card, Group } from '@mantine/core';
import { IconCircleXFilled } from '@tabler/icons-react';
import { Text } from '../base/text';
import { formatDate } from '@/utils/datetime';
import styles from '@/styles/components/notes.module.scss';

type Props = {
  note: any;
};

export const Note: FC<Props> = ({ note }) => {
  return (
    <Card className={styles.note}>
      <Box className={styles.noteInner}>
        <Text c="primary.9">
          What if there was a cool way to solve this huge problem? What if there
          was a cool way to solve this huge problem? What if there was a cool
          way to solve this huge problem? What if there was a cool way to solve
          this huge problem? What if there was a cool way to solve this huge
          problem? What if there was a cool way to solve this huge problem?
        </Text>
      </Box>
      <Group justify="space-between">
        <Text size="sm" ff="secondary" c="primary.5">
          {formatDate(new Date(), 'dateAndTime')}
        </Text>
        <ActionIcon
          variant="transparent"
          size="sm"
          color="var(--mantine-color-primary-9)"
        >
          <IconCircleXFilled size={16} />
        </ActionIcon>
      </Group>
    </Card>
  );
};
