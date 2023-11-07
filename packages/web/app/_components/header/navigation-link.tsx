'use client';

import { FC } from 'react';
import { DefaultMantineColor } from '@mantine/core';
import { usePathname } from '@/navigation/index';
import { Link } from '../base/link';

type Props = {
  href: string;
  label: string;
};
export type NavigationLink = Props;

export const NavigationLink: FC<Props> = (props) => {
  const { href, label, color } = useNavigationLink(props);

  return (
    <Link href={href} size="lg" fw={700} c={color}>
      {label}
    </Link>
  );
};

function useNavigationLink({ href, label }: Props) {
  const pathname = usePathname();

  const color: DefaultMantineColor =
    pathname === href ? 'primary' : 'neutral.9';

  return { href, label, color };
}
