import { FC } from 'react';
import { ActionIcon, Group, Stack } from '@mantine/core';
import { IconArrowUpRight, IconCircleCheckFilled } from '@tabler/icons-react';
import { Title } from '../base/title';
import { Text } from '../base/text';
import { Link } from '../base/link';
import { paths } from '@/navigation/paths';
import { Project } from '@/types/prisma/project';
import styles from '@/styles/components/projects.module.scss';

type Props = {
  project: Project;
};

export const ProjectItem: FC<Props> = ({ project: { id, name, _count } }) => {
  return (
    <Link href={paths.project(id)} className={styles['project-item-wrapper']}>
      <Stack
        h="100%"
        p="lg"
        justify="space-between"
        className={styles['project-item']}
      >
        <Group justify="space-between">
          <Group gap={4}>
            <IconCircleCheckFilled
              size={24}
              className={styles['project-item__count-icon']}
            />
            <Text ff="secondary" size="lg">
              {_count.tasks}
            </Text>
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
    </Link>
  );
};
