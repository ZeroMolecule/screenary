import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Card, Stack } from '@mantine/core';
import { withPublicOnlyPage } from '@/app/_hoc/with-public-only-page';
import { SocialButton } from '@/app/_components/auth/social-button';
import logoWhite from '@/public/images/logo-white.png';

function LoginPage() {
  const t = useTranslations('shared');

  return (
    <Stack align="center" my="auto">
      <Image
        src={logoWhite}
        width={208}
        height={64}
        alt={t('logoAlt')}
        priority
      />
      <Card p="xl" bg="white" radius="lg">
        <Stack>
          <SocialButton provider="apple" />
          <SocialButton provider="google" />
          <SocialButton provider="facebook" />
        </Stack>
      </Card>
    </Stack>
  );
}

export default withPublicOnlyPage(LoginPage);
