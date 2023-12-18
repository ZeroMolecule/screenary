import { forwardRef } from 'react';
import { Card } from '@mantine/core';
import { IconPlus } from '@tabler/icons-react';
import styles from '@/styles/components/embedded-pages.module.scss';

type Props = {
  onOpen: () => void;
};

export const EmbeddedPageCreate = forwardRef<HTMLDivElement, Props>(
  function EmbeddedPageCreate({ onOpen }, ref) {
    return (
      <Card
        ref={ref}
        w={64}
        h={64}
        p={0}
        radius="lg"
        pos="relative"
        className={styles.item}
        onClick={onOpen}
      >
        <IconPlus color="var(--mantine-color-neutral-3)" />
      </Card>
    );
  }
);
