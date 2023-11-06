import { FC, ReactNode } from 'react';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/domain/auth';
import { redirect } from '@/navigation';
import { paths } from '@/navigation/paths';

type Props = {
  children: ReactNode;
};

export const PublicPage: FC<Props> = async ({ children }) => {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect(paths.login());
  }

  return <>{children}</>;
};
