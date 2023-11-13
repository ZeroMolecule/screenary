import { FC } from 'react';
import { Card, Group } from '@mantine/core';
import { useTranslations } from 'next-intl';
import { DateTimeBlock } from '../datetime-block';
import { generateFirstName } from '@/domain/util/user';
import { getTimeOfTheDay } from '@/utils/datetime';
import { Title } from '../base/title';
import { EDIT_PROJECT_MENU_ID } from '@/utils/constants';

type Props = {
  username?: string | null;
};

export const NotificationsWidget: FC<Props> = (props) => {
  const { message } = useNotificationsWidget(props);

  return (
    <Card bg="neutral.9" radius="xl" p={0}>
      <Group justify="space-between" gap={0}>
        <Group justify="space-between" px="xl" py="lg" className="flex-1">
          <Group gap="md">
            <Title fz={44} fw={700} c="neutral.1">
              {message}
            </Title>
            <div id={EDIT_PROJECT_MENU_ID} />
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

function useNotificationsWidget({ username }: Props) {
  const t = useTranslations('shared.welcomeMessage');

  const message = username
    ? t('base', {
        time: t(`time.${getTimeOfTheDay(new Date())}`),
        username: generateFirstName(username),
      })
    : t('fallback');

  return { message };
}
