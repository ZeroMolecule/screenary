import { Box, Card } from '@mantine/core';
import { useTranslations } from 'next-intl';
import { FC } from 'react';

type Props = {
  projectId: string;
};

export const QuickLinks: FC<Props> = (props) => {
  const { t } = useQuickLinks(props);

  return (
    <Box>
      <Card radius={24} pos="unset"></Card>
    </Box>
  );
};

function useQuickLinks({ projectId }: Props) {
  const t = useTranslations('project.quickLinks');

  return { t };
}
