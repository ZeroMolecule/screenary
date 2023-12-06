import { Directory } from '@prisma/client';

export type AddFolderData = Pick<Directory, 'name' | 'projectId'>;

export type EditFolderData = Pick<Directory, 'id' | 'projectId' | 'name'>;

export type DeleteFolderData = Pick<Directory, 'id' | 'projectId'>;
