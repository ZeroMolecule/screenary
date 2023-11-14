import { PROJECTS_QUERY_KEY } from './projects-query';

export const projectQuery = {
  key: (id: string) => [`${PROJECTS_QUERY_KEY}/${id}`],
};
