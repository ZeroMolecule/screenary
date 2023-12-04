'use client';

import { FC } from 'react';
import { Card, Group } from '@mantine/core';
import { useTranslations } from 'next-intl';
import { useQuery } from '@tanstack/react-query';
import { DateTimeBlock } from '../datetime-block';
import { generateFirstName } from '@/domain/util/user';
import { getTimeOfTheDay } from '@/utils/datetime';
import { Title } from '../base/title';
import { NOTIFICATION_WIDGET_CONTAINER_ID } from '@/utils/constants';
import { Project, projectQuery } from '@/domain/queries/project-query';
import { Data } from '@/domain/remote/response/data';
import stylesFlex from '@/styles/utils/flex.module.scss';

type Props = {
  username?: string | null;
  projectId?: string;
};

export const NotificationsWidget: FC<Props> = (props) => {
  const { message } = useNotificationsWidget(props);

  return (
    <Card bg="neutral.9" radius="xl" p={0}>
      <Group justify="space-between" gap={0}>
        <Group
          justify="space-between"
          px="xl"
          py="lg"
          className={stylesFlex['flex-1']}
        >
          <Group gap="md">
            <Title fz={44} fw={700} c="neutral.1">
              {message}
            </Title>
            <div id={NOTIFICATION_WIDGET_CONTAINER_ID} />
          </Group>
          <DateTimeBlock
            stackProps={{ gap: 0 }}
            titleProps={{ c: 'neutral.1' }}
            textProps={{ c: 'neutral.3' }}
            initialDate={new Date()}
          />
        </Group>
      </Group>
    </Card>
  );
};

function useNotificationsWidget({ username, projectId }: Props) {
  const t = useTranslations('shared.welcomeMessage');

  const { data: project } = useQuery<Data<Project>>({
    queryKey: projectQuery.key(projectId!),
    enabled: !!projectId,
  });
  const projectName = project?.data?.name;

  const message =
    projectName ??
    (username
      ? t('base', {
          time: t(`time.${getTimeOfTheDay(new Date())}`),
          username: generateFirstName(username),
        })
      : t('fallback'));

  return { message };
}
