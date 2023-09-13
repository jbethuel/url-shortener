import { routeContext } from '../utils/pathContext';

export const routes = {
  root: '/',
  dashboard: routeContext<undefined, undefined>('/dashboard'),
  dashboardHome: routeContext<undefined, undefined>('/dashboard/home'),
  dashboardLinks: routeContext<undefined, undefined>('/dashboard/links'),
  dashboardLinkView: routeContext<undefined, undefined>('/dashboard/link/:id'),
  dashboardSettings: routeContext<undefined, undefined>('/dashboard/settings'),
};
