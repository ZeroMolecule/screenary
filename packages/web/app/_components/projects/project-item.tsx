import { FC } from 'react';
import { ActionIcon, Divider, Group, Stack, Title } from '@mantine/core';
import {
  IconArrowUpRight,
  IconBellFilled,
  IconCircleCheckFilled,
} from '@tabler/icons-react';
import { Project } from '@prisma/client';
import { TextAlt } from '../base/text-alt';
import { Link } from '../base/link';
import { paths } from '@/navigation/paths';

// TODO: update check and bell icon count once api supports those fields

type Props = {
  project: Project;
};

export const ProjectItem: FC<Props> = ({ project: { id, name } }) => {
  return (
    <Link href={paths.project(id)} className="project-item-wrapper">
      <Stack h="100%" p="lg" justify="space-between" className="project-item">
        <Group justify="space-between">
          <Group>
            <Group gap={4}>
              <IconCircleCheckFilled
                size={24}
                className="project-item__count-icon"
              />
              <TextAlt size="lg">2</TextAlt>
            </Group>
            <Divider orientation="vertical" c="neutral.3" />
            <Group gap={4}>
              <IconBellFilled size={24} className="project-item__count-icon" />
              <TextAlt size="lg">10</TextAlt>
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
    </Link>
  );
};
