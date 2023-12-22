import { FC } from 'react';
import { useTranslations } from 'next-intl';
import { Button } from '@mantine/core';
import { IconEye, IconEyeOff } from '@tabler/icons-react';
import styles from '@/styles/components/tasks.module.scss';

type Props = {
  isHidden: boolean;
  onClick: () => void;
};

export const HideCompletedTasksButton: FC<Props> = (props) => {
  const { t, isHidden, onClick } = useHideCompletedTasksButton(props);

  return (
    <Button
      size="sm"
      variant="subtle"
      bg="white"
      c="neutral.7"
      radius={6}
      leftSection={isHidden ? <IconEye size={20} /> : <IconEyeOff size={20} />}
      className={styles.hideButton}
      onClick={onClick}
    >
      {isHidden ? t('showAction') : t('hideAction')}
    </Button>
  );
};

function useHideCompletedTasksButton({ isHidden, onClick }: Props) {
  const t = useTranslations('tasks');

  return { t, isHidden, onClick };
}
