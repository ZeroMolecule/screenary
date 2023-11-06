import { Stack, Text, Title } from '@mantine/core';
import { Screensaver } from '@/app/_components/screensaver';
import { PublicPage } from '@/app/_components/protectors/public-page';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/domain/auth';
import { LogoutButton } from '@/app/_components/logout-btn';

export default async function HomePage() {
  const session = await getServerSession(authOptions);

  return (
    <PublicPage>
      <Screensaver>
        <Stack justify="space-around" align="center">
          <Stack gap={0}>
            <Title c="white">Screenary</Title>
            <Text size="xs" c="white">
              All your screens and apps in one place.
            </Text>
          </Stack>
          <Stack>
            <Title fz={54} c="primary.1" ta="center">
              Welcome back, {session?.user?.name}!
            </Title>
          </Stack>
          <Stack>
            <LogoutButton />
          </Stack>
        </Stack>
      </Screensaver>
    </PublicPage>
  );
}
