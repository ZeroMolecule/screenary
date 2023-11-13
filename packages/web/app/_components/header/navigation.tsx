import { FC } from 'react';
import { useTranslations } from 'next-intl';
import { paths } from '@/navigation/paths';
import { NavigationLink, NavigationLinkProps } from './navigation-link';

export const Navigation: FC = () => {
  const { navigationLinks } = useNavigation();

  const renderLink = ({ href, label }: NavigationLinkProps, index: number) => (
    <NavigationLink key={index} href={href} label={label} />
  );

  return <nav className="header-nav">{navigationLinks.map(renderLink)}</nav>;
};

function useNavigation() {
  const t = useTranslations('header');

  const navigationLinks: NavigationLinkProps[] = [
    { href: paths.projects(), label: t('navigation.home') },
    { href: paths.todo(), label: t('navigation.todo') },
    { href: paths.inbox(), label: t('navigation.inbox') },
    { href: paths.calendar(), label: t('navigation.calendar') },
  ];

  return { navigationLinks };
}
