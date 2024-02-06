import { Project } from '@/domain/queries/projects-query';
import { paths } from '@/navigation/paths';
import styles from '@/styles/components/projects.module.scss';
import { ActionIcon, Group, Stack } from '@mantine/core';
import { IconArrowUpRight, IconCircleCheckFilled } from '@tabler/icons-react';
import { useRouter } from 'next/navigation';
import { FC } from 'react';
import { Text } from '../base/text';
import { Title } from '../base/title';

type Props = {
  disabled: boolean;
  project: Project;
};

export const ProjectItem: FC<Props> = ({
  disabled,
  project: { id, name, _count },
}) => {
  const router = useRouter();

  return (
    <button
      className={styles['project-item-wrapper']}
      onClick={() => {
        if (!disabled) {
          router.push(paths.project(id));
        }
      }}
    >
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
            component="div"
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
    </button>
  );
};
