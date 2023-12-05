import { QuickLink } from '@prisma/client';

export type AddQuickLinkData = Pick<QuickLink, 'url' | 'projectId'>;

export type EditQuickLinkData = Pick<QuickLink, 'id' | 'projectId' | 'url'>;

export type DeleteQuickLinkData = Pick<QuickLink, 'id' | 'projectId'>;
