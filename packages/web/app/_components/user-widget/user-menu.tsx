import { FC, useEffect, useRef, useState } from 'react';
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

type Props = {
  user: DefaultSession['user'];
  onOpen: () => void;
};

export const UserMenu: FC<Props> = (props) => {
  const { t, controlRef, panelWidth, isOpen, user, menuActions, toggle } =
    useUserMenu(props);

  const renderMenuAction = (
    { icon: Icon, label, onClick }: MenuAction,
    index: number
  ) => (
    <Button
      key={index}
      variant="subtle"
      c="neutral.9"
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

function useUserMenu({ onOpen, user }: Props) {
  const t = useTranslations('header.userMenu');
  const controlRef = useRef<HTMLButtonElement | null>(null);
  const [panelWidth, setPanelWidth] = useState<number | undefined>(undefined);
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
    user,
    menuActions,
    toggle,
  };
}
