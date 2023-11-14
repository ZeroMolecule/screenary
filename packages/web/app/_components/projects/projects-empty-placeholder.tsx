import { FC } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Card, Stack } from '@mantine/core';
import { Title } from '../base/title';
import { Text } from '../base/text';
import emptyIcon from '@/public/images/folder-icon.svg';
import styles from '@/styles/index.module.scss';

export const ProjectsEmptyPlaceholder: FC = () => {
  const { t } = useProjectsEmptyPlaceholder();

  return (
    <Card
      mx="auto"
      p={64}
      radius={24}
      className={styles['projects-empty-card']}
    >
      <Stack align="center" maw={275}>
        <Image src={emptyIcon} width={138} height={108} alt="" />
        <Title order={3} ta="center">
          {t('empty.title')}
        </Title>
        <Text size="lg" c="neutral.5" ta="center">
          {t('empty.description')}
        </Text>
      </Stack>
    </Card>
  );
};

function useProjectsEmptyPlaceholder() {
  const t = useTranslations('projects');

  return { t };
}
