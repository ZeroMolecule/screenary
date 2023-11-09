import { ReactNode } from 'react';
import { Stack } from '@mantine/core';
import { Header } from '@/app/_components/header';
import { NotificationsWidget } from '@/app/_components/notifications-widget';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/domain/auth';

type Props = {
  children: ReactNode;
};

export default async function Layout({ children }: Props) {
  const session = await getServerSession(authOptions);

  return (
    <Stack w="100%" justify="space-between" gap="xl">
      <Header />
      <div className="flex-1 overflow-auto">{children}</div>
      <NotificationsWidget username={session?.user?.name} />
    </Stack>
  );
}
