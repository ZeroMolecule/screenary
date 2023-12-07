import { QuickLink } from '@prisma/client';

export type AddQuickLinkData = Pick<
  QuickLink,
  'url' | 'projectId' | 'directoryId'
>;

export type EditQuickLinkData = Pick<
  QuickLink,
  'id' | 'projectId' | 'directoryId' | 'url'
>;

export type DeleteQuickLinkData = Pick<QuickLink, 'id' | 'projectId'>;
