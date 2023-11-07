import { FC } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Group } from '@mantine/core';
import { paths } from '@/navigation/paths';
import { Link } from '../base/link';
import { Navigation } from './navigation';
import { UserMenu } from './user-menu';
import logo from '@/public/images/logo-black.svg';

export const Header: FC = () => {
  const t = useTranslations('header');

  return (
    <header className="header">
      <Group gap="lg">
        <Link href={paths.home()}>
          <Image src={logo} alt={t('logoAlt')} />
        </Link>
        <Navigation />
      </Group>
      <UserMenu />
    </header>
  );
};
