import { Directory } from '@prisma/client';

export type AddFolderData = Pick<Directory, 'name' | 'projectId' | 'parentId'>;

export type EditFolderData = Pick<
  Directory,
  'id' | 'projectId' | 'parentId' | 'name'
>;

export type DeleteFolderData = Pick<Directory, 'id' | 'projectId'>;
