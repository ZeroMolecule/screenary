import { ReactNode } from 'react';
import { Stack } from '@mantine/core';
import { Header } from '@/app/_components/header';

type Props = {
  children: ReactNode;
};

export default async function Layout({ children }: Props) {
  return (
    <Stack w="100%" justify="space-between" gap="xl">
      <Header />
      {children}
    </Stack>
  );
}
