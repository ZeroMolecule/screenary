'use client';

import { FC, useEffect, useRef, useState } from 'react';
import { signOut, useSession } from 'next-auth/react';
import Image from 'next/image';
import {
  Accordion,
  AccordionControl,
  AccordionItem,
  AccordionPanel,
  Button,
  Group,
  Stack,
  Text,
  useMantineTheme,
} from '@mantine/core';
import classNames from 'classnames';
import {
  IconChevronDown,
  IconLogout,
  IconSettings,
  TablerIconsProps,
} from '@tabler/icons-react';
import { useRouter } from '@/navigation';
import { paths } from '@/navigation/paths';
import placeholderImage from '@/public/images/cover-image.png';
import { useTranslations } from 'next-intl';

type MenuAction = {
  icon: (props: TablerIconsProps) => JSX.Element;
  label: string;
  onClick: () => void | Promise<void>;
};

export const UserMenu: FC = () => {
  const {
    t,
    controlRef,
    panelWidth,
    isOpen,
    theme,
    user,
    menuActions,
    toggle,
  } = useUserMenu();

  const renderMenuAction = (
    { icon: Icon, label, onClick }: MenuAction,
    index: number
  ) => (
    <Button
      key={index}
      variant="subtle"
      c="neutral.9"
      justify="flex-start"
      leftSection={<Icon size={24} color={theme.colors.neutral[4]} />}
      onClick={onClick}
    >
      {label}
    </Button>
  );

  return (
    <Accordion
      pos="absolute"
      right={0}
      chevron={<IconChevronDown />}
      chevronSize={24}
      className="user-menu"
    >
      <AccordionItem
        value="user"
        className={classNames('user-menu__item', {
          'user-menu__item--open': isOpen,
        })}
      >
        <AccordionControl
          ref={controlRef}
          className="user-menu__control"
          onClick={toggle}
        >
          <Group mr="md">
            <Image
              src={user?.image ?? placeholderImage}
              width={48}
              height={48}
              alt={user?.name ?? t('avatarAlt')}
              className="user-menu__image"
            />
            <Stack gap={0}>
              <Text size="lg">{user?.name}</Text>
              <Text size="xs" c="neutral.5">
                {user?.email}
              </Text>
            </Stack>
          </Group>
        </AccordionControl>
        <AccordionPanel w={panelWidth}>
          <Stack gap="xs">{menuActions.map(renderMenuAction)}</Stack>
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
};

function useUserMenu() {
  const t = useTranslations('header.userMenu');
  const controlRef = useRef<HTMLButtonElement | null>(null);
  const [panelWidth, setPanelWidth] = useState<number | undefined>(undefined);
  const [isOpen, setIsOpen] = useState(false);
  const theme = useMantineTheme();
  const { push } = useRouter();
  const { data } = useSession();
  const user = data?.user;

  const menuActions: MenuAction[] = [
    {
      icon: IconSettings,
      label: t('profile'),
      onClick: () => push(paths.todo()),
    },
    {
      icon: IconLogout,
      label: t('logout'),
      onClick: async () => await signOut(),
    },
  ];

  const toggle = () => {
    if (isOpen) {
      setTimeout(() => {
        setIsOpen(false);
      }, 175);
    } else {
      setIsOpen(true);
    }
  };

  useEffect(() => {
    setPanelWidth(controlRef.current?.clientWidth);
  }, []);

  return {
    t,
    controlRef,
    panelWidth,
    isOpen,
    theme,
    user,
    menuActions,
    toggle,
  };
}
