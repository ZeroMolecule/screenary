import { ReactNode } from 'react';
import { getServerSession } from 'next-auth';
import { Stack } from '@mantine/core';
import { authOptions } from '@/domain/auth';
import { Header } from '@/app/_components/header';
import { NotificationsWidget } from '@/app/_components/notifications-widget';

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