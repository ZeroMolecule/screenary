import { FC, useState } from 'react';
import Image from 'next/image';
import { DefaultSession } from 'next-auth';
import { signOut } from 'next-auth/react';
import { useTranslations } from 'next-intl';
import {
  Accordion,
  AccordionControl,
  AccordionItem,
  AccordionPanel,
  Button,
  Group,
  Stack,
  Text,
} from '@mantine/core';
import classNames from 'classnames';
import {
  IconChevronDown,
  IconLogout,
  IconSettings,
  TablerIconsProps,
} from '@tabler/icons-react';
import placeholderImage from '@/public/images/cover-image.png';

type MenuAction = {
  icon: (props: TablerIconsProps) => JSX.Element;
  label: string;
  onClick: () => void | Promise<void>;
};

export type UserMenuVariant = 'light' | 'dark';
type Props = {
  variant?: UserMenuVariant;
  user: DefaultSession['user'];
  onOpen: () => void;
};

export const UserMenu: FC<Props> = (props) => {
  const { t, isDark, isOpen, user, menuActions, toggle } = useUserMenu(props);

  const renderMenuAction = (
    { icon: Icon, label, onClick }: MenuAction,
    index: number
  ) => (
    <Button
      key={index}
      variant="subtle"
      c={isDark ? 'neutral.2' : 'neutral.9'}
      justify="flex-start"
      leftSection={<Icon size={24} color="var(--mantine-color-neutral-4)" />}
      onClick={onClick}
    >
      {label}
    </Button>
  );

  return (
    <Accordion
      pos="absolute"
      right={0}
      chevron={<IconChevronDown color={isDark ? 'white' : 'black'} />}
      chevronSize={24}
      className="user-menu"
    >
      <AccordionItem
        value="user"
        bg={isDark ? 'transparent' : 'neutral.1'}
        className={classNames('user-menu__item', {
          'user-menu__item--open': isOpen,
          'user-menu__item--dark': isDark,
        })}
      >
        <AccordionControl className="user-menu__control" onClick={toggle}>
          <Group mr="md">
            <Image
              src={user?.image ?? placeholderImage}
              width={48}
              height={48}
              alt={user?.name ?? t('avatarAlt')}
              className={classNames('user-menu__image', {
                'user-menu__image--dark': isDark,
              })}
            />
            <Stack gap={0}>
              <Text size="lg" fw={500} c={isDark ? 'white' : 'neutral.9'}>
                {user?.name}
              </Text>
              <Text size="xs" c={isDark ? 'neutral.2' : 'neutral.5'}>
                {user?.email}
              </Text>
            </Stack>
          </Group>
        </AccordionControl>
        <AccordionPanel>
          <Stack gap="xs">{menuActions.map(renderMenuAction)}</Stack>
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
};

function useUserMenu({ variant = 'light', onOpen, user }: Props) {
  const t = useTranslations('header.userMenu');
  const [isOpen, setIsOpen] = useState(false);

  const menuActions: MenuAction[] = [
    {
      icon: IconSettings,
      label: t('profile'),
      onClick: onOpen,
    },
    {
      icon: IconLogout,
      label: t('logout'),
      onClick: () => signOut(),
    },
  ];

  const toggle = () => {
    if (isOpen) {
      setTimeout(() => {
        setIsOpen(false);
      }, 200);
    } else {
      setIsOpen(true);
    }
  };

  return {
    t,
    isDark: variant === 'dark',
    isOpen,
    user,
    menuActions,
    toggle,
  };
}
