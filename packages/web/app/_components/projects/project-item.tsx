import { FC } from 'react';
import { ActionIcon, Divider, Group, Stack } from '@mantine/core';
import {
  IconArrowUpRight,
  IconBellFilled,
  IconCircleCheckFilled,
} from '@tabler/icons-react';
import { Project } from '@prisma/client';
import { Title } from '../base/title';
import { Text } from '../base/text';
import styles from '@/styles/components/projects.module.scss';

// TODO: update check and bell icon count once api supports those fields

type Props = {
  project: Project;
};

export const ProjectItem: FC<Props> = ({ project: { name } }) => {
  return (
    <div className={styles['project-item-wrapper']}>
      <Stack
        h="100%"
        p="lg"
        justify="space-between"
        className={styles['project-item']}
      >
        <Group justify="space-between">
          <Group>
            <Group gap={4}>
              <IconCircleCheckFilled
                size={24}
                className={styles['project-item__count-icon']}
              />
              <Text ff="secondary" size="lg">
                2
              </Text>
            </Group>
            <Divider orientation="vertical" c="neutral.3" />
            <Group gap={4}>
              <IconBellFilled
                size={24}
                className={styles['project-item__count-icon']}
              />
              <Text ff="secondary" size="lg">
                10
              </Text>
            </Group>
          </Group>
          <ActionIcon
            size="xl"
            radius="100%"
            bg="neutral.2"
            c="neutral.9"
            className={styles['project-item__link-icon']}
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
};
