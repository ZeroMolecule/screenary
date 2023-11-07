import { Header } from '@/app/_components/header';
import { Stack, Title } from '@mantine/core';
import { ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

export default function Layout({ children }: Props) {
  return (
    <Stack w="100%" justify="space-between" gap="xl">
      <Header />
      <div className="flex-1">{children}</div>
      <Title>nekaj drugo</Title>
    </Stack>
  );
}
