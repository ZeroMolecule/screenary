import { FC, useState } from 'react';
import { useTranslations } from 'next-intl';
import { Card } from '@mantine/core';
import { ProjectTasks } from '../../tasks/project-tasks';
import { Text } from '../../base/text';
import styles from '@/styles/components/tasks.module.scss';

type Props = {
  projectId: string;
};

export const Tasks: FC<Props> = (props) => {
  const { t, projectId, popoverOpen, setPopoverOpen } = useTasks(props);

  const title = (
    <Text size="lg" fw={600}>
      {t('title')}
    </Text>
  );

  return (
    <Card h="100%" p={0} radius={24} className={styles.tasks}>
      <ProjectTasks
        projectId={projectId}
        title={title}
        isPopoverOpen={popoverOpen[projectId] || false}
        onPopoverChange={setPopoverOpen}
        hideTodoTitle
        wrapperProps={{ gap: 0 }}
      />
    </Card>
  );
};

function useTasks({ projectId }: Props) {
  const t = useTranslations('project.tasks');
  const [popoverOpen, setPopoverOpen] = useState<{ [key: string]: boolean }>(
    {}
  );

  return { t, projectId, popoverOpen, setPopoverOpen };
}
