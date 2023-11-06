import { getServerSession } from 'next-auth';
import { Stack, Text, Title } from '@mantine/core';
import { withPrivatePage } from '@/app/_hoc/with-private-page';
import { authOptions } from '@/domain/auth';
import { Screensaver } from '@/app/_components/screensaver';
import { LogoutButton } from '@/app/_components/logout-btn';

async function HomePage() {
  const session = await getServerSession(authOptions);

  return (
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
  );
}

export default withPrivatePage(HomePage);
