import { ReactNode } from 'react';
import { Screensaver } from '@/app/_components/screensaver';

type Props = { children: ReactNode };

export default function AuthLayout({ children }: Props) {
  return <Screensaver>{children}</Screensaver>;
}
