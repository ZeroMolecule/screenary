import { FC } from 'react';
import { useTranslations } from 'next-intl';
import { paths } from '@/navigation/paths';
import { NavigationLink, NavigationLinkProps } from './navigation-link';
import styles from '@/styles/components/header.module.scss';

export const Navigation: FC = () => {
  const { navigationLinks } = useNavigation();

  const renderLink = ({ href, label }: NavigationLinkProps, index: number) => (
    <NavigationLink key={index} href={href} label={label} />
  );

  return (
    <nav className={styles['header-nav']}>
      {navigationLinks.map(renderLink)}
    </nav>
  );
};

function useNavigation() {
  const t = useTranslations('header');

  const navigationLinks: NavigationLinkProps[] = [
    { href: paths.projects(), label: t('navigation.home') },
    { href: paths.todo(), label: t('navigation.todo') },
    { href: paths.calendar(), label: t('navigation.calendar') },
  ];

  return { navigationLinks };
}
