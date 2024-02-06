'use client';

import { addProjectMutation } from '@/domain/mutations/add-project-mutation';
import { reorderProjectsMutation } from '@/domain/mutations/reorder-projects-mutation';
import { Project, projectsQuery } from '@/domain/queries/projects-query';
import { Data } from '@/domain/remote/response/data';
import { useDragging } from '@/hooks/use-dragging';
import emptyIcon from '@/public/images/folder-icon.svg';
import styles from '@/styles/components/projects.module.scss';
import { HEADER_CONTAINER_ID } from '@/utils/constants';
import { Button, Group, Portal } from '@mantine/core';
import { useDisclosure, useResizeObserver } from '@mantine/hooks';
import { IconCirclePlus } from '@tabler/icons-react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { orderBy } from 'lodash';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { FC } from 'react';
import { GridContextProvider, GridDropZone, GridItem } from 'react-grid-dnd';
import { EmptyPlaceholder } from '../empty-placeholder';
import { ProjectFormValues, ProjectModal } from '../modals/project-modal';
import { ProjectItem } from './project-item';

export const ProjectsPage: FC = () => {
  const {
    t,
    isOpen,
    open,
    close,
    projects,
    handleSubmit,
    handleReorder,
    projectsRef,
    projectsRec,
  } = useProjectsWrapper();

  const dragging = useDragging(projectsRef.current);

  return (
    <Group h="100%">
      <Portal target={`#${HEADER_CONTAINER_ID}`}>
        <Button
          size="sm"
          variant="subtle"
          bg="white"
          c="neutral.7"
          radius={6}
          leftSection={<IconCirclePlus size={20} />}
          className={styles['add-project-button']}
          onClick={open}
        >
          {t('addAction')}
        </Button>
      </Portal>
      <ProjectModal opened={isOpen} onClose={close} onSubmit={handleSubmit} />
      {!projects?.length ? (
        <EmptyPlaceholder
          title={t('empty.title')}
          description={t('empty.description')}
          image={<Image src={emptyIcon} width={138} height={108} alt="" />}
        />
      ) : (
        <GridContextProvider onChange={handleReorder}>
          <div className={styles['projects-grid']} ref={projectsRef}>
            <GridDropZone
              style={{ height: projectsRec.height }}
              id="projects"
              boxesPerRow={3}
              rowHeight={projectsRec.height / 2}
            >
              {projects.map((item) => (
                <GridItem
                  key={item.id}
                  className={styles['projects-grid__item']}
                >
                  <ProjectItem project={item} disabled={dragging} />
                </GridItem>
              ))}
            </GridDropZone>
          </div>
        </GridContextProvider>
      )}
    </Group>
  );
};

function useProjectsWrapper() {
  const qc = useQueryClient();
  const t = useTranslations('projects');
  const [isOpen, { open, close }] = useDisclosure(false);
  const [projectsRef, projectsRec] = useResizeObserver();

  const { data: projects = [], refetch } = useQuery<
    Data<Project[]>,
    unknown,
    Project[]
  >({
    queryKey: projectsQuery.key,
    select: (res) => res.data,
  });

  const { mutateAsync: addProject } = useMutation({
    mutationFn: addProjectMutation.fnc,
    onSuccess: async () => {
      await refetch();
      close();
    },
  });

  const { mutate: reorderProjects } = useMutation({
    mutationFn: reorderProjectsMutation.fnc,
    onSuccess: () => refetch(),
  });

  const handleSubmit = async (values: ProjectFormValues) => {
    await addProject(values).catch(() => null);
  };

  const handleReorder = (
    _: string,
    sourceIndex: number,
    targetIndex: number
  ) => {
    const sourceProject = projects.at(sourceIndex);
    const sourceOrder = sourceProject?.projectUsers.at(0)?.order;
    const targetProject = projects.at(targetIndex);
    const targetOrder = targetProject?.projectUsers.at(0)?.order;

    if (sourceProject && sourceOrder && targetProject && targetOrder) {
      qc.setQueryData<Data<Project[]>>(projectsQuery.key, (prev) => {
        if (!prev) {
          return prev;
        }
        const data = orderBy(
          prev.data.map((item) => {
            if (item.id === sourceProject.id) {
              const userProject = sourceProject.projectUsers.at(0);
              return {
                ...item,
                projectUsers: userProject
                  ? [{ ...userProject, order: targetOrder }]
                  : [],
              };
            }
            if (item.id === targetProject.id) {
              const userProject = targetProject.projectUsers.at(0);
              return {
                ...item,
                projectUsers: userProject
                  ? [{ ...userProject, order: sourceOrder }]
                  : [],
              };
            }
            return item;
          }),
          ['projectUsers[0].order'],
          'asc'
        );

        return { ...prev, data };
      });

      reorderProjects([
        {
          id: sourceProject.id,
          order: targetOrder,
        },
        {
          id: targetProject.id,
          order: sourceOrder,
        },
      ]);
    }
  };

  return {
    t,
    isOpen,
    open,
    close,
    projects,
    handleSubmit,
    projectsRef,
    projectsRec,
    handleReorder,
  };
}
