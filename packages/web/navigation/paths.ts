export const paths = {
  home: () => '/',
  login: () => '/login',
  register: () => '/register',
  projects: () => '/projects',
  project: (id: string) => `/projects/${id}`,
  todo: () => '/to-do',
  calendar: () => '/calendar',
};
