import { ReactNode } from 'react';
import { getServerSession } from 'next-auth';
import { Stack } from '@mantine/core';
import { authOptions } from '@/domain/auth';
import { Header } from '@/app/_components/header';
import { NotificationsWidget } from '@/app/_components/notifications-widget';
import classNames from 'classnames';
import stylesFlex from '@/styles/utils/flex.module.scss';
import stylesOverflow from '@/styles/utils/overflow.module.scss';

type Props = {
  children: ReactNode;
};

export default async function Layout({ children }: Props) {
  const session = await getServerSession(authOptions);

  return (
    <Stack w="100%" justify="space-between" gap="xl">
      <Header />
      <div
        className={classNames(
          stylesFlex['flex-1'],
          stylesOverflow['overflow-auto']
        )}
      >
        {children}
      </div>
      <NotificationsWidget username={session?.user?.name} />
    </Stack>
  );
}
