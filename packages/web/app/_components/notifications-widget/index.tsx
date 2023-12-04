import { FC } from 'react';
import { Card, Group } from '@mantine/core';
import { useTranslations } from 'next-intl';
import { DateTimeBlock } from '../datetime-block';
import { generateFirstName } from '@/domain/util/user';
import { getTimeOfTheDay } from '@/utils/datetime';
import { Title } from '../base/title';
import {
  NOTIFICATION_WIDGET_CONTAINER_ID,
  NOTIFICATION_WIDGET_TITLE_ID,
} from '@/utils/constants';
import stylesFlex from '@/styles/utils/flex.module.scss';

type Props = {
  username?: string | null;
  projectName?: string;
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
            <Title
              id={NOTIFICATION_WIDGET_TITLE_ID}
              fz={44}
              fw={700}
              c="neutral.1"
            >
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

function useNotificationsWidget({ username, projectName }: Props) {
  const t = useTranslations('shared.welcomeMessage');

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
