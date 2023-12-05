import { QuickLink } from '@prisma/client';

export type AddQuickLinkData = Pick<QuickLink, 'url' | 'projectId'>;
