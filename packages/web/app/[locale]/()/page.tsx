import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { ActionIcon, Box, Group, Stack, Text } from '@mantine/core';
import { Screensaver } from '@/app/_components/screensaver';
import logoImg from '@/public/images/logo-white.png';
import { UserWidget } from '@/app/_components/user-widget';
import { TitleAlt } from '@/app/_components/base/title-alt';
import { TextAlt } from '@/app/_components/base/text-alt';
import { IconBellFilled } from '@tabler/icons-react';
import { Link } from '@/app/_components/base/link';
import { paths } from '@/navigation/paths';

export default function HomePage() {
  const { t } = useHomePage();

  return (
    <Screensaver>
      <Stack w="100%">
        <Group w="100%">
          <Image src={logoImg} width={208} height={64} alt={t('logoAlt')} />
          <Box w="100%" h="100%" pos="relative" className="flex-1">
            <UserWidget variant="dark" />
          </Box>
        </Group>
        <Stack justify="center" align="center" gap={60} className="flex-1">
          <Stack align="center" gap="xl">
            <TitleAlt fz={128} lh="100px" c="primary.1">
              3:00 PM
            </TitleAlt>
            <TextAlt fz={24} lh="28px" c="neutral.3">
              Friday, July 21st
            </TextAlt>
          </Stack>
          <Link href={paths.projects()}>
            <ActionIcon
              variant="transparent"
              size={80}
              radius="100%"
              c="neutral.3"
              className="home__icon-button"
            >
              <IconBellFilled size={32} />
            </ActionIcon>
          </Link>
          <Text fz={44} c="primary.1" fw={700}>
            Good afternoon, John
          </Text>
        </Stack>
      </Stack>
    </Screensaver>
  );
}

function useHomePage() {
  const t = useTranslations('home');

  return { t };
}
