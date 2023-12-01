import { FC } from 'react';
import { useTranslations } from 'next-intl';
import { Box, Card, Stack } from '@mantine/core';
import styles from '@/styles/components/quick-links.module.scss';

type Props = {
  projectId: string;
};

export const QuickLinks: FC<Props> = (props) => {
  const { t } = useQuickLinks(props);

  return (
    <Box h="100%">
      <Card h="100%" radius={24} pos="unset" className={styles.quickLinksCard}>
        <Stack></Stack>
      </Card>
    </Box>
  );
};

function useQuickLinks({ projectId }: Props) {
  const t = useTranslations('project.quickLinks');

  return { t };
}
