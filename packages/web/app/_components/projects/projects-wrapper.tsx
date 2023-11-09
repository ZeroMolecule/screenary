'use client';

import { FC } from 'react';
import Image from 'next/image';
import {
  ActionIcon,
  Card,
  Divider,
  Group,
  Stack,
  Text,
  Title,
} from '@mantine/core';
import {
  IconArrowUpRight,
  IconBellFilled,
  IconCircleCheckFilled,
} from '@tabler/icons-react';
import { TextAlt } from '../base/text-alt';
import emptyIcon from '@/public/images/folder-icon.svg';
import { useTranslations } from 'next-intl';

export const ProjectsWrapper: FC = () => {
  const { t, placeholderArray } = useProjectsWrapper();

  const renderProjectItem = (
    { name, notificationCount, doneCount }: (typeof placeholderArray)[0],
    index: number
  ) => (
    <div key={index} className="project-item-wrapper">
      <Stack h="100%" p="lg" justify="space-between" className="project-item">
        <Group justify="space-between">
          <Group>
            <Group gap={4}>
              <IconCircleCheckFilled
                size={24}
                className="project-item__count-icon"
              />
              <TextAlt size="lg">{doneCount}</TextAlt>
            </Group>
            <Divider orientation="vertical" c="neutral.3" />
            <Group gap={4}>
              <IconBellFilled size={24} className="project-item__count-icon" />
              <TextAlt size="lg">{notificationCount}</TextAlt>
            </Group>
          </Group>
          <ActionIcon
            size="xl"
            radius="100%"
            bg="neutral.2"
            c="neutral.9"
            className="project-item__link-icon"
          >
            <IconArrowUpRight size={32} />
          </ActionIcon>
        </Group>
        <Title fz={48} c="neutral.7">
          {name}
        </Title>
      </Stack>
    </div>
  );

  return (
    <Group h="100%">
      {!placeholderArray.length ? (
        <Card mx="auto" p={64} radius={24} className="projects-empty-card">
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
      ) : (
        placeholderArray.map(renderProjectItem)
      )}
    </Group>
  );
};

function useProjectsWrapper() {
  const t = useTranslations('projects');

  const placeholderData = {
    name: 'Project Name',
    doneCount: 2,
    notificationCount: 10,
  };
  const placeholderArray: (typeof placeholderData)[] =
    Array(5).fill(placeholderData);

  return { t, placeholderArray };
}
