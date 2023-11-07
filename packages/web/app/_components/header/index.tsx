import { FC } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import logo from '@/public/images/logo-black.svg';
import { Button, Group } from '@mantine/core';
import { Navigation } from './navigation';
import { Link } from '../base/link';
import { paths } from '@/navigation/paths';

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
      <Button>User Profile</Button>
    </header>
  );
};
