import { Dispatch, FC, SetStateAction } from 'react';
import { useTranslations } from 'next-intl';
import {
  ActionIcon,
  Group,
  Popover,
  PopoverDropdown,
  PopoverTarget,
} from '@mantine/core';
import { IconPlus } from '@tabler/icons-react';
import { Text } from '../base/text';
import {
  QuickLinkFormValues,
  QuickLinksPopoverMenu,
} from './quick-link-popover-menu';

type Props = {
  popoverOpen: boolean;
  setPopoverOpen: Dispatch<SetStateAction<boolean>>;
  onCreate: (values: QuickLinkFormValues) => Promise<void>;
};

export const QuickLinksHeader: FC<Props> = (props) => {
  const { t, popoverOpen, setPopoverOpen, onCreate } =
    useQuickLinksHeader(props);

  return (
    <Group justify="space-between">
      <Text size="lg" fw={600}>
        {t('title')}
      </Text>
      <Popover
        opened={popoverOpen}
        onChange={setPopoverOpen}
        withinPortal={false}
        radius={24}
      >
        <PopoverTarget>
          <ActionIcon
            variant="transparent"
            color="var(--mantine-color-neutral-9)"
            onClick={() => setPopoverOpen(true)}
          >
            <IconPlus />
          </ActionIcon>
        </PopoverTarget>
        <PopoverDropdown
          w="auto"
          pos="absolute"
          top={0}
          right={0}
          left={0}
          bottom={0}
        >
          <QuickLinksPopoverMenu
            onClose={() => setPopoverOpen(false)}
            onCreate={onCreate}
          />
        </PopoverDropdown>
      </Popover>
    </Group>
  );
};

function useQuickLinksHeader({ popoverOpen, setPopoverOpen, onCreate }: Props) {
  const t = useTranslations('project.quickLinks');

  return { t, popoverOpen, setPopoverOpen, onCreate };
}
