import { useTranslations } from 'next-intl';
import { Text, Title } from '@mantine/core';

export default function HomePage() {
  const t = useTranslations('metadata');

  return (
    <div>
      <Title order={2} size="h4">
        {t('title')}
      </Title>
      <Text size="xs">{t('description')}</Text>
    </div>
  );
}
