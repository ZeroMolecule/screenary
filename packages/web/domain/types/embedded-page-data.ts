import { EmbeddedPage } from '@prisma/client';

export type AddEmbeddedPageData = Pick<EmbeddedPage, 'url' | 'projectId'>;

export type EditEmbeddedPageData = Pick<
  EmbeddedPage,
  'url' | 'id' | 'projectId'
>;

export type DeleteEmbeddedPageData = Pick<EmbeddedPage, 'id' | 'projectId'>;
