import Image from 'next/image';
import { getTranslator } from 'next-intl/server';
import { ActionIcon, Box, Group, Stack } from '@mantine/core';
import { Screensaver } from '@/app/_components/screensaver';
import logoImg from '@/public/images/logo-white.png';
import { UserWidget } from '@/app/_components/user-widget';
import { IconBellFilled } from '@tabler/icons-react';
import { Link } from '@/app/_components/base/link';
import { paths } from '@/navigation/paths';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/domain/auth';
import { DateTimeBlock } from '@/app/_components/datetime-block';
import { withPrivatePage } from '@/app/_hoc/with-private-page';
import { generateFirstName } from '@/domain/util/user';
import { getTimeOfTheDay } from '@/utils/datetime';
import { Text } from '@/app/_components/base/text';
import styles from '@/styles/pages/home.module.scss';
import stylesFlex from '@/styles/utils/flex.module.scss';

type Props = {
  params: { locale: string };
};

async function HomePage(props: Props) {
  const { t, message } = await useHomePage(props);

  return (
    <Screensaver>
      <Stack w="100%">
        <Group w="100%">
          <Image src={logoImg} width={208} height={64} alt={t('logoAlt')} />
          <Box
            w="100%"
            h="100%"
            pos="relative"
            className={stylesFlex['flex-1']}
          >
            <UserWidget variant="dark" />
          </Box>
        </Group>
        <Stack
          justify="center"
          align="center"
          gap={60}
          className={stylesFlex['flex-1']}
        >
          <DateTimeBlock
            stackProps={{ align: 'center', gap: 'xl' }}
            titleProps={{ fz: 128, lh: 0.75, c: 'primary.1' }}
            textProps={{ fz: 24, lh: 1.2, c: 'neutral.3' }}
            initialDate={new Date()}
          />
          <Link href={paths.projects()}>
            <ActionIcon
              variant="transparent"
              size={80}
              radius="100%"
              c="neutral.3"
              className={styles['home__icon-button']}
            >
              <IconBellFilled size={32} />
            </ActionIcon>
          </Link>
          <Text fz={44} c="primary.1" fw={700}>
            {message}
          </Text>
        </Stack>
      </Stack>
    </Screensaver>
  );
}

async function useHomePage({ params: { locale } }: Props) {
  const t = await getTranslator(locale, 'shared');
  const session = await getServerSession(authOptions);
  const username = session?.user?.name;

  const message = username
    ? t('welcomeMessage.base', {
        time: t(`welcomeMessage.time.${getTimeOfTheDay(new Date())}`),
        username: generateFirstName(username),
      })
    : t('welcomeMessage.fallback');

  return { t, message };
}

export default withPrivatePage(HomePage);
