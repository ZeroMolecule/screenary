import { FC } from 'react';
import { Button, Card, Group, Stack, Title } from '@mantine/core';
import { IconBellFilled } from '@tabler/icons-react';
import { TitleAlt } from '../base/title-alt';
import { TextAlt } from '../base/text-alt';
import { useTranslations } from 'next-intl';

type Props = {
  username?: string | null;
};

export const NotificationsWidget: FC<Props> = (props) => {
  const { message } = useNotificationsWidget(props);

  return (
    <Card bg="neutral.9" radius="xl" p={0}>
      <Group justify="space-between" gap={0}>
        <Group justify="space-between" px="xl" py="lg" className="flex-1">
          <Title fz={44} fw={700} c="neutral.1">
            {message}
          </Title>
          <Stack gap={0}>
            <TitleAlt c="neutral.1">3:00 PM</TitleAlt>
            <TextAlt c="neutral.3">Friday, July 21st</TextAlt>
          </Stack>
        </Group>
        <Button
          variant="transparent"
          h="100%"
          p="xl"
          radius={0}
          className="notifications-widget__button"
        >
          <IconBellFilled
            size={32}
            className="notifications-widget__button-icon"
          />
        </Button>
      </Group>
    </Card>
  );
};

function useNotificationsWidget({ username }: Props) {
  const t = useTranslations('notificationsWidget');

  const message = username
    ? t('welcomeMessage', { username: username.split(' ')[0] })
    : t('welcomeMessageFallback');

  return { message };
}
