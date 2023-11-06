'use client';

import { FC } from 'react';
import { signOut } from 'next-auth/react';
import { Button } from '@mantine/core';

export const LogoutButton: FC = () => {
  return (
    <Button
      size="xl"
      onClick={() => {
        signOut();
      }}
    >
      Log Out
    </Button>
  );
};
