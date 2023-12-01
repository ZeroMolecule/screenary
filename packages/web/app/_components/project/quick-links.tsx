import { FC } from 'react';
import { useTranslations } from 'next-intl';
import { ActionIcon, Box, Card, Group, Stack } from '@mantine/core';
import styles from '@/styles/components/quick-links.module.scss';
import { Text } from '../base/text';
import { IconPlus } from '@tabler/icons-react';

type Props = {
  projectId: string;
};

export const QuickLinks: FC<Props> = (props) => {
  const { t } = useQuickLinks(props);

  return (
    <Box h="100%">
      <Card h="100%" radius={24} pos="unset" className={styles.quickLinksCard}>
        <Stack>
          <Group justify="space-between">
            <Text size="lg" fw={600}>
              {t('title')}
            </Text>
            <ActionIcon
              variant="transparent"
              color="var(--mantine-color-neutral-9)"
              // onClick={handleCreate}
            >
              <IconPlus />
            </ActionIcon>
          </Group>
        </Stack>
      </Card>
    </Box>
  );
};

function useQuickLinks({ projectId }: Props) {
  const t = useTranslations('project.quickLinks');

  return { t };
}
