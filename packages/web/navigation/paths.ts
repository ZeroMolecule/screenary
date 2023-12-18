export const paths = {
  home: () => '/',
  login: () => '/login',
  register: () => '/register',
  projects: () => '/projects',
  project: (id: string) => `/projects/${id}`,
  embeddedPage: (projectId: string, pageId: string) =>
    `/projects/${projectId}/embedded-pages/${pageId}`,
  todo: () => '/to-do',
  inbox: () => '/inbox',
  calendar: () => '/calendar',
};
