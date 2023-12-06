import { Dispatch, FC, ReactNode, SetStateAction } from 'react';
import {
  ActionIcon,
  Card,
  Group,
  Popover,
  PopoverDropdown,
  PopoverTarget,
  Portal,
} from '@mantine/core';
import { IconArrowsMaximize, IconX } from '@tabler/icons-react';
import { Title } from '../base/title';
import styles from '@/styles/components/expanded-popover.module.scss';

type Props = {
  title: string;
  expanded: boolean;
  setExpanded: Dispatch<SetStateAction<boolean>>;
  children: ReactNode;
  closeOnClickOutside?: boolean;
  portalTarget?: string;
};

export const ExpandedPopover: FC<Props> = ({
  title,
  expanded,
  setExpanded,
  children,
  closeOnClickOutside = true,
  portalTarget,
}) => {
  const dropdown = (
    <PopoverDropdown w="100%" h="100%" pos="absolute" top={0} right={0}>
      <Card className={styles.popoverContainer}>
        <Group justify="space-between">
          <Title order={5} c="white" fw={700}>
            {title}
          </Title>
          <ActionIcon
            variant="transparent"
            color="white"
            onClick={() => setExpanded(false)}
          >
            <IconX />
          </ActionIcon>
        </Group>
        {children}
      </Card>
    </PopoverDropdown>
  );

  return (
    <Group justify="flex-end">
      <Popover
        opened={expanded}
        onChange={setExpanded}
        withinPortal={false}
        radius={24}
        closeOnClickOutside={closeOnClickOutside}
      >
        <PopoverTarget>
          <ActionIcon
            variant="transparent"
            color="neutral.5"
            onClick={() => setExpanded(true)}
          >
            <IconArrowsMaximize />
          </ActionIcon>
        </PopoverTarget>
        {portalTarget ? (
          <Portal target={`#${portalTarget}`}>{dropdown}</Portal>
        ) : (
          dropdown
        )}
      </Popover>
    </Group>
  );
};
