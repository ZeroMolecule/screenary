import { Metadata } from 'next';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { getTranslator } from 'next-intl/server';
import { Card, Stack } from '@mantine/core';
import { withPublicOnlyPage } from '@/app/_hoc/with-public-only-page';
import { SocialButton } from '@/app/_components/auth/social-button';
import logoWhite from '@/public/images/logo-white.png';

type Params = { locale: string };

export async function generateMetadata({
  params: { locale },
}: {
  params: Params;
}): Promise<Metadata> {
  const t = await getTranslator(locale, 'auth');
  return {
    title: t('login'),
  };
}

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
