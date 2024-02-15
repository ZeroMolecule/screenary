import { QuickLink } from '@prisma/client';

export type AddQuickLinkData = Pick<
  QuickLink,
  'url' | 'projectId' | 'directoryId'
>;

export type EditQuickLinkData = Pick<
  QuickLink,
  'id' | 'projectId' | 'directoryId' | 'url'
>;

export type RefreshQuickLinkData = Pick<
  QuickLink,
  'id' | 'projectId' | 'title'
>;

export type DeleteQuickLinkData = Pick<QuickLink, 'id' | 'projectId'>;
