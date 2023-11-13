import { ActionIcon, Card, Group, Stack } from '@mantine/core';
import {
  IconArrowsMaximize,
  IconCircleX,
  IconCircleXFilled,
  IconInbox,
  IconPlus,
} from '@tabler/icons-react';
import { FC } from 'react';
import { Text } from '../base/text';

export const ProjectNotes: FC = () => {
  return (
    <Card radius={24}>
      <Stack>
        <Group justify="space-between">
          <Group gap="xs">
            <IconInbox size={24} color="var(--mantine-color-primary-8)" />
            <Text size="lg" fw={600}>
              Notes
            </Text>
          </Group>
          <ActionIcon
            variant="transparent"
            color="var(--mantine-color-neutral-9)"
          >
            <IconPlus />
          </ActionIcon>
        </Group>
        <Card>
          <Stack>
            <Text>
              What if there was a cool way to solve this huge problem?
            </Text>
            <Group>
              <Text>07/27/2023 8:48PM</Text>
              <ActionIcon>
                <IconCircleXFilled />
              </ActionIcon>
            </Group>
          </Stack>
        </Card>
        <Group justify="flex-end">
          <ActionIcon variant="transparent" color="neutral.5">
            <IconArrowsMaximize />
          </ActionIcon>
        </Group>
      </Stack>
    </Card>
  );
};
