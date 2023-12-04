import { FC, useState } from 'react';
import { useTranslations } from 'next-intl';
import { Box, Card, Stack } from '@mantine/core';
import { QuickLinksHeader } from './quick-links-header';
import styles from '@/styles/components/quick-links.module.scss';

type Props = {
  projectId: string;
};

export const QuickLinks: FC<Props> = (props) => {
  const { t, popoverOpen, setPopoverOpen } = useQuickLinks(props);

  return (
    <Box h="100%">
      <Card
        h="100%"
        radius={24}
        pos="relative"
        className={styles.quickLinksCard}
      >
        <Stack>
          <QuickLinksHeader
            popoverOpen={popoverOpen}
            setPopoverOpen={setPopoverOpen}
          />
        </Stack>
      </Card>
    </Box>
  );
};

function useQuickLinks({ projectId }: Props) {
  const t = useTranslations('project.quickLinks');
  const [popoverOpen, setPopoverOpen] = useState(false);

  return { t, popoverOpen, setPopoverOpen };
}
