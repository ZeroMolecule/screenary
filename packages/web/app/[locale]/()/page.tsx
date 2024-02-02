import { Link } from '@/app/_components/base/link';
import { DateTimeBlock } from '@/app/_components/datetime-block';
import { Screensaver } from '@/app/_components/screensaver';
import { UserWidget } from '@/app/_components/user-widget';
import { withPrivatePage } from '@/app/_hoc/with-private-page';
import { paths } from '@/navigation/paths';
import logoImg from '@/public/images/logo-white.png';
import styles from '@/styles/pages/home.module.scss';
import stylesFlex from '@/styles/utils/flex.module.scss';
import { ActionIcon, Box, Group, Stack } from '@mantine/core';
import { IconBellFilled } from '@tabler/icons-react';
import { getTranslator } from 'next-intl/server';
import Image from 'next/image';
import { Greeting } from './_component/greeting';

type Props = {
  params: { locale: string };
};

async function HomePage(props: Props) {
  const { t } = await useHomePage(props);

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
          <Greeting />
        </Stack>
      </Stack>
    </Screensaver>
  );
}

async function useHomePage({ params: { locale } }: Props) {
  const t = await getTranslator(locale, 'shared');

  return { t };
}

export default withPrivatePage(HomePage);
