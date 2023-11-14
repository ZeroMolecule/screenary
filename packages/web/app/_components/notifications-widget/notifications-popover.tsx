'use client';

import { FC } from 'react';
import {
  ActionIcon,
  Breadcrumbs,
  Button,
  Group,
  Popover,
  PopoverDropdown,
  PopoverTarget,
  Stack,
} from '@mantine/core';
import {
  IconBellFilled,
  IconBrandSlack,
  IconCircleXFilled,
  IconTrash,
  IconX,
} from '@tabler/icons-react';
import { useTranslations } from 'next-intl';
import { useDisclosure } from '@mantine/hooks';
import { Title } from '../base/title';
import { Text } from '../base/text';
import styles from '@/styles/index.module.scss';

// TODO: add Popover global components if another popover is present in design

export const NotificationsPopover: FC = () => {
  const { t, placeholderArray, isOpen, toggle, close } =
    useNotificationsPopover();

  const renderNotification = (
    { message, date, time, text }: (typeof placeholderArray)[0],
    index: number
  ) => (
    <Stack key={index} className={styles['notifications-widget__popover-item']}>
      <Stack gap={10} p={24}>
        <Group justify="space-between" align="flex-start">
          <Group align="flex-start" gap={8}>
            <IconBrandSlack size={20} color="white" />
            <Stack gap={0}>
              <Text size="sm" c="white" fw={600}>
                {message}
              </Text>
              <Breadcrumbs separator="•">
                <Text size="xs" c="primary.3">
                  {date}
                </Text>
                <Text size="xs" c="primary.3">
                  {time}
                </Text>
              </Breadcrumbs>
            </Stack>
          </Group>
          <ActionIcon variant="transparent" c="white">
            <IconCircleXFilled size={16} />
          </ActionIcon>
        </Group>
        <Text size="xs" c="white">
          {text}
        </Text>
      </Stack>
    </Stack>
  );

  return (
    <Popover position="top-end" offset={{ mainAxis: 20 }} opened={isOpen}>
      <PopoverTarget>
        <Button
          variant="transparent"
          h="100%"
          p="xl"
          radius={0}
          className={styles['notifications-widget__button']}
          onClick={toggle}
        >
          <IconBellFilled
            size={32}
            className={styles['notifications-widget__button-icon']}
          />
        </Button>
      </PopoverTarget>
      <PopoverDropdown p={0} h={500}>
        <Stack h="100%" gap={0} align="flex-start">
          <Group
            w="100%"
            p="lg"
            justify="space-between"
            className={styles['notifications-widget__popover-header']}
          >
            <Title order={5} c="white">
              {t('title')}
            </Title>
            <ActionIcon variant="transparent" onClick={close}>
              <IconX size={24} color="white" />
            </ActionIcon>
          </Group>
          <Stack className={styles['notifications-widget__popover-body']}>
            {placeholderArray.map(renderNotification)}
          </Stack>
          <Group
            w="100%"
            className={styles['notifications-widget__popover-actions']}
          >
            <Button
              variant="subtle"
              c="white"
              fw={400}
              m={24}
              left={-12}
              size="xs"
              leftSection={<IconTrash size={16} />}
            >
              Clear All
            </Button>
          </Group>
        </Stack>
      </PopoverDropdown>
    </Popover>
  );
};

function useNotificationsPopover() {
  const t = useTranslations('notificationsWidget.popover');
  const [isOpen, { toggle, close }] = useDisclosure(false);

  // TODO: add real data
  const placeholderData = {
    message: 'New message from Josh',
    date: 'Today',
    time: '12:30PM',
    text: 'This would be the notification body which we’ll probably have to truncate...',
  };
  const placeholderArray: (typeof placeholderData)[] =
    Array(5).fill(placeholderData);

  return { t, placeholderArray, isOpen, toggle, close };
}
